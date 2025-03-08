import BlogPost from "@/components/BlogPost";
import { getBlogBySlug } from "@/lib/blog";

export default function BlogPostPage({ params }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    return <h1>Blog Not Found</h1>;
  }

  return <BlogPost blog={blog} />;
}
