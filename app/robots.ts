import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.profileglow.tech";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/report/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
