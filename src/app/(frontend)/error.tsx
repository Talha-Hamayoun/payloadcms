'use client'

import { useEffect } from 'react'

import { ErrorState } from '@/components/ui/ErrorState'
import { Container } from '@/components/ui/Container'

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="py-16">
      <ErrorState
        title="Something went wrong"
        message="We couldn't load this page. Try again or return to the homepage."
        onRetry={reset}
      />
    </Container>
  )
}
