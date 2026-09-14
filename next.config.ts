import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async rewrites() {
    return [
      // Turkish prefixless routes -> mapped to internal /tr/...
      { source: "/", destination: "/tr" },
      { source: "/hakkimizda", destination: "/tr/hakkimizda" },
      { source: "/misyon-vizyon-degerler", destination: "/tr/misyon-vizyon-degerler" },
      { source: "/organizasyon-semasi", destination: "/tr/organizasyon-semasi" },
      { source: "/kadromuz", destination: "/tr/kadromuz" },
      { source: "/kadromuz/:slug*", destination: "/tr/kadromuz/:slug*" },
      { source: "/hizmetler", destination: "/tr/hizmetler" },
      { source: "/hizmetler/:slug*", destination: "/tr/hizmetler/:slug*" },
      { source: "/galeri", destination: "/tr/galeri" },
      { source: "/blog", destination: "/tr/blog" },
      { source: "/blog/:slug*", destination: "/tr/blog/:slug*" },
      { source: "/projeler", destination: "/tr/projeler" },
      { source: "/projeler/:slug*", destination: "/tr/projeler/:slug*" },
      { source: "/iletisim", destination: "/tr/iletisim" },
      { source: "/kvkk", destination: "/tr/kvkk" },
      { source: "/cerez-politikasi", destination: "/tr/cerez-politikasi" },

      // English semantic routes -> mapped to internal /en/...
      { source: "/en/about", destination: "/en/hakkimizda" },
      { source: "/en/mission-vision-values", destination: "/en/misyon-vizyon-degerler" },
      { source: "/en/organization-chart", destination: "/en/organizasyon-semasi" },
      { source: "/en/team", destination: "/en/kadromuz" },
      { source: "/en/team/:slug*", destination: "/en/kadromuz/:slug*" },
      { source: "/en/services", destination: "/en/hizmetler" },
      { source: "/en/services/:slug*", destination: "/en/hizmetler/:slug*" },
      { source: "/en/gallery", destination: "/en/galeri" },
      { source: "/en/projects", destination: "/en/projeler" },
      { source: "/en/projects/:slug*", destination: "/en/projeler/:slug*" },
      { source: "/en/contact", destination: "/en/iletisim" },
      { source: "/en/privacy", destination: "/en/kvkk" },
      { source: "/en/cookie-policy", destination: "/en/cerez-politikasi" },
    ];
  },
};

export default nextConfig;
