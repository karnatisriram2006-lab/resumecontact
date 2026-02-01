/** @type {import('next').NextConfig} */
const nextConfig = {
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

    // This is a robust solution for the Firebase + Next.js build errors.
    // It forces Webpack to prioritize the "browser" export condition when resolving modules.
    // This ensures that the browser-compatible versions of Firebase packages are used for
    // client-side code, preventing the build from incorrectly pulling in Node.js-specific modules.
    const existingConditions = config.resolve.conditionNames || [];
    config.resolve.conditionNames = ['browser', ...existingConditions];

    return config;
  },
};

module.exports = nextConfig;
