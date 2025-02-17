import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>NU Curations</title>
      </head>
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
