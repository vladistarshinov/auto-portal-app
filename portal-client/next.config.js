/** @type {import('next').NextConfig} */
const nextConfig = {
  //reactStrictMode: true,
  poweredByHeader: false,
  optimizeFonts: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:4201/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `http://localhost:4201/uploads/:path*`,
      },
    ]
  },
}

module.exports = nextConfig

