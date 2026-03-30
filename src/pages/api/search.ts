import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get("q")?.toLowerCase().trim() ?? "";

  if (query.length < 2) {
    return Response.json([]);
  }

  const projects = await getCollection(
    "portfolio",
    ({ data }) => !data.draft
  );

  const results = projects
    .filter((project) => {
      const searchable = [
        project.data.title,
        project.data.description,
        project.data.excerpt ?? "",
        project.data.category ?? "",
        ...(project.data.tags ?? []),
        ...(project.data.tools ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return searchable.includes(query);
    })
    .map((project) => ({
      id: project.id,
      title: project.data.title,
      description: project.data.description,
      category: project.data.category,
      tags: project.data.tags,
    }));

  return Response.json(results);
};
