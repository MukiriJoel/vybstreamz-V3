import { Modal } from "@mui/material"
import { X } from "lucide-react"

export const ModalConfirmDetails =({isOpen, onClose, data, loading}: {
    isOpen: boolean,
    onClose: any,
    data?: any
    loading?: boolean
})=>{
    return(
        <Modal open={isOpen} onClose={() => onClose(false)} className="flex items-center justify-center">
                <div className="fixed inset-0 backdrop-blur bg-black/16 dark:bg-black/30 flex items-center justify-center z-50 p-4 transition-colors duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 w-full max-w-sm mx-4 relative transition-colors duration-200">
            {/* Close button */}
            <button
              onClick={() => onClose(false)}
              className="cursor-pointer absolute top-4 right-4 text-gray-400 dark:text-gray-300 hover:text-[#2C2C2C] dark:hover:text-white transition-colors duration-200"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            <div className="text-center space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-[#c62676] mb-4 sm:mb-6">
                Confirm Your Details
              </h3>
              
              <div className="space-y-3 sm:space-y-4 text-left">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#2C2C2C] dark:text-white mb-1 transition-colors duration-200">Phone Number</p>
                  <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-200 transition-colors duration-200">+{data?.phone_code} {data?.phone}</p>
                </div>
                
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#2C2C2C] dark:text-white mb-1 transition-colors duration-200">Email Address</p>
                  <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-200 transition-colors duration-200">{data?.email}</p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 sm:pt-6">
                <button
                  onClick={() => onClose(false)}
                  className="cursor-pointer flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-[#2C2C2C] dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 font-medium text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onClose(true)}
                  className="cursor-pointer flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-[#c62676] text-white rounded-full hover:bg-[#c62676]/90 transition-colors duration-200 font-medium text-xs sm:text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        </Modal>
         
    )
}