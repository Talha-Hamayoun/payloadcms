import { MessageCircle } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/Button'
import { cn } from '@/utilities/cn'
import { whatsappUrl } from '@/utilities/seo'

export type WhatsAppButtonProps = {
  phone: string
  message?: string
  children?: ReactNode
  className?: string
  external?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function WhatsAppButton({
  phone,
  message,
  children = 'WhatsApp',
  className,
  external = true,
  variant = 'primary',
  size = 'md',
}: WhatsAppButtonProps) {
  const href = whatsappUrl(phone, message)

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={cn(className)}
      leftIcon={<MessageCircle className="size-4" />}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Button>
  )
}
