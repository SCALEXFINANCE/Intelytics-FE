/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
},
pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

 
  //  headers() {
  //   return [
  //     {
  //       // Adding favicon
  //       source: '/public/favicon.svg',
  //       headers: [
  //         {
  //           key: 'Link',
  //           value: '/public/favicon.svg; rel="shortcut icon"',
  //         },
  //       ],
  //     },
  //   ];
  // }
 

export default nextConfig;
