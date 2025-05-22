
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Settings, Search, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-2 mr-2">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="gradient-text font-extrabold">BookVibe</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-library-primary transition-colors font-medium">Home</Link>
          <Link to="/admin" className="text-gray-600 hover:text-library-primary transition-colors font-medium">Admin</Link>
          <Button className="bg-gradient-to-r from-library-primary to-library-secondary hover:from-library-primary/90 hover:to-library-secondary/90 text-white rounded-full shadow-md hover:shadow-lg transition-all">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="font-medium">Search with AI</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
