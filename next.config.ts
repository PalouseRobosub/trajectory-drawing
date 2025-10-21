import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: "/trajectory-drawing",
  output: "export",
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8081/api/:path*'
            : '/api/',
      },
    ]
  },
};

export default nextConfig;
