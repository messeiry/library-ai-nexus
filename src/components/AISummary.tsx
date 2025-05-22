
import { AISummary as AISummaryType } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AISummaryProps {
  summary: AISummaryType | null;
  isLoading: boolean;
}

export const AISummary = ({ summary, isLoading }: AISummaryProps) => {
  if (isLoading) {
    return (
      <Card className="mb-6 border-blue-200 bg-blue-50/50 shadow-sm animate-pulse">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-library-primary flex items-center">
            <div className="h-5 w-40 bg-blue-200 rounded"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-blue-100 rounded w-full"></div>
            <div className="h-4 bg-blue-100 rounded w-full"></div>
            <div className="h-4 bg-blue-100 rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50/50 shadow-sm animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-library-primary flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{summary.text}</p>
        <p className="mt-2 text-sm text-gray-500 italic">Based on your search: "{summary.query}"</p>
      </CardContent>
    </Card>
  );
};
