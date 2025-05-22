
import { useState } from "react";
import { Book } from "@/types/book";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookForm } from "@/components/admin/BookForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface BookTableProps {
  books: Book[];
  onAddBook: (book: Omit<Book, "id">) => void;
  onUpdateBook: (id: string, book: Omit<Book, "id">) => void;
  onDeleteBook: (id: string) => void;
}

export const BookTable = ({ books, onAddBook, onUpdateBook, onDeleteBook }: BookTableProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleAddBook = (book: Omit<Book, "id">) => {
    onAddBook(book);
    setIsAddDialogOpen(false);
  };

  const handleUpdateBook = (book: Omit<Book, "id">) => {
    if (editingBook) {
      onUpdateBook(editingBook.id, book);
      setEditingBook(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Books</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-library-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>
            <BookForm 
              onSubmit={handleAddBook} 
              onCancel={() => setIsAddDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>
                  <div className="h-12 w-10 overflow-hidden rounded">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publishedYear}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Dialog open={!!editingBook} onOpenChange={(open) => !open && setEditingBook(null)}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingBook(book)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    {editingBook && (
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Book</DialogTitle>
                        </DialogHeader>
                        <BookForm 
                          initialData={editingBook} 
                          onSubmit={handleUpdateBook} 
                          onCancel={() => setEditingBook(null)} 
                        />
                      </DialogContent>
                    )}
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the book "{book.title}" from the database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => onDeleteBook(book.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
            {books.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  No books found. Add a new book to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
