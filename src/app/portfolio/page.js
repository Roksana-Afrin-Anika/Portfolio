import fs from "fs";
import path from "path";
import Portfolio from "../../components/Portfolio";

async function getPortfolioData() {
  const portfolioDir = path.join(process.cwd(), "public/data/portfolio");

  // Check if directory exists
  if (!fs.existsSync(portfolioDir)) {
    throw new Error("Portfolio data directory not found.");
  }

  // Read _index.json
  const indexFilePath = path.join(portfolioDir, "_index.json");
  if (!fs.existsSync(indexFilePath)) {
    throw new Error("_index.json file is missing.");
  }

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

export default async function PortfolioPage({ params }) {
  const { indexData, projects } = await getPortfolioData();

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Light gray background and padding */}
      <Portfolio projects={projects} />
    </div>
  );
}
