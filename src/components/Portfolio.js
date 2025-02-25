import Link from "next/link";

export default function Portfolio({ projects }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Render list of projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link key={project.slug} href={`/portfolio/${project.slug}`}>
            <div className="relative group">
              <img
                src={`/${project.image}`} // Ensure correct path
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
