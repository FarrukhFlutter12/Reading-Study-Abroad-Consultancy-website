/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The flag assets in /public/flags are our own hand-authored SVGs. Next
    // refuses to optimise SVG without this opt-in; the CSP below keeps any
    // scripting inside an SVG inert.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline';",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
