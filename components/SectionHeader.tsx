import { MdArrowForward } from "react-icons/md"
import { Button } from "./ui/button"

interface SectionHeaderProps {
  onViewMoreClick: () => void;
  title:string;
}

const SectionHeader = ({onViewMoreClick,title}:SectionHeaderProps) =>{
    return(
        <div className="flex items-center pt-0 justify-between">
                <h3 className="text-lg md:text-2xl font-bold text-black dark:text-white capitalize">{title}</h3>
                <Button
                  variant="ghost"
                  className="cursor-pointer text-[#333333] dark:text-white text-base !font-medium" onClick={onViewMoreClick}
                >
                  View More
                  <MdArrowForward className="!w-8 !h-8" />
                </Button>
              </div>
    )
}
export default SectionHeader;