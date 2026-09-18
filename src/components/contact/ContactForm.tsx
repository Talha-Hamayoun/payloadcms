'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { contactFormSchema, type ContactFormValues } from '@/validations/contact'

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null)
    setSuccess(false)
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      setServerError(data?.error || 'Something went wrong. Please try again.')
      return
    }
    setSuccess(true)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Name" error={errors.name?.message} {...register('name')} />
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
        <Input label="Bike model" error={errors.bikeModel?.message} {...register('bikeModel')} />
      </div>
      <Input label="Subject" error={errors.subject?.message} {...register('subject')} />
      <Textarea label="Message" rows={5} error={errors.message?.message} {...register('message')} />
      {serverError ? (
        <p className="text-sm text-accent" role="alert">
          {serverError}
        </p>
      ) : null}
      {success ? (
        <p className="text-sm text-success" role="status">
          Thanks — we&apos;ll get back to you soon.
        </p>
      ) : null}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
