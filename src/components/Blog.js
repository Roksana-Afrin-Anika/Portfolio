import Image from "next/image";
import Link from "next/link";

export default function Blog({ indexData, posts }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8  font-orpheus">
      {/* Blog Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          {indexData.title}
        </h1>
        <p className="mt-2 text-lg sm:text-xl text-gray-600">
          {indexData.description}
        </p>
      </header>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/blog/${post.slug}`} passHref>
              <div>
                {/* Post Image */}
                <div className="relative h-48 sm:h-56 lg:h-64">
                  <Image
                    src={`/${post.image}`}
                    alt={post.content.image_alt_text || post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Post Content */}
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 mb-4">
                    {post.formattedDate}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="text-sm sm:text-base text-gray-500 italic">
                    By {post.author}
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
