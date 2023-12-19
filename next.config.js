/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  images: {
      // minimumCacheTTL: 1,
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '5003',
          pathname: '/camera/original_camera',
        },
      ],
      remotePatterns: [
        {
          protocol: 'http',
          hostname: '192.168.31.248',
          port: '5000',
          pathname: '/camera/original_camera',
        }
      ]
    },
  DEBUG: true,
}


module.exports = nextConfig
