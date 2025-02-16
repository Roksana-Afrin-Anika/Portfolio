import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { format } from "date-fns";
import Image from "next/image";

const getPost = (slug) => {
  const blogDir = path.join(process.cwd(), "public/data/blog");
  const files = fs.readdirSync(blogDir);

  // Find the matching file
  const fileName = files.find((file) => {
    const fileSlug = file
      .replace(".json", "")
      .replace(/[^a-zA-Z0-9\s-_]/g, "") // Allow underscores and hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/_/g, "-") // Replace underscores with hyphens
      .toLowerCase();
    return fileSlug === slug;
  });

  if (!fileName) return null;

  const filePath = path.join(blogDir, fileName);
  const content = fs.readFileSync(filePath, "utf-8");
  const post = JSON.parse(content);

  return {
    ...post,
    slug,
    formattedDate: format(new Date(post.date), "MMMM dd, yyyy"),
    featureImage: post.feature_image,
  };
};

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "public/data/blog");
  const files = fs.readdirSync(blogDir);

  return files
    .filter((file) => file !== "_index.json")
    .map((file) => ({
      slug: file
        .replace(".json", "")
        .replace(/[^a-zA-Z0-9\s-_]/g, "") // Allow underscores and hyphens
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/_/g, "-") // Replace underscores with hyphens
        .toLowerCase(),
    }));
}

export default function BlogPost({ params }) {
  const post = getPost(params.slug);

  if (!post) return notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Post Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="text-sm sm:text-base text-gray-500">
          <span>By {post.author}</span> • <time>{post.formattedDate}</time>
        </div>
      </header>

      {/* Feature Image */}
      <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-8">
        <Image
          src={`/${post.featureImage}`}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="prose sm:prose-lg lg:prose-xl max-w-none">
        {/* Introduction */}
        <p className="text-lg sm:text-xl text-gray-700">{post.content.intro}</p>

        {/* Body Sections */}
        {post.content.body?.map((section, index) => (
          <section key={index} className="mt-8">
            {section.heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {section.heading}
              </h2>
            )}
            {section.subheading && (
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {section.subheading}
              </h3>
            )}
            <p className="text-lg sm:text-xl text-gray-700">{section.text}</p>
          </section>
        ))}

        {/* Steps */}
        {post.content.steps?.map((step, index) => (
          <div key={index} className="mt-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {step.step}
            </h3>
            <ul className="list-disc pl-6">
              {step.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-lg sm:text-xl text-gray-700"
                >
                  <strong>{item.rule}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Core Values */}
        {post.content.core_values && (
          <div className="mt-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Core Values
            </h2>
            <ul className="list-disc pl-6">
              {post.content.core_values.map((value, index) => (
                <li key={index} className="text-lg sm:text-xl text-gray-700">
                  <strong>{value.value}:</strong> {value.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quote */}
        {post.content.quote && (
          <blockquote className="mt-8 p-6 bg-gray-50 border-l-4 border-blue-500 italic">
            <p className="text-lg sm:text-xl text-gray-700">
              {post.content.quote.text}
            </p>
            {post.content.quote.author && (
              <footer className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
                — {post.content.quote.author}
              </footer>
            )}
          </blockquote>
        )}
      </div>
    </article>
  );
}
