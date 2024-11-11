import { Star } from 'lucide-react'

type Review = {
  id: string
  rating: number
  comment: string
  author: string
}

export function ProductReviews({ reviews }: { reviews: Review[] }) {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="flex items-center mb-4">
        <div className="flex mr-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= averageRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-gray-600">
          {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
        </span>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-t pt-4">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{review.author}</span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}