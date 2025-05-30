'use client'

import { Comment } from '@/constant/types/ArticleProps'
import { useAuth } from '@/contexts/auth/context'
import { postComment } from '@/services/article-service'
import { useCallback, useState } from 'react'

interface UseCommentsProps {
  initialComments?: Comment[]
  articleId: number
}

interface UseCommentsReturn {
  comments: Comment[]
  isSubmitting: boolean
  error: string | null
  submitComment: (content: string) => Promise<void>
  clearError: () => void
}

export const useComments = ({
  initialComments = [],
  articleId,
}: UseCommentsProps): UseCommentsReturn => {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { profile } = useAuth()

  const submitComment = useCallback(
    async (content: string) => {
      if (!content.trim()) {
        setError('Comment tidak boleh kosong')
        return
      }

      setIsSubmitting(true)
      setError(null)

      try {
        const newComment = await postComment({
          article_id: articleId,
          content: content.trim(),
        })

        // Add the new comment to the beginning of the list
        setComments((prevComments) => [
          {
            ...newComment,
            user: {
              name: profile?.name ?? '', // Ensure name is always a string
              avatar: profile?.avatarProvider ?? '',
            },
          } as Comment,
          ...(prevComments ?? []),
        ])
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Gagal membuat komen. Tolong ulangi beberapa saat lagi.'
        setError(errorMessage)
        throw err // Re-throw so the component can handle it if needed
      } finally {
        setIsSubmitting(false)
      }
    },
    [articleId, profile]
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    comments,
    isSubmitting,
    error,
    submitComment,
    clearError,
  }
}
