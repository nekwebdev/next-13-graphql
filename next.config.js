/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '127.0.0.1', 'host.docker.internal'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
