import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-accent">404</p>
      <h1 className="mt-2 text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-steel normal-case tracking-normal">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Button href="/" className="mt-8">
        Back home
      </Button>
      <Link href="/products" className="mt-4 text-sm text-accent hover:underline">
        Browse products
      </Link>
    </Container>
  )
}
