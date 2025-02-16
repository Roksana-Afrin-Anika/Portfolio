import fs from "fs";
import path from "path";
import Image from "next/image";

async function getProjectData(slug) {
  const filePath = path.join(
    process.cwd(),
    "public/data/portfolio",
    `${slug}.json`
  );
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return data;
}

export default async function ProjectPage({ params }) {
  const project = await getProjectData(params.slug);

  return (
    <div className="container mx-auto px-8 sm:px-12 lg:px-16 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">{project.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {project.project_images.map((image, index) => (
          <div key={index} className="relative h-64">
            <Image
              src={`/${image}`} // Ensure the path starts with '/'
              alt={`${project.title} - Image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
