import { useState } from "react";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BookFormProps {
  initialData?: Book;
  onSubmit: (book: Omit<Book, "id">) => void;
  onCancel: () => void;
}

export const BookForm = ({ initialData, onSubmit, onCancel }: BookFormProps) => {
  const [formData, setFormData] = useState<Omit<Book, "id">>({
    title: initialData?.title || "",
    author: initialData?.author || "",
    coverUrl: initialData?.coverUrl || "",
    description: initialData?.description || "",
    publishedYear: initialData?.publishedYear || new Date().getFullYear(),
    genre: initialData?.genre || "",
    isbn: initialData?.isbn || "",
    pages: initialData?.pages || 1,
    language: initialData?.language || "English",
    publisher: initialData?.publisher || "",
    rating: initialData?.rating,
    checked_out: initialData?.checked_out || false,
    checkout_date: initialData?.checkout_date || null,
    due_date: initialData?.due_date || null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "publishedYear" || name === "pages" ? parseInt(value) || 0 : 
              name === "rating" ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book Title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author Name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverUrl">Cover Image URL</Label>
          <Input
            id="coverUrl"
            name="coverUrl"
            value={formData.coverUrl}
            onChange={handleChange}
            placeholder="https://example.com/cover.jpg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publishedYear">Published Year</Label>
          <Input
            id="publishedYear"
            name="publishedYear"
            type="number"
            value={formData.publishedYear}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Fiction, Non-Fiction, etc."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="978-3-16-148410-0"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="publisher">Publisher</Label>
          <Input
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Publishing House"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Input
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="English"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pages">Pages</Label>
          <Input
            id="pages"
            name="pages"
            type="number"
            value={formData.pages}
            onChange={handleChange}
            placeholder="Number of pages"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={formData.rating || ""}
            onChange={handleChange}
            placeholder="Book rating"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Book description"
          className="min-h-[120px]"
          required
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-library-primary">
          {initialData ? "Update Book" : "Add Book"}
        </Button>
      </div>
    </form>
  );
};
