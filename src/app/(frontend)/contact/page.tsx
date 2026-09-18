import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'

import { ContactForm } from '@/components/contact/ContactForm'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { SITE_NAME } from '@/constants'
import { getSiteSettings } from '@/lib/data/globals'
import { buildMetadata } from '@/utilities/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: `Contact · ${SITE_NAME}`,
    description: 'Get in touch for fitment help, orders, and wholesale enquiries.',
    path: '/contact',
  })
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Contact' }]} className="mb-8" />
      <div className="mb-10 max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Support</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">Contact us</h1>
        <p className="mt-2 text-base text-steel">We typically respond within one business day.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="space-y-6 lg:col-span-2">
          <ul className="space-y-4 border border-border bg-surface p-6">
            {settings?.contactNumber ? (
              <li className="flex gap-3 text-sm">
                <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-steel">Phone</p>
                  <a
                    href={`tel:${settings.contactNumber.replace(/\s+/g, '')}`}
                    className="mt-1 font-medium text-ink hover:text-accent"
                  >
                    {settings.contactNumber}
                  </a>
                </div>
              </li>
            ) : null}
            {settings?.email ? (
              <li className="flex gap-3 text-sm">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-steel">Email</p>
                  <a href={`mailto:${settings.email}`} className="mt-1 font-medium text-ink hover:text-accent">
                    {settings.email}
                  </a>
                </div>
              </li>
            ) : null}
            {settings?.address ? (
              <li className="flex gap-3 text-sm">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-steel">Location</p>
                  <p className="mt-1 whitespace-pre-line text-ink">{settings.address}</p>
                </div>
              </li>
            ) : null}
          </ul>
          {settings?.whatsappNumber ? (
            <WhatsAppButton
              phone={settings.whatsappNumber}
              className="w-full sm:w-auto"
              message="Hi, I'd like to get in touch."
            >
              Chat on WhatsApp
            </WhatsAppButton>
          ) : null}
        </div>

        <div className="border border-border bg-surface p-6 md:p-8 lg:col-span-3">
          <h2 className="font-display text-lg">Send a message</h2>
          <p className="mt-1 text-sm text-steel">Include your bike model for faster fitment advice.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  )
}
