/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['firebase', '@firebase/app', '@firebase/auth', '@firebase/firestore', '@firebase/storage'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
    ];

    return config;
  },
};

module.exports = nextConfig;
