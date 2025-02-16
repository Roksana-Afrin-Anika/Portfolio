import fs from "fs";
import path from "path";
import Portfolio from "../../components/Portfolio";

async function getPortfolioData() {
  const portfolioDir = path.join(process.cwd(), "public/data/portfolio");

  // Read _index.json
  const indexFilePath = path.join(portfolioDir, "_index.json");
  const indexData = JSON.parse(fs.readFileSync(indexFilePath, "utf-8"));

  // Read other portfolio files
  const portfolioFiles = fs
    .readdirSync(portfolioDir)
    .filter((file) => file !== "_index.json"); // Exclude _index.json

  const projects = portfolioFiles.map((file) => {
    const filePath = path.join(portfolioDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return {
      ...data,
      slug: file.replace(".json", ""), // Generate a slug for routing
    };
  });

  return { indexData, projects };
}

export default async function PortfolioPage() {
  const { indexData, projects } = await getPortfolioData();

  return (
    <div>
      {/* Render _index.json content at the top */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{indexData.title}</h1>
        <p className="text-gray-600">
          Published on: {new Date(indexData.date).toLocaleDateString()}
        </p>
      </div>

      {/* Render the list of projects */}
      <Portfolio projects={projects} />
    </div>
  );
}
