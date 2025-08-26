import { Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MdSend } from "react-icons/md"
import { IconButton } from "@mui/material"
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6"

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
    <div className="mt-8 px-8">
      {/* Add Review Section */}
      {/* <div className="rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4 w-full">
          <div className="w-10 h-10 bg-[#eb3131] rounded-full flex items-center justify-center overflow-hidden">
            <img src={"/logos/user-profile-illustration.png"} className="object-cover w-full h-full"/>
          </div>
          
            <Textarea
              placeholder="Add your review"
              className="items-center flex bg-[#FFFFFF] border-[#E5E5E5] text-[#2C2C2C] placeholder:text-[#2C2C2C] mb-4"
            />
            <Button className=" h-15 bg-[#eb3131] hover:bg-[#eb3131]/80 text-white">
              <Send className="h-4 w-4 mr-2" />
              Post Review
            </Button>
          
        </div>
      </div> */}
  <div className="py-4 mb-6">
      <div className="flex items-center space-x-4 w-full">
        {/* User Avatar */}
        <div className="w-15 h-15 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={"/logos/user-profile-illustration.png"} 
            className="object-cover w-full h-full"
            alt="User profile"
          />
        </div>
        
        {/* Input Field */}
        <div className="flex-1">
          <Textarea
            placeholder="Add your review"
            className="w-[98%] bg-white border-[#E5E5E5] placeholder:text-[#2C2C2C] 
              rounded-lg resize-none min-h-[60px] focus:bg-white focus:border-gray-300 
              transition-colors duration-200 items-center"
            rows={1}
          />
        </div>
        
        {/* Send Button */}
        <Button className="cursor-pointer h-15 w-25 bg-white focus:border-gray-300 border-[#E5E5E5] hover:bg-[#E5E5E5]/90 text-white 
          rounded-lg transition-all duration-200 flex-shrink-0">
          <MdSend className="text-[#2C2C2C] w-15 h-15"/>
        </Button>
      </div>
</div>

      {/* Reviews List */}
      <div className="bg-[#E5E5E5] rounded-lg px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#1a1a1a] text-xl font-semibold">User Reviews</h3>
          <div className="flex items-center space-x-2">
            <span className="text-[#2C2C2C] text-sm">Filter Reviews</span>
            <br></br>
            <Select defaultValue="positive" >
              <SelectTrigger className="w-32 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent >
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
                  <div className="flex items-center justify-start mb-2">
                    <h4 className="text-[#1a1a1a] font-semibold">{review.name}</h4>
                   
                  </div>
                  <div className="flex items-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= review.rating ? "fill-[#e7c909] text-[#e7c909]" : "text-[#d9d9d9]"}`}
                      />
                    ))}
                     <span className="text-[#2C2C2C] text-sm ml-6">{review.date}</span>
                  </div>
                  <p className="text-[#2C2C2C] text-sm leading-relaxed">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          <IconButton className="">
            <FaCircleChevronLeft className="mr-4 w-10 h-10 text-[#333333] "/>
          </IconButton>
          <Button variant="ghost" size="sm" className="bg-[#C62676] text-white">
            1
          </Button>
          <Button variant="ghost" size="sm" className="text-[#2C2C2C]">
            2
          </Button>
          <Button variant="ghost" size="sm" className="text-[#2C2C2C]">
            3
          </Button>
          <span className="text-[#666666]">...</span>
          <Button variant="ghost" size="sm" className="text-[#2C2C2C]">
            67
          </Button>
          <Button variant="ghost" size="sm" className="text-[#2C2C2C]">
            68
          </Button>
          <IconButton  className="bg-[#333333]">
            <FaCircleChevronRight className="ml-4 w-10 h-10 text-[#2C2C2C]" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
