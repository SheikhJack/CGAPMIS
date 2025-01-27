/** @type {import('next').NextConfig} */
const nextConfig = {
    middleware: ["/admin", "/board", "/workflows", "/financials"],
    images: {
        domains: ["media2.giphy.com"],
    },
};

export default nextConfig;
