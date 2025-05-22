
import { useState, useEffect } from "react";
import { Book } from "@/types/book";
import { mockBooks } from "@/data/books";
import { Header } from "@/components/Header";
import { BookTable } from "@/components/admin/BookTable";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch books
    setBooks(mockBooks);
  }, []);

  const handleAddBook = (book: Omit<Book, "id">) => {
    const newBook = {
      ...book,
      id: crypto.randomUUID(),
    };
    
    setBooks([...books, newBook]);
    toast({
      title: "Book Added",
      description: `"${book.title}" has been successfully added.`,
    });
  };

  const handleUpdateBook = (id: string, bookData: Omit<Book, "id">) => {
    setBooks(books.map(book => 
      book.id === id ? { ...bookData, id } : book
    ));
    
    toast({
      title: "Book Updated",
      description: `"${bookData.title}" has been successfully updated.`,
    });
  };

  const handleDeleteBook = (id: string) => {
    const bookToDelete = books.find(book => book.id === id);
    setBooks(books.filter(book => book.id !== id));
    
    toast({
      title: "Book Deleted",
      description: bookToDelete 
        ? `"${bookToDelete.title}" has been successfully removed.`
        : "The book has been removed.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6 text-library-primary border-b pb-4">Library Administration</h1>
            
            <BookTable 
              books={books}
              onAddBook={handleAddBook}
              onUpdateBook={handleUpdateBook}
              onDeleteBook={handleDeleteBook}
            />
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
