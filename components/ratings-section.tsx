import { Star } from "lucide-react"

interface RatingsComponentProps {
  overallRating?: number
  totalRatings?: number
  ratings?: {
    five: number
    four: number
    three: number
    two: number
    one: number
  }
}

export default function RatingsComponent({
  overallRating = 4.8,
  totalRatings = 678,
  ratings = {
    five: 85,
    four: 75,
    three: 35,
    two: 15,
    one: 10
  }
}: RatingsComponentProps) {
  // Calculate total for percentage calculations
  const total = ratings.five + ratings.four + ratings.three + ratings.two + ratings.one

  const ratingBars = [
    { label: "FIVE", count: ratings.five, percentage: (ratings.five / total) * 100 },
    { label: "FOUR", count: ratings.four, percentage: (ratings.four / total) * 100 },
    { label: "THREE", count: ratings.three, percentage: (ratings.three / total) * 100 },
    { label: "TWO", count: ratings.two, percentage: (ratings.two / total) * 100 },
    { label: "ONE", count: ratings.one, percentage: (ratings.one / total) * 100 }
  ]

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 bg-[#F2F2F2] dark:bg-[#141414] mt-1 px-8">
     <div className="p-6 rounded-lg max-w-4xl mt-8  mb-10">
      <div className="items-center pb-1">
        {/* Left Container - Rating bars */}
        <div className="space-y-2">
          {ratingBars.map((bar) => (
            <div key={bar.label} className="flex items-center space-x-3">
              <div className="w-12 text-sm font-medium text-[#2C2C2C] dark:text-[#FFFFFF] text-left">
                {bar.label}
              </div>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
              <div className="flex-1 relative">
                <div className="w-full h-2 bg-gray-300 rounded-full">
                  <div 
                    className="h-full bg-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${bar.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
    <div className="bg-[#E5E5E5] dark:bg-[#333333] p-10 rounded-lg max-w-2xl mt-4 ml-0 md:ml-4.5 mb-6">
      <div className="items-center">
        
        {/* Right Container - Overall rating and stars */}
        <div className="text-center">
          <div className="text-5xl font-light text-[#2C2C2C] dark:text-[#FFFFFF] mb-3">
            {overallRating}
          </div>
          <div className="flex justify-center mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.floor(overallRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : star === Math.ceil(overallRating) && overallRating % 1 !== 0
                    ? "fill-yellow-400/50 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-[#2C2C2C] dark:text-white">
            {totalRatings} Ratings
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}