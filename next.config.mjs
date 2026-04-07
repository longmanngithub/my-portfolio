/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: process.cwd(),
  },
  // Allow development access from local network (iPhone, other devices)
  allowedDevOrigins: ['192.168.3.74'],
  
  // Security Headers
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          {
            // Allow same-origin iframes (needed for AI Hand demo)
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            // Prevent MIME type sniffing
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Enable XSS filtering (legacy browsers)
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // Control referrer information
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Enforce HTTPS
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            // Control browser features/APIs — allow camera for AI Hand demo
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            // Content Security Policy - hardened but allows necessary resources
            key: "Content-Security-Policy",
            value: [
              // Default to self
              "default-src 'self'",
              // Scripts: self + inline for Next.js hydration + Vercel Analytics + CDN libs (Three.js, MediaPipe)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live https://unpkg.com https://cdn.jsdelivr.net https://threejs.org",
              // Styles: self + inline for styled-components/emotion/tailwind
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Images: self + data URIs + common image hosts
              "img-src 'self' data: blob: https:",
              // Fonts: self + Google Fonts
              "font-src 'self' data: https://fonts.gstatic.com",
              // Connections: self + Vercel Analytics + webpack HMR + CDN libs
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://unpkg.com https://cdn.jsdelivr.net https://threejs.org wss://localhost:* ws://localhost:*",
              // Media: self for music player
              "media-src 'self' blob:",
              // Frames: allow fitness app demo + self for AI Hand demo
              "frame-src 'self' https://track-your-fitness-beta.vercel.app",
              // Frame ancestors: allow self (for iframe embedding)
              "frame-ancestors 'self'",
              // Form actions: self only
              "form-action 'self'",
              // Base URI: self only
              "base-uri 'self'",
              // Object/embed: none
              "object-src 'none'",
              // Worker: needed for MediaPipe WASM
              "worker-src 'self' blob:",
            ].join("; "),
          },
          {
            // Prevent DNS prefetching leaks
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
}

export default nextConfig
