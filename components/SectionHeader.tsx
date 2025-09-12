import { MdArrowForward } from "react-icons/md"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";

interface SectionHeaderProps {
  route:string ;
  title:string;
  viewButton: boolean | null
}

const SectionHeader = ({route,title,viewButton}:SectionHeaderProps) =>{
  const router = useRouter();
  
  const onViewMoreClick =(route:string)=>{
   
    router.push(route)
  }
    return(
        <div className="flex items-center pt-0 justify-between">
                <h3 className="text-lg md:text-2xl font-bold text-black dark:text-white capitalize">{title}</h3>
                {viewButton &&
                 <Button
                  variant="ghost"
                  className=" !pr-0 cursor-pointer text-[#333333] dark:text-white text-base !font-medium" onClick={()=>onViewMoreClick(route)}
                >
                  View More
                  <MdArrowForward className="!w-8 !h-8" />
                </Button>
                }
               
              </div>
    )
}
export default SectionHeader;