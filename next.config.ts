import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only. The dev server allows localhost and the host it was started
  // with; reaching it over this machine's LAN/WSL address is a different
  // origin, so Next blocks its dev resources — HMR included. When that
  // happens the client runtime never boots and buttons do nothing, which
  // looks like broken forms rather than a blocked origin.
  allowedDevOrigins: ["172.20.104.246", "172.20.*.*", "172.17.0.1"],
  // Serves the API under this site's own /api path when API_ORIGIN is set
  // (production). The browser then only ever talks to this origin, so the
  // API's session cookies are first-party. Unset locally, where the UI calls
  // the API directly and localhost:3000/3001 already count as one site.
  async rewrites() {
    const apiOrigin = process.env.API_ORIGIN?.replace(/\/+$/, "");
    if (!apiOrigin) {
      return [];
    }
    return [{ source: "/api/:path*", destination: `${apiOrigin}/:path*` }];
  },
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
