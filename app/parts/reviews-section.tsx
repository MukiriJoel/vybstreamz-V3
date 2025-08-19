import { Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReviewsSection() {
  const reviews = [
    {
      name: "John Doe",
      date: "Aug 15, 2025",
      rating: 5,
      text: "One of the standout features of Vybe Streams is its intuitive and user-friendly interface. Navigating through the system feels natural, and the layout makes it easy to locate and utilize various design elements. This is particularly beneficial for everyone looking to streamline their entertainment experience.",
    },
    {
      name: "John Doe",
      date: "Aug 15, 2025",
      rating: 4,
      text: "Awesome platform",
    },
    {
      name: "John Doe",
      date: "Aug 15, 2025",
      rating: 5,
      text: "One of the standout features of Vybe Streams is its intuitive and user-friendly interface. Navigating through the system feels natural, and the layout makes it easy to locate and utilize various design elements. This is particularly beneficial for everyone looking to streamline their entertainment experience.",
    },
    {
      name: "John Doe",
      date: "Aug 15, 2025",
      rating: 5,
      text: "One of the standout features of Vybe Streams is its intuitive and user-friendly interface. Navigating through the system feels natural, and the layout makes it easy to locate and utilize various design elements. This is particularly beneficial for everyone looking to streamline their entertainment experience.",
    },
    {
      name: "John Doe",
      date: "Aug 15, 2025",
      rating: 5,
      text: "One of the standout features of Vybe Streams is its intuitive and user-friendly interface. Navigating through the system feels natural, and the layout makes it easy to locate and utilize various design elements. This is particularly beneficial for everyone looking to streamline their entertainment experience.",
    },
  ]

  return (
    <div className="mt-8">
      {/* Add Review Section */}
      <div className="bg-[#2c2c2c] rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-[#eb3131] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">JD</span>
          </div>
          <div className="flex-1">
            <Textarea
              placeholder="Add your review"
              className="bg-[#1a1a1a] border-[#666666] text-white placeholder:text-[#a6a6a6] mb-4"
            />
            <Button className="bg-[#eb3131] hover:bg-[#eb3131]/80 text-white">
              <Send className="h-4 w-4 mr-2" />
              Post Review
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-[#f2f2f2] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#1a1a1a] text-xl font-semibold">User Reviews</h3>
          <div className="flex items-center space-x-2">
            <span className="text-[#666666] text-sm">Filter Reviews</span>
            <Select defaultValue="positive">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b border-[#e5e5e5] pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-[#eb3131] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">JD</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#1a1a1a] font-semibold">{review.name}</h4>
                    <span className="text-[#666666] text-sm">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= review.rating ? "fill-[#e7c909] text-[#e7c909]" : "text-[#d9d9d9]"}`}
                      />
                    ))}
                  </div>
                  <p className="text-[#666666] leading-relaxed">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          <Button variant="ghost" size="icon" className="text-[#666666]">
            &lt;
          </Button>
          <Button variant="ghost" size="sm" className="bg-[#eb3131] text-white">
            1
          </Button>
          <Button variant="ghost" size="sm" className="text-[#666666]">
            2
          </Button>
          <Button variant="ghost" size="sm" className="text-[#666666]">
            3
          </Button>
          <span className="text-[#666666]">...</span>
          <Button variant="ghost" size="sm" className="text-[#666666]">
            67
          </Button>
          <Button variant="ghost" size="sm" className="text-[#666666]">
            68
          </Button>
          <Button variant="ghost" size="icon" className="text-[#666666]">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
