
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onAskAI: (query: string) => void;
}

export const SearchBar = ({ onSearch, onAskAI }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleAIClick = () => {
    if (query.trim()) {
      onAskAI(query);
    }
  };

  return (
    <form className="w-full max-w-4xl mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for books by title, author, or genre..."
            className="w-full pl-4 pr-10 py-2 text-base rounded-lg border focus-visible:ring-library-primary"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-library-primary hover:bg-library-primary/90 text-white">
            Search
          </Button>
          <Button
            type="button"
            onClick={handleAIClick}
            variant="outline"
            className="border-library-primary text-library-primary hover:bg-library-primary hover:text-white"
          >
            Ask AI
          </Button>
        </div>
      </div>
    </form>
  );
};
