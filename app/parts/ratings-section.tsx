import { Star } from "lucide-react"

export default function RatingsSection() {
  const ratings = [
    { stars: "FIVE", percentage: 85 },
    { stars: "FOUR", percentage: 70 },
    { stars: "THREE", percentage: 45 },
    { stars: "TWO", percentage: 20 },
    { stars: "ONE", percentage: 10 },
  ]

  return (
    <div className="bg-[#2c2c2c] rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-white mb-2">4.8</div>
        <div className="flex justify-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-5 w-5 fill-[#e7c909] text-[#e7c909]" />
          ))}
        </div>
        <div className="text-[#a6a6a6]">678 Ratings</div>
      </div>

      <div className="space-y-3">
        {ratings.map((rating) => (
          <div key={rating.stars} className="flex items-center space-x-3">
            <span className="text-[#a6a6a6] text-sm w-12">{rating.stars}</span>
            <Star className="h-4 w-4 fill-[#e7c909] text-[#e7c909]" />
            <div className="flex-1 bg-[#666666] rounded-full h-2">
              <div className="bg-[#c62676] h-2 rounded-full" style={{ width: `${rating.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
