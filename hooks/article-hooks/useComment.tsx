/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Comment } from '@/constant/types/ArticleProps'
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

  const submitComment = useCallback(
    async (content: string) => {
      if (!content.trim()) {
        setError('Comment cannot be empty')
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
        if (comments?.length > 0) {
          setComments((prevComments) => [newComment, ...prevComments])
        } else {
          setComments([newComment])
        }
      } catch (err) {
        console.log(err)

        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to submit comment. Please try again.'
        setError(errorMessage)
        throw err // Re-throw so the component can handle it if needed
      } finally {
        setIsSubmitting(false)
      }
    },
    [articleId]
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
