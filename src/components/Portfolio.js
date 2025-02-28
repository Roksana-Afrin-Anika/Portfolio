import Link from "next/link";

export default function Portfolio({ projects }) {
  return (
    <div className="container mx-auto px-2 py-8">
      {/* Render list of projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link key={project.slug} href={`/portfolio/${project.slug}`}>
            <div className="relative group flex flex-col items-center">
              {/* Image container with adjusted dimensions */}
              <div className="w-4/5 h-64 overflow-hidden">
                <img
                  src={`/${project.image}`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                />
              </div>
              <p className="mt-2 text-center text-lg font-orpheus text-[19.24px] font-normal">
                {project.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
