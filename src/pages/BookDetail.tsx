import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "@/types/book";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BASE_API_URL = "http://shoppychatbot.duckdns.org:3055";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!book || !id) return;
    
    try {
      setIsCheckingOut(true);
      
      const response = await fetch(`${BASE_API_URL}/books/checkout`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          book_id: parseInt(id),
          days: 14
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to check out book');
      }
      
      const result = await response.json();
      
      // Update the book state with checkout information
      setBook({
        ...book,
        checked_out: true,
        checkout_date: result.checkout_date,
        due_date: result.due_date
      });
      
      toast({
        title: "Success",
        description: result.message || "Book has been checked out successfully.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check out the book. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCheckingOut(false);
      setIsCheckoutDialogOpen(false);
    }
  };

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_API_URL}/books/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        
        const bookData = await response.json();
        
        // Map the API response to match our Book type
        const mappedBook: Book = {
          id: bookData.id.toString(),
          title: bookData.title,
          author: bookData.author,
          coverUrl: `https://picsum.photos/seed/${bookData.id}/600/900`, // Generate random cover image
          description: bookData.description || "",
          publishedYear: new Date(bookData.publish_date).getFullYear(),
          genre: bookData.genre,
          isbn: bookData.isbn,
          pages: bookData.pages,
          language: bookData.language,
          publisher: bookData.publisher,
          rating: bookData.rating,
          checked_out: bookData.checked_out,
          checkout_date: bookData.checkout_date,
          due_date: bookData.due_date
        };
        
        setBook(mappedBook);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load book details",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetail();
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-full md:w-1/3 aspect-[2/3] rounded-xl" />
            <div className="w-full md:w-2/3 space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed</p>
          <Button onClick={() => navigate('/')}>Back to Library</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          ← Back to Library
        </Button>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Book Cover */}
          <div className="w-full md:w-1/3">
            <div className="sticky top-8">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={book.coverUrl} 
                  alt={`${book.title} cover`} 
                  className="w-full object-cover"
                />
              </div>
              
              <div className="mt-6 space-y-4">
                <div className={`p-4 rounded-lg text-center font-medium ${
                  book.checked_out 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  {book.checked_out ? (
                    <>
                      <p className="text-lg">Currently Checked Out</p>
                      <div className="text-sm mt-1">
                        <p>Borrowed: {book.checkout_date}</p>
                        <p>Due: {book.due_date}</p>
                      </div>
                    </>
                  ) : (
                    <p className="text-lg">Available for Checkout</p>
                  )}
                </div>

                {!book.checked_out && (
                  <Button 
                    className="w-full" 
                    onClick={() => setIsCheckoutDialogOpen(true)}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : "Check Out Book"}
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {/* Book checkout dialog */}
          <AlertDialog open={isCheckoutDialogOpen} onOpenChange={setIsCheckoutDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Check Out Confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to check out "{book?.title}" for 14 days?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isCheckingOut}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isCheckingOut}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCheckout();
                  }}
                  className="bg-library-primary hover:bg-library-primary/90"
                >
                  {isCheckingOut ? "Processing..." : "Check Out"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          {/* Book Details */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-6">by {book.author}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-sm text-gray-500">Genre</h3>
                <p>{book.genre}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Published</h3>
                <p>{book.publishedYear} by {book.publisher}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Pages</h3>
                <p>{book.pages}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Language</h3>
                <p>{book.language}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">ISBN</h3>
                <p>{book.isbn}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Rating</h3>
                <div className="flex items-center">
                  <div className="text-yellow-500 mr-2">
                    {'★'.repeat(Math.round(book.rating || 0))}
                    {'☆'.repeat(5 - Math.round(book.rating || 0))}
                  </div>
                  <span>{book.rating}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
