import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IGNOU Power - Solved Assignments & Academic Help",
    short_name: "IGNOU Power",
    description: "Download verified IGNOU solved assignments, project synopses, and handwritten copies.",
    start_url: "/",
    display: "standalone",
    background_color: "#141B2C",
    theme_color: "#FF6A00",
    icons: [
      {
        src: "/icon",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
