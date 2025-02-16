import Link from "next/link";
import Image from "next/image";

export default function Portfolio({ projects }) {
  return (
    <div className="container mx-auto px-8 sm:px-12 lg:px-16 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Link href={`/portfolio/${project.slug}`}>
              <div className="relative h-64">
                <Image
                  src={`/${project.image}`} // Ensure the path starts with '/'
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600">{project.date}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
