/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import ShareIcon from '@/components/icons/share'
import WhatsappIcon from '@/components/icons/whatsapp'
import { ArticleCard } from '@/components/pages/article/common/CardArticle'
import { CarouselBanner } from '@/components/pages/homepage/2-Carousel/Carousel'
import { PackageListEvent } from '@/components/pages/homepage/4-PackageList/PackageListEvent'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ACCOUNT_URL } from '@/constant/env'
import {
  Article,
  Category,
  Comment,
  PackageTagSlug,
} from '@/constant/types/ArticleProps'
import { Banner } from '@/constant/types/BannerProps'
import { GenericResponse } from '@/constant/types/GeneralProps'
import { useAuth } from '@/contexts/auth/context'
import { Profile } from '@/contexts/auth/shared/type'
import { useComments } from '@/hooks/article-hooks/useComment'
import { useGallerySharing } from '@/hooks/gallery-package-hooks'
import {
  formatCreatedDate,
  formatDateToDDMMYYYY,
  formatReadTime,
} from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Fragment, useRef, useState } from 'react'
import { toast } from 'sonner' // Assuming you have toast notifications

export default function ContentArticle({
  content,
  title,
  author,
  token,
  created_at,
  category,
  read_time,
  button_link,
  button_text,
  other_articles,
  type,
  packageCampaign,
  dataBannerCarousel,
  comments: initialComments,
  id, // Add this prop
}: {
  content: string
  title: string
  token?: string
  author?: Profile
  created_at: Date | string
  category: Category
  read_time: number
  button_link: string
  button_text: string
  other_articles: Article[]
  type: string
  packageCampaign?: PackageTagSlug
  dataBannerCarousel: GenericResponse<Banner>
  comments: Comment[]
  id: number // Add this prop
}) {
  const { shareViaCopyLink } = useGallerySharing()
  const { profile } = useAuth()

  const [isCommentFocused, setIsCommentFocused] = useState(false)
  const [commentText, setCommentText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Use the comments hook
  const { comments, isSubmitting, error, submitComment, clearError } =
    useComments({
      initialComments,
      articleId: id,
    })

  const isPromoPackage = type === 'reguler' && other_articles

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      toast.error('Please enter a comment')
      return
    }

    try {
      await submitComment(commentText)
      setCommentText('')
      setIsCommentFocused(false)
      inputRef.current?.blur()
      toast.success('Comment posted successfully!')
    } catch (error) {
      // Error is already handled by the hook, but you can add additional handling here
      toast.error('Failed to post comment. Please try again.')
    }
  }

  const handleInputFocus = () => {
    setIsCommentFocused(true)
    // Clear any existing errors when user starts typing
    if (error) {
      clearError()
    }
  }

  const handleInputBlur = (e: React.FocusEvent) => {
    // Only blur if we're not clicking on the submit button
    if (!e.relatedTarget?.closest('.comment-actions')) {
      setIsCommentFocused(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value)
    // Clear error when user starts typing
    if (error) {
      clearError()
    }
  }

  return (
    <div
      className={`${isPromoPackage ? 'grid grid-cols-1' : 'mx-auto grid grid-cols-6 max-lg:grid-cols-1'} relative my-8 gap-8 max-lg:mt-2 max-lg:mb-4 max-lg:gap-4`}
    >
      {/* Title and Description Article */}
      <div
        className={`${isPromoPackage ? 'col-start-1 col-end-7' : 'col-span-4 col-start-2'} flex flex-col gap-2 max-lg:col-span-12`}
      >
        <p className="heading-1-semibold max-lg:text-[20px] max-lg:leading-6.5">
          {title}
        </p>
        <div className="flex items-center gap-3 max-lg:gap-2">
          <div className="flex items-center gap-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author?.avatarProvider} alt="User avatar" />
              <AvatarFallback className=" text-neutral-800 max-lg:text-xs max-lg:leading-4">
                {author?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-m-regular  max-lg:text-xs max-lg:leading-4">
              {author?.name}
            </p>
          </div>
          <p className="text-m-regular text-neutral-800 max-lg:text-xs max-lg:leading-4">
            •
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:hidden max-lg:text-xs max-lg:leading-4">
            {formatDateToDDMMYYYY(
              typeof created_at === 'string' ? new Date(created_at) : created_at
            )}
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:hidden max-lg:text-xs max-lg:leading-4">
            |
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:text-xs max-lg:leading-4">
            {category.name}
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:text-xs max-lg:leading-4">
            •
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:text-xs max-lg:leading-4">
            {formatReadTime(read_time ?? 0)}
          </p>
          <p className="text-m-regular text-neutral-800 max-lg:hidden max-lg:text-xs max-lg:leading-4">
            |
          </p>
          <div className="flex items-center gap-2 max-lg:hidden">
            <p className="text-l-regular text-neutral-500">Bagikan:</p>
            <WhatsappIcon size={20} className="cursor-pointer" />
            <ShareIcon
              size={20}
              onClick={shareViaCopyLink}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={`${isPromoPackage ? 'col-start-1 col-end-4' : 'col-span-4 col-start-2'} max-lg:col-span-12`}
      >
        <div className="flex flex-col gap-6">
          <div
            className="article-content break-all"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {(button_link || button_text) && (
            <div className="bg-primary-500 flex items-center justify-center rounded-[20px] py-3">
              <Button className="bg-neutral-0 px-10 py-3">{button_text}</Button>
            </div>
          )}
          {type !== 'reguler' && (
            <>
              {packageCampaign && (
                <PackageListEvent
                  dataCustom={packageCampaign}
                  eventCategory="article_detail"
                  params="tS"
                />
              )}
              <CarouselBanner
                dataBanner={dataBannerCarousel}
                title="Penawaran lain"
                className="mt-0"
                description=""
                showPerItem={2}
              />
            </>
          )}

          {/* Enhanced Comment Section */}
          <motion.div
            className="flex w-full flex-col overflow-hidden rounded-[20px] border-1 border-neutral-100"
            animate={{
              height: isCommentFocused ? 'auto' : 'auto',
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {token ? (
              <>
                <motion.div
                  className="p-4"
                  initial={false}
                  animate={{
                    paddingBottom: isCommentFocused ? 16 : 16,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Error display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-3 rounded-md bg-red-50 p-3 text-sm text-red-600"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Input field */}
                  <div className="relative">
                    <Input
                      ref={inputRef}
                      placeholder="Bagaimana menurutmu?"
                      value={commentText}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      disabled={isSubmitting}
                      className="w-full resize-none border-0 bg-neutral-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 disabled:opacity-50"
                    />
                  </div>

                  {/* Action buttons - only show when focused */}
                  <AnimatePresence>
                    {isCommentFocused && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className="comment-actions mt-2 flex items-center justify-between px-2"
                      >
                        {/* Comment guidelines */}
                        <div className="flex flex-1 flex-row items-center gap-1">
                          <p className="text-s-regular">Berkomentar sebagai:</p>
                          <p className="text-s-semibold">
                            {profile?.name || 'Anonymous User'}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setIsCommentFocused(false)
                              setCommentText('')
                              clearError()
                              inputRef.current?.blur()
                            }}
                            disabled={isSubmitting}
                            className="px-10 py-2 text-neutral-600 hover:text-neutral-800 disabled:opacity-50"
                          >
                            Batal
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleCommentSubmit}
                            disabled={!commentText.trim() || isSubmitting}
                            className="bg-primary-500 hover:bg-primary-600 w-full px-10 py-2 text-white disabled:bg-neutral-200 disabled:text-neutral-400"
                          >
                            {isSubmitting ? 'Mengirim...' : 'Kirim'}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                {comments?.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto p-4 px-0 pt-0">
                    {comments?.map((comment) => (
                      <div
                        key={comment.id}
                        className="mb-4 flex flex-col gap-2.5"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={comment.user?.avatar}
                              alt="User avatar"
                            />
                            <AvatarFallback className="text-sm font-medium text-neutral-800">
                              {comment.user?.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-neutral-900">
                              {comment.user?.name || 'Anonymous User'}
                            </p>
                            <p className="text-xs-regular text-neutral-500">
                              {formatCreatedDate(comment.created_at)}
                            </p>
                          </div>
                        </div>
                        <p className="text-m-regular text-neutral-800">
                          {comment?.content}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-s-regular p-4 text-center text-neutral-500">
                    Belum ada komentar. Jadilah yang pertama!
                  </p>
                )}
              </>
            ) : (
              <div className="flex w-full flex-col items-center gap-4 p-4">
                <div className="flex w-full flex-col items-center gap-4 rounded-2xl border-1 border-neutral-200 p-4">
                  <p className="text-s-regular">
                    Kamu membutuhkan akun untuk mulai berkomentar!
                  </p>
                  <Link
                    href={`${ACCOUNT_URL}/auth/login?redirectUri=${typeof window !== 'undefined' ? window.location.href : ''}`}
                    className="text-s-semibold bg-primary-500 rounded-full px-10 py-2 text-neutral-900"
                  >
                    Masuk/Buat Akun
                  </Link>
                </div>
                {comments?.length > 0 && (
                  <div className="max-h-96 overflow-y-auto p-4 px-0 pt-0">
                    {comments?.map((comment) => (
                      <div
                        key={comment.id}
                        className="mb-4 flex flex-col gap-2.5"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={comment.user?.avatar}
                              alt="User avatar"
                            />
                            <AvatarFallback className="text-sm font-medium text-neutral-800">
                              {comment.user?.name?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-neutral-900">
                              {comment.user?.name || 'Anonymous User'}
                            </p>
                            <p className="text-xs-regular text-neutral-500">
                              {formatCreatedDate(comment.created_at)}
                            </p>
                          </div>
                        </div>
                        <p className="text-m-regular text-neutral-800">
                          {comment?.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Artikel Lainnya */}
      {isPromoPackage && (
        <div className="relative col-span-2 col-end-7 max-lg:col-span-12">
          <div className="max-lg:rounded-0 sticky top-30 flex flex-col rounded-[20px] border-1 border-neutral-200 p-4 max-lg:gap-5 max-lg:border-0 max-lg:p-0">
            <p className="heading-4-semibold mb-4">
              <span className="border-b-primary-500 border-b-4">Artikel</span>{' '}
              Lainnya
            </p>
            {other_articles.map((article, idx) => {
              return (
                <Fragment key={`article-${idx}-${article.title}`}>
                  <ArticleCard
                    article={article}
                    height={200}
                    className={'h-full'}
                    aspect={16 / 9}
                    eventCategory="article-detail"
                  />
                  {idx !== other_articles.length - 1 && (
                    <div className="my-2.5 h-px w-full bg-[#D2D2D1] max-lg:hidden" />
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
