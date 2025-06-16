// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dummyjson.com'],
  },
  // Optional: Untuk static export
  // output: 'export'
}

module.exports = nextConfig