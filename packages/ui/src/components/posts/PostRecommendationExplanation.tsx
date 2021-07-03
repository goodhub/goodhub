import { FC } from 'react';

export interface PostRecommendationExplanationProps {
  tag: string
  onHide?: () => void
}

export const PostRecommendationExplanation: FC<PostRecommendationExplanationProps> = ({ tag, onHide }) => {
  return <div className="px-6 py-2.5 bg-gray-50 border-b border-gray-200">
    {/* Origin and dismissal banner */}
    <p className="text-gray-900 text-sm mr-1">
      You’re seeing this post because it’s about <span className="font-medium">{tag}</span>
    </p>
  </div>
}