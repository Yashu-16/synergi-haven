
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Check if this is a page that is planned but not implemented yet
  const isPlannedPage = [
    "/about", "/login", "/register", "/blog", "/careers", "/faq", 
    "/testimonials", "/contact", "/privacy", "/terms", "/sitemap"
  ].includes(location.pathname) || location.pathname.startsWith("/doctor/") 
    || location.pathname.startsWith("/conditions/");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-synergi-50 py-20">
        <div className="text-center max-w-lg px-6">
          <h1 className="text-6xl font-bold mb-4 text-synergi-500">
            {isPlannedPage ? "Coming Soon" : "404"}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {isPlannedPage 
              ? "This page is under development and will be available soon!"
              : "Oops! The page you're looking for doesn't exist."}
          </p>
          
          <p className="text-gray-600 mb-8">
            {isPlannedPage 
              ? "We're working hard to bring you the best mental healthcare experience. Please check back later."
              : "Let's get you back on track to your mental wellness journey."}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-synergi-400 hover:bg-synergi-500 text-white">
              <Link to="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            {!isPlannedPage && (
              <Button asChild variant="outline" className="border-synergi-300 text-synergi-700 hover:bg-synergi-50">
                <Link to="/doctors">Browse Doctors</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
