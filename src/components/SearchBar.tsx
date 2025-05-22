
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onAskAI: (query: string) => void;
}

export const SearchBar = ({ onSearch, onAskAI }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      onAskAI(query);
    }
  };

  return (
    <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search books, authors, genres..."
            className="w-full pl-12 pr-4 py-3 h-12 text-base rounded-full border-2 border-gray-200 focus-visible:ring-library-primary focus-visible:border-library-primary shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-library-primary to-library-secondary hover:from-library-primary/90 hover:to-library-secondary/90 text-white rounded-full h-12 px-6 font-medium shadow-md hover:shadow-lg transition-all"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Search with AI
        </Button>
      </div>
    </form>
  );
};
