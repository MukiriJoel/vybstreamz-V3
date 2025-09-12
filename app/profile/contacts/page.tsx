import { MdHeadphones } from "react-icons/md";

export default function ContactPage(){
return(
     <div className="min-h-screen w-[98vw] lg:w-[calc(95vw-256px)] bg-[#F2F2F2] dark:bg-[#141414]  pt-12">
      {/* Header */}
    
      <div className="flex">
        
        {/* Main Content */}
        
          <main className="flex px-4 py-2 mx-auto w-full justify-center">
          <div className="bg-white dark:bg-[#2C2C2C] rounded-lg shadow-sm p-4 w-full">
            <div className="">
              <h1 className="text-2xl font-bold text-[#2c2c2c] dark:text-white mb-4">Contact Us</h1>
                           
            </div>
            <div className="flex items-center">
              <MdHeadphones className="w-7 h-7 text-[#808080] dark:text-white"/>
              <p className="text-[#2C2C2C] ml-3 !text-xl font-bold dark:text-white">Call</p>
            </div>
            <div className="block pl-0 pt-3">
               <p className="text-[#2C2C2C] text-xl font-extrabold dark:text-white leading-[144%]">Prepay</p>
               <p className="text-[#2C2C2C] text-base font-normal dark:text-white leading-[144%]">Call 100 (No Charge)</p>
               <p className="text-[#2C2C2C] text-base font-normal dark:text-white leading-[144%]">Call +254 722 002 100</p>
               <p className="text-[#2C2C2C] text-base font-normal dark:text-white leading-[144%]">Email customercare@safaricom.co.ke</p>
            </div>
            <div className="block pl-0 pt-6">
               <p className="text-[#2C2C2C] text-xl font-extrabold dark:text-white leading-[144%]">Postpay</p>
               <p className="text-[#2C2C2C] text-base !font-normal dark:text-white leading-[144%]">Call 200 (No Charge)</p>
               <p className="text-[#2C2C2C] text-base !font-normal dark:text-white leading-[144%]">Call +254 722 002 100 (Chargeable)</p>
               <p className="text-[#2C2C2C] text-base !font-normal dark:text-white leading-[144%]">Email advantage@safaricom.co.ke</p>
            </div>
          </div>
        </main>
        </div>
    </div>
)
}