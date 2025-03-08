import fs from "fs";
import path from "path";
import Link from "next/link";
import ImageGrid from "@/components/ImageGrid.client";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const { slug } = params;

  if (!slug) return <p>Loading...</p>;

  try {
    const project = await getProjectData(slug);
    const allProjects = await getAllProjects();

    const currentIndex = allProjects.findIndex((p) => p.slug === slug);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject =
      currentIndex < allProjects.length - 1
        ? allProjects[currentIndex + 1]
        : null;

    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 font-orpheus">
        {/* Project Description */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8 text-base sm:text-lg text-center font-normal">
          <p className="text-gray-700">{project.description}</p>
        </div>

        {/* Use the Client Component for the Image Grid */}
        <ImageGrid
          images={project.project_images}
          projectTitle={project.title}
        />

        {/* Previous/Next Navigation */}
        <div className="flex justify-between mt-8 sm:mt-12 gap-4 sm:gap-6 font-normal">
          {/* Previous Project Link */}
          {!prevProject ? (
            <span className="invisible flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-black text-base sm:text-lg font-medium sm:rounded-xl opacity-0 cursor-not-allowed">
              {/* Empty space for the left side on first portfolio */}
            </span>
          ) : (
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-black text-base sm:text-lg font-medium sm:rounded-xl transition-all duration-300"
            >
              <ChevronLeft
                size={28}
                strokeWidth={1.5}
                className="mr-2 sm:mr-3"
              />
              <span className="hidden sm:inline font-orpheus font-normal tracking-normal text-[18px] sm:text-[21.4px] capitalize">
                {prevProject.slug.replace(/-/g, " ")}
              </span>
              <span className="sm:hidden font-orpheus font-normal tracking-normal text-[18px] capitalize">
                Previous
              </span>
            </Link>
          )}

          {/* Next Project Link */}
          {!nextProject ? (
            <span className="invisible flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-black text-base sm:text-lg font-medium rounded-lg sm:rounded-xl opacity-0 cursor-not-allowed">
              {/* Empty space for the right side on last portfolio */}
            </span>
          ) : (
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-black text-base sm:text-lg font-medium rounded-lg sm:rounded-xl transition-all duration-300"
            >
              <span className="hidden sm:inline font-orpheus font-normal tracking-normal text-[18px] sm:text-[21.4px] capitalize">
                {nextProject.slug.replace(/-/g, " ")}
              </span>
              <span className="sm:hidden font-orpheus font-normal tracking-normal text-[18px] capitalize">
                Next
              </span>
              <ChevronRight
                size={28}
                strokeWidth={1.5}
                className="ml-2 sm:ml-3"
              />
            </Link>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }
}
