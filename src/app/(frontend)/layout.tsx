import type { Metadata } from 'next'
import { Barlow, Oswald } from 'next/font/google'
import React, { Suspense } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { asCategoryCards } from '@/utilities/cast'
import { getCategories } from '@/lib/data/catalog'
import { getFooter, getHeader, getSiteSettings } from '@/lib/data/globals'
import { DEFAULT_NAV, SITE_NAME } from '@/constants'
import './globals.css'

// Avoid build-time DB prerender — Neon can timeout while Next statically generates pages
export const dynamic = 'force-dynamic'

const display = Oswald({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

const body = Barlow({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: settings?.defaultSeo?.title || settings?.siteName || SITE_NAME,
      template: `%s · ${settings?.siteName || SITE_NAME}`,
    },
    description:
      settings?.defaultSeo?.description ||
      'Premium motorcycle spare parts, accessories, decorations, and modification components with bike-perfect fitment.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [settings, header, footer, categoriesResult] = await Promise.all([
    getSiteSettings(),
    getHeader(),
    getFooter(),
    getCategories(12).catch(() => ({ docs: [] })),
  ])
  const categories = categoriesResult

  const navigation =
    header?.navigation && header.navigation.length > 0
      ? header.navigation.map((item) => ({
          label: item.label,
          href: item.href,
        }))
      : DEFAULT_NAV

  const headerProps = {
    siteName: settings?.siteName || SITE_NAME,
    navigation,
    categories: asCategoryCards(categories.docs),
    announcement: header?.announcement,
    cta: header?.cta,
    whatsappNumber: settings?.whatsappNumber,
    contactNumber: settings?.contactNumber,
    logo: header?.logo || settings?.siteLogo,
  }

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col font-[family-name:var(--font-body)]">
        <Suspense fallback={<div className="h-[7.5rem] border-b border-border bg-surface lg:h-[10.5rem]" />}>
          <Header {...headerProps} />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer
          siteName={settings?.siteName || SITE_NAME}
          description={footer?.description}
          columns={footer?.columns}
          contact={
            footer?.contact || {
              phone: settings?.contactNumber,
              email: settings?.email,
              address: settings?.address,
            }
          }
          socialLinks={footer?.socialLinks || settings?.socialLinks}
          copyright={footer?.copyright}
          logo={footer?.logo || settings?.siteLogo}
          whatsappNumber={settings?.whatsappNumber}
        />
      </body>
    </html>
  )
}
