import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.whileinqueue.io/", lastModified: new Date() },
    { url: "https://www.whileinqueue.io/tenzy", lastModified: new Date() },
    {
      url: "https://www.whileinqueue.io/tenzy/leaderboard",
      lastModified: new Date(),
    },
    {
      url: "https://www.whileinqueue.io/tenzy/changelog",
      lastModified: new Date(),
    },
  ];
}
