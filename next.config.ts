import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only. The dev server allows localhost and the host it was started
  // with; reaching it over this machine's LAN/WSL address is a different
  // origin, so Next blocks its dev resources — HMR included. When that
  // happens the client runtime never boots and buttons do nothing, which
  // looks like broken forms rather than a blocked origin.
  allowedDevOrigins: ["172.20.104.246", "172.20.*.*", "172.17.0.1"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
