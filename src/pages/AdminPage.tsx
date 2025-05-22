
import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import { Header } from "@/components/Header";
import { BookTable } from "@/components/admin/BookTable";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const BASE_API_URL = "http://shoppychatbot.duckdns.org:3055";

const AdminPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const offset = (currentPage - 1) * booksPerPage;
        const response = await fetch(`${BASE_API_URL}/books?limit=${booksPerPage}&offset=${offset}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        
        const data = await response.json();
        setTotalBooks(data.total);
        
        // Map the API response to match our Book type
        const mappedBooks: Book[] = data.books.map((book: any) => ({
          id: book.id.toString(),
          title: book.title,
          author: book.author,
          coverUrl: `https://picsum.photos/seed/${book.id}/600/900`, // Generate random cover image
          description: book.description || "",
          publishedYear: new Date(book.publish_date).getFullYear(),
          genre: book.genre,
          isbn: book.isbn || "",
          pages: book.pages,
          language: book.language,
          publisher: book.publisher,
          rating: book.rating,
          checked_out: book.checked_out,
          checkout_date: book.checkout_date,
          due_date: book.due_date
        }));
        
        setBooks(mappedBooks);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load books",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, booksPerPage, toast]);

  const handleAddBook = async (book: Omit<Book, "id">) => {
    try {
      // Format data for API
      const formattedData = {
        title: book.title,
        author: book.author,
        genre: book.genre,
        publish_date: new Date(book.publishedYear, 0, 1).toISOString().split('T')[0],
        isbn: book.isbn,
        description: book.description,
        publisher: book.publisher || "",
        pages: book.pages || 0,
        language: book.language || "English",
        rating: book.rating || 3  // Default rating if not provided
      };
      
      const response = await fetch(`${BASE_API_URL}/books/create`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      
      const newBook = await response.json();
      
      // Map the response to our Book type
      const mappedBook: Book = {
        id: newBook.id.toString(),
        title: newBook.title,
        author: newBook.author,
        coverUrl: `https://picsum.photos/seed/${newBook.id}/600/900`,
        description: newBook.description || "",
        publishedYear: new Date(newBook.publish_date).getFullYear(),
        genre: newBook.genre,
        isbn: newBook.isbn || "",
        pages: newBook.pages,
        language: newBook.language,
        publisher: newBook.publisher,
        rating: newBook.rating,
        checked_out: false,
        checkout_date: null,
        due_date: null
      };
      
      // Update local state
      setBooks([...books, mappedBook]);
      // Return to first page to see the newly added book
      setCurrentPage(1);
      
      toast({
        title: "Book Added",
        description: `"${book.title}" has been successfully added.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add book",
        variant: "destructive"
      });
    }
  };

  const handleUpdateBook = async (id: string, bookData: Omit<Book, "id">) => {
    try {
      // Format data for API
      const formattedData = {
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        publish_date: new Date(bookData.publishedYear, 0, 1).toISOString().split('T')[0],
        isbn: bookData.isbn,
        description: bookData.description,
        publisher: bookData.publisher || "",
        pages: bookData.pages || 0,
        language: bookData.language || "English",
        rating: bookData.rating || 0,
        book_id: parseInt(id)
      };
      
      const response = await fetch(`${BASE_API_URL}/books/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(formattedData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      
      // Update local state
      setBooks(books.map(book => 
        book.id === id ? { ...bookData, id } : book
      ));
      
      toast({
        title: "Book Updated",
        description: `"${bookData.title}" has been successfully updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update book",
        variant: "destructive"
      });
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      const bookToDelete = books.find(book => book.id === id);
      
      const response = await fetch(`${BASE_API_URL}/books/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      
      // Update local state
      const filteredBooks = books.filter(book => book.id !== id);
      setBooks(filteredBooks);
      
      // If we delete the last book on the current page and it's not the first page,
      // go back one page
      const maxPage = Math.ceil((totalBooks - 1) / booksPerPage);
      if (filteredBooks.length === 0 && currentPage > 1 && currentPage > maxPage) {
        setCurrentPage(currentPage - 1);
      }
      
      toast({
        title: "Book Deleted",
        description: bookToDelete 
          ? `"${bookToDelete.title}" has been successfully removed.`
          : "The book has been removed.",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6 text-library-primary border-b pb-4">Library Administration</h1>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-t-2 border-b-2 border-library-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading books...</p>
              </div>
            ) : (
              <>
                <BookTable 
                  books={books}
                  onAddBook={handleAddBook}
                  onUpdateBook={handleUpdateBook}
                  onDeleteBook={handleDeleteBook}
                />
                
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1 || isLoading}
                    >
                      {isLoading ? 
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading
                        </span>
                        : "Previous"
                      }
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {Math.ceil(totalBooks / booksPerPage)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(Math.ceil(totalBooks / booksPerPage), p + 1))}
                      disabled={currentPage >= Math.ceil(totalBooks / booksPerPage) || isLoading}
                    >
                      {isLoading ? 
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading
                        </span>
                        : "Next"
                      }
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Per page:</span>
                    <select 
                      className="text-sm border border-gray-300 rounded-md px-2 py-1"
                      value={booksPerPage}
                      onChange={(e) => {
                        setBooksPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset to first page when changing items per page
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                    
                    <div className="text-sm text-gray-500 ml-4">
                      Showing {totalBooks > 0 ? ((currentPage - 1) * booksPerPage) + 1 : 0}-{Math.min(currentPage * booksPerPage, totalBooks)} of {totalBooks} books
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © 2025 LibraryAI Admin Panel. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;
