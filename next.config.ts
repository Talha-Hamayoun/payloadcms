import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

type ImageRemotePattern = {
  protocol?: 'http' | 'https'
  hostname: string
  port?: string
  pathname?: string
}

function remotePatternFromUrl(raw?: string): ImageRemotePattern[] {
  if (!raw) return []
  try {
    const url = new URL(raw)
    const protocol = url.protocol.replace(':', '') as 'http' | 'https'
    return [
      {
        protocol,
        hostname: url.hostname,
        port: url.port || undefined,
        pathname: '/**',
      },
    ]
  } catch {
    return []
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/**',
      },
      // Cloudflare R2 public / custom domain (e.g. https://media.example.com)
      ...remotePatternFromUrl(process.env.R2_PUBLIC_URL),
      // R2.dev public bucket hostnames
      {
        protocol: 'https',
        hostname: '*.r2.dev',
        pathname: '/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
