import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.profileglow.tech";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: new Date("2026-10-28"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
