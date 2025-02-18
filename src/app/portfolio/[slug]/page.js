import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";

async function getProjectData(slug) {
  const filePath = path.join(
    process.cwd(),
    "public/data/portfolio",
    `${slug}.json`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Project data not found for slug: ${slug}`);
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return data;
}

async function getAllProjects() {
  const portfolioDir = path.join(process.cwd(), "public/data/portfolio");
  const files = fs
    .readdirSync(portfolioDir)
    .filter((file) => file !== "_index.json");

  const projects = files.map((file) => {
    const slug = file.replace(".json", "");
    return { slug };
  });

  return projects;
}

export default async function ProjectPage({ params }) {
  // Await params to resolve dynamically
  const { slug } = await params;

  if (!slug) return <p>Loading...</p>;

  try {
    const project = await getProjectData(slug);
    const allProjects = await getAllProjects();

    // Find the current project index
    const currentIndex = allProjects.findIndex((p) => p.slug === slug);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject =
      currentIndex < allProjects.length - 1
        ? allProjects[currentIndex + 1]
        : null;

    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 font-orpheus">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          {project.title}
        </h1>

        {/* Project Description */}
        <div className="max-w-4xl mx-auto mb-8 text-lg text-center">
          <p className="text-gray-700">{project.description}</p>
        </div>

        {/* Centered Masonry Grid Layout for Images */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {project.project_images && project.project_images.length > 0 ? (
              project.project_images.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg group"
                >
                  <Image
                    src={`/${image}`} // Ensure correct path
                    alt={`${project.title} - Image ${index + 1}`}
                    width={500}
                    height={300} // Dynamic height for different aspect ratios
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    loading="lazy" // Improves performance
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No images available for this project.
              </p>
            )}
          </div>
        </div>

        {/* Previous/Next Navigation */}
        <div className="flex justify-between mt-12 border-t pt-8 gap-4">
          {prevProject ? (
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="flex items-center justify-center px-6 py-3 bg-[#8B5E3C] text-white rounded-xl transition-all duration-300 hover:bg-[#7A4D32] transform hover:scale-105 hover:shadow-lg"
            >
              <span className="mr-2">←</span>
              <span className="hidden sm:inline">
                {prevProject.slug.replace(/-/g, " ")}
              </span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <span className="flex items-center justify-center px-6 py-3 bg-[#8B5E3C] text-white rounded-xl opacity-50 cursor-not-allowed">
              <span className="mr-2">←</span>
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Previous</span>
            </span>
          )}

          {nextProject ? (
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="flex items-center justify-center px-6 py-3 bg-[#8B5E3C] text-white rounded-xl transition-all duration-300 hover:bg-[#7A4D32] transform hover:scale-105 hover:shadow-lg"
            >
              <span className="hidden sm:inline">
                {nextProject.slug.replace(/-/g, " ")}
              </span>
              <span className="sm:hidden">Next</span>
              <span className="ml-2">→</span>
            </Link>
          ) : (
            <span className="flex items-center justify-center px-6 py-3 bg-[#8B5E3C] text-white rounded-xl opacity-50 cursor-not-allowed">
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <span className="ml-2">→</span>
            </span>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }
}
