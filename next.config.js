/** @type {import('next').NextConfig} */
const nextConfig = {
    // For Cloudflare Pages deployment
    output: 'standalone',

    // Disable image optimization (not supported on Cloudflare Pages)
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
