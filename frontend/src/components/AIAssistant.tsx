'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';

interface AIAssistantProps {
  productId: string;
  reviews: Array<{ rating: number; comment: string }>;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  productId,
  reviews
}) => {
  const [summary, setSummary] = useState<string>('');
  const [reviewInsights, setReviewInsights] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (productId) {
      fetchAISummary();
    }
  }, [productId]);

  const fetchAISummary = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3001/ai/summary', {
        productId
      });
      
      setSummary(response.data.productSummary);
      setReviewInsights(response.data.reviewInsights);
    } catch (err) {
      setError('Failed to generate AI insights. Please try again later.');
      console.error('AI summary error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-purple-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-purple-600" size={32} />
          <span className="ml-3 text-gray-600">Generating AI insights...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                AI-Generated Product Summary
              </h3>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  {summary || 'AI summary will appear here once generated.'}
                </p>
              </div>
            </div>

            {reviews.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Top Review Insights
                </h3>
                <div className="bg-white rounded-md p-4 shadow-sm">
                  <p className="text-gray-700 leading-relaxed">
                    {reviewInsights || 'Review insights will appear here once generated.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={fetchAISummary}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Sparkles size={16} />
            Regenerate AI Insights
          </button>
        </>
      )}
    </div>
  );
};