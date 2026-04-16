import type { NextConfig } from 'next'

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    // Only sent over HTTPS — Vercel always uses HTTPS in production
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // Prevent cross-origin window takeover
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    // Restrict cross-origin resource reads
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    // frame-ancestors prevents clickjacking (supersedes X-Frame-Options for modern browsers)
    key: 'Content-Security-Policy',
    value: "frame-ancestors 'none'; upgrade-insecure-requests",
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  // Prevent server-side information leakage
  poweredByHeader: false,
}

export default nextConfig
