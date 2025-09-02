import { MdSend } from "react-icons/md";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import RatingDisplay from "./RatingDisplay";

const ReviewTop = () => {
  return (
    <div className="flex w-full flex-col lg:flex-row lg:flex-wrap justify-between gap-4">
      <div className="block w-full lg:w-auto">
        <h2 className="capitalize font-semibold text-2xl">overall rating</h2>
        <p className="font-semibold text-4xl">4.8</p>
        <RatingDisplay className="pt-1" rating={4} />
        <p className="capitalize pt-1">678 ratings</p>
      </div>

      <div className="py-4 mb-6 w-full lg:flex-[4] lg:pl-15">
        <div className="flex flex-row items-start sm:items-center space-y-4 space-x-4 w-full">
          {/* User Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
            <img
              src={"/images/dp.png"}
              className="object-cover w-full h-full"
              alt="User profile"
            />
          </div>

          {/* Input Field */}
          <div className="flex-1 w-full pt-4 pl-4">
            <Textarea
              placeholder="Add your review"
              className="w-full bg-white dark:bg-[#2C2C2C] border-[#e5e5e5] dark:border-[#333333] placeholder:text-[#2C2C2C] dark:placeholder:text-white dark:text-[#FFFFFF]
            rounded-lg resize-none min-h-[60px] focus:bg-white dark:bg-[#2C2C2C] focus:border-gray-300
            transition-colors duration-200"
              rows={1}
            />
            <RatingDisplay className="pt-3" rating={4} />
          </div>

          {/* Send Button */}
          <Button
            className="cursor-pointer h-15 w-25 mb-6 bg-white dark:bg-[#2C2C2C] focus:border-gray-300 border-[#e5e5e5] dark:border-[#333333] hover:bg-[#E5E5E5] dark:bg-[#333333]/90 text-white
        rounded-lg transition-all duration-200 flex-shrink-0 self-center sm:self-auto"
          >
            <MdSend className="text-[#2C2C2C] dark:text-[#FFFFFF] w-15 h-15" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ReviewTop;
