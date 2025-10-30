import {
  ApiResponseList,
  Article,
  Category,
  Comment,
} from '@/constant/types/ArticleProps'
import { ApiFaqResponse, Faq } from '@/constant/types/FaqProps'
import { GetListQuery } from '@/constant/types/GeneralProps'
import { api, apiWithAuth, createServerApiClient } from '@/services/common/http'
import qs from 'query-string'

export async function getArticleDetail(slug: string): Promise<Article> {
  try {
    const response = await api.get(`/public/articles/v1/article/slug/${slug}`)
    return response.data.results
  } catch (error) {
    console.error('Error fetching article detail:', error)
    throw error
  }
}

export async function getArticleList(
  query: GetListQuery
): Promise<ApiResponseList<Article>> {
  try {
    const response = await api.get(
      `/public/articles/v1/article?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching article list:', error)
    throw error
  }
}

export async function getArticleByHiglight({
  slug,
  query,
}: {
  slug: string
  query: GetListQuery
}): Promise<Article[]> {
  try {
    const response = await api.get(
      `/public/articles/v1/highlights/slug/${slug}/articles?${qs.stringify(query)}`
    )
    return response.data.results.articles
  } catch (error) {
    console.error('Error fetching article list highlight:', error)
    throw error
  }
}

export async function getArticleCategories(
  query: GetListQuery
): Promise<Category[]> {
  try {
    const response = await api.get(
      `/public/articles/v1/categories?${qs.stringify(query)}`
    )
    const results = response.data.results
    results?.unshift({ id: 'all', name: 'Semua', slug: '' })
    return results
  } catch (error) {
    console.error('Error fetching article category:', error)
    throw error
  }
}

export async function getArticleCommentPublic(
  slug: string,
  query: GetListQuery
): Promise<ApiResponseList<Comment>> {
  try {
    const response = await api.get(
      `/public/articles/v1/comments/article/slug/${slug}?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching article comment public:', error)
    throw error
  }
}

export async function getArticleComment(
  slug: string,
  query: GetListQuery,
  token?: string
): Promise<ApiResponseList<Comment>> {
  try {
    // Use token if provided (server-side), otherwise use existing client (client-side)
    const client = token ? createServerApiClient(token) : apiWithAuth
    const response = await client.get(
      `/articles/v1/comments/article/slug/${slug}?${qs.stringify(query)}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching article comment:', error)
    throw error
  }
}

export async function postComment(payload: {
  article_id: number
  content: string
}): Promise<Comment> {
  try {
    const response = await apiWithAuth.post(`/articles/v1/comments`, payload)
    return response.data.results
  } catch (error) {
    console.error('Error post comment article:', error)
    throw error
  }
}

export async function getFaq({
  highlight,
  slug,
  page = 1,
  limit = 10,
  order = 'asc',
  orderBy = 'level',
}: {
  highlight?: boolean
  slug?: string
  page?: number
  limit?: number
  order?: string
  orderBy?: string
}): Promise<ApiFaqResponse<Faq>> {
  try {
    const params = new URLSearchParams()

    if (highlight) params.set('highlight', 'true')
    if (slug) params.set('slug', slug)
    if (page) params.set('page', String(page))
    if (limit) params.set('size', String(limit))
    if (orderBy) params.append('orderBy', String(orderBy))
    if (order) params.append('order', String(order))

    const response = await api.get(
      `/public/general/v1/faq?${params.toString()}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching FAQ list:', error)
    throw error
  }
}
