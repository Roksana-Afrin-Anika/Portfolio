import Blog from "@/components/Blog";
import { format } from "date-fns";
import fs from "fs";
import path from "path";

// Function to get blog posts
const getBlogPosts = () => {
  try {
    const blogDir = path.join(process.cwd(), "public/data/blog");
    const files = fs.readdirSync(blogDir);

    // Get main blog page content
    const indexContent = fs.readFileSync(
      path.join(blogDir, "_index.json"),
      "utf-8"
    );
    const indexData = JSON.parse(indexContent);

    // Process blog posts
    const posts = files
      .filter((file) => file !== "_index.json")
      .map((file) => {
        const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
        const jsonData = JSON.parse(content);
        return {
          ...jsonData,
          slug: file
            .replace(".json", "")
            .replace(/[^a-zA-Z0-9\s-_]/g, "")
            .replace(/\s+/g, "-")
            .replace(/_/g, "-")
            .toLowerCase(),
          formattedDate: format(new Date(jsonData.date), "MMMM dd, yyyy"),
          excerpt: jsonData.content.intro || "",
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return { indexData, posts };
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return { indexData: {}, posts: [] };
  }
};

// Blog page component
export default function BlogPage() {
  const { indexData, posts } = getBlogPosts();

  // Use the Blog component and pass indexData and posts as props
  return <Blog indexData={indexData} posts={posts} />;
}
