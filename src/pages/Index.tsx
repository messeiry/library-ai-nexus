import { useState } from "react";
import { Book, AISummary as AISummaryType } from "@/types/book";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { AISummary } from "@/components/AISummary";
import { BookList } from "@/components/BookList";
import { toast } from "@/hooks/use-toast";

const BASE_API_URL = "http://shoppychatbot.duckdns.org:3055";

const Index = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<AISummaryType | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    setIsAiLoading(true);
    setShowResults(true);
    setAiSummary(null);
    
    // Make both API calls in parallel
    try {
      const [booksResponse, aiResponse] = await Promise.all([
        fetch(`${BASE_API_URL}/search?query=${encodeURIComponent(query)}`),
        fetch(`${BASE_API_URL}/rag?query=${encodeURIComponent(query)}`)
      ]);
      
      if (!booksResponse.ok) throw new Error('Failed to fetch books');
      if (!aiResponse.ok) throw new Error('Failed to fetch AI summary');
      
      const books = await booksResponse.json();
      const aiData = await aiResponse.json();
      
      // Map the API response to match our Book type
      const mappedBooks = books.map((book: any) => ({
        id: book.id.toString(),
        title: book.title,
        author: book.author,
        coverUrl: `https://picsum.photos/seed/${book.id}/300/450`, // Generate random cover image
        description: book.description || "",
        publishedYear: new Date(book.publish_date).getFullYear(),
        genre: book.genre,
        isbn: book.isbn,
        pages: book.pages,
        language: book.language,
        publisher: book.publisher,
        rating: book.rating,
        checked_out: book.checked_out,
        checkout_date: book.checkout_date,
        due_date: book.due_date
      }));
      
      setFilteredBooks(mappedBooks);
      setIsLoading(false);
      
      // Set AI summary
      setAiSummary({
        query: aiData.query,
        text: aiData.response
      });
      setIsAiLoading(false);
      
      toast({
        title: "Search Complete",
        description: "Found results for your search query.",
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      setIsAiLoading(false);
      
      toast({
        title: "Error",
        description: "Failed to fetch search results. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-library-primary">
                Discover Books with AI Assistance
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Search our vast library catalog and get AI-powered insights to help you find your next great read.
              </p>
              
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </section>
        
        {/* Results Section */}
        {showResults && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-semibold mb-6">
                Search Results {searchQuery && `for "${searchQuery}"`}
              </h2>
              
              {/* AI Summary */}
              <AISummary summary={aiSummary} isLoading={isAiLoading} />
              
              {/* Book List */}
              <BookList books={filteredBooks} isLoading={isLoading} />
            </div>
          </section>
        )}
        
        {/* Features Section */}
        {!showResults && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-semibold mb-12 text-center">Library Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-library-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Smart Search</h3>
                  <p className="text-gray-600">Quickly find books by title, author, genre or keywords.</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-library-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">AI Assistance</h3>
                  <p className="text-gray-600">Get intelligent summaries and recommendations based on your searches.</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-library-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Curated Collections</h3>
                  <p className="text-gray-600">Browse hand-picked selections organized by themes, genres, and reading levels.</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2025 LibraryAI. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <nav className="flex space-x-4 text-sm">
                <a href="#" className="text-gray-500 hover:text-library-primary">About</a>
                <a href="#" className="text-gray-500 hover:text-library-primary">Privacy</a>
                <a href="#" className="text-gray-500 hover:text-library-primary">Terms</a>
                <a href="#" className="text-gray-500 hover:text-library-primary">Contact</a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
