
import { AISummary as AISummaryType } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface AISummaryProps {
  summary: AISummaryType | null;
  isLoading: boolean;
}

export const AISummary = ({ summary, isLoading }: AISummaryProps) => {
  if (isLoading) {
    return (
      <Card className="mb-6 border-2 border-purple-200 bg-purple-50/30 shadow-md rounded-xl animate-pulse overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-pink-50/30 to-purple-50/30 opacity-50"></div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-lg font-bold flex items-center">
            <div className="h-5 w-40 shimmer rounded-full"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-2">
            <div className="h-4 shimmer rounded-full w-full"></div>
            <div className="h-4 shimmer rounded-full w-full"></div>
            <div className="h-4 shimmer rounded-full w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <Card className="mb-6 border-2 border-purple-200 bg-purple-50/30 shadow-md rounded-xl animate-fade-in overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-pink-50/30 to-purple-50/30 opacity-50"></div>
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-lg font-bold flex items-center gradient-text">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-full p-1.5 mr-2">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          Book AI Vibes
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <p className="text-gray-800 leading-relaxed">{summary.text}</p>
        <p className="mt-3 text-sm text-gray-500 italic">Based on your search: "{summary.query}"</p>
      </CardContent>
    </Card>
  );
};
