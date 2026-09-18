import { Container } from '@/components/ui/Container'
import { ProductGridSkeleton } from '@/components/ui/LoadingSkeleton'

export default function ProductsLoading() {
  return (
    <Container className="py-8 md:py-12">
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-paper-muted" />
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-paper-muted" />
      <ProductGridSkeleton count={8} />
    </Container>
  )
}
