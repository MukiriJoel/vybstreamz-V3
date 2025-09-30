// "use client"

// import { useState } from "react"
// import { useRouter } from 'next/navigation'
// import { useAuth } from "@/lib/context/AuthContext"

// const genres = [
//   "Drama",
//   "Comedy",
//   "HipHop",
//   "RnB",
//   "Action",
//   "Sci-Fi",
//   "Thriller",
//   "Romance",
//   "Horror",
//   "Documentary",
//   "Fantasy",
//   "Mystery",
//   "Adventure",
//   "Animation",
//   "Biography",
//   "Crime",
//   "Family",
//   "History",
//   "Music",
//   "Musical",
//   "Sport",
//   "Superhero",
//   "War",
//   "Western",
//   "Romantic Comedy",
//   "Science Fiction",
//   "Action Comedy",
//   "Spy",
//   "Courtroom Drama",
//   "Psychological Thriller",
//   "Zombie",
//   "Paranormal",
//   "Musical Drama",
//   "Historical Fiction",
// ]

// const initialSelected = [""]

// export default function PreferencePage() {
//   const [selectedGenres, setSelectedGenres] = useState<string[]>(initialSelected)
//   const router = useRouter()
//   const {  login } = useAuth() // Added login function

//   const toggleGenre = (genre: string) => {
//     setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
//   }
  
//   const handleExplore = () => {
//     login() // Set logged in state to true
//     router.push('/')
//   }

//   return (
//     <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#141414] px-2 py-12 sm:px-6   lg:px-4 lg:pt-40">
//       <div className="mx-auto max-w-4xl">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] mb-4">
//             Help us understand your preference
//           </h1>
//           <p className="text-lg sm:text-xl text-[#999999]">Explore, compare, vibe – without switching apps</p>
//         </div>

//         {/* Genre Selection Buttons */}
//         <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {genres.map((genre, index) => (
//             <button
//               key={`${genre}-${index}`}
//               onClick={() => toggleGenre(genre)}
//               className={`
//                 cursor-pointer px-6 py-3 rounded-full text-sm sm:text-base font-medium
//                 transition-all duration-200 ease-in-out
//                 hover:scale-105 active:scale-95
//                 ${
//                   selectedGenres.includes(genre)
//                     ? "bg-[#c62676] text-white shadow-lg"
//                     : "bg-[#E5E5E5] dark:bg-[#333333] text-[#2C2C2C] dark:text-[#FFFFFF] hover:bg-[#d9d9d9]"
//                 }
//               `}
//             >
//               {genre}
//             </button>
//           ))}
//         </div>

//         {/* Ready to Explore Button */}
//         <div className="text-center">
//           <button 
//             className="text-lg sm:text-xl font-medium text-[#c62676] hover:underline transition-all duration-200" 
//             onClick={handleExplore}
//           >
//             I am ready to explore
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/lib/context/AuthContext"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { addUserInterests } from "@/store/thunks/catalogThunks"
import { getListInterests } from "@/store/thunks/catalogThunks"

const genres = [
  "Drama",
  "Comedy",
  "HipHop",
  "RnB",
  "Action",
  "Sci-Fi",
  "Thriller",
  "Romance",
  "Horror",
  "Documentary",
  "Fantasy",
  "Mystery",
  "Adventure",
  "Animation",
  "Biography",
  "Crime",
  "Family",
  "History",
  "Music",
  "Musical",
  "Sport",
  "Superhero",
  "War",
  "Western",
  "Romantic Comedy",
  "Science Fiction",
  "Action Comedy",
  "Spy",
  "Courtroom Drama",
  "Psychological Thriller",
  "Zombie",
  "Paranormal",
  "Musical Drama",
  "Historical Fiction",
]

// Validation schema
const schema = yup.object().shape({
  selectedGenres: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one genre")
    .required("Please select at least one genre"),
})

interface GenreFormData  {
  selectedGenres: string[]
}

export default function PreferencePage() {
   const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [genreList, setGenreList] = useState<any>(null);
  const {user}=useAppSelector((state)=>state.auth);
  
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<GenreFormData >({
    //@ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      selectedGenres: [],
    },
  })

  const selectedGenres = watch("selectedGenres")


  useEffect(()=>{
    const getGenresList = async () =>{
      try{
        setLoading(true);
        const res = await dispatch(getListInterests()).unwrap();
        console.log(res?.data)
        setGenreList(res?.data);
      }catch (error) {
        console.error('Failed to fetch genres', error);
      } finally {
          setLoading(false);
      }
    }
    getGenresList();
  },[]);

  const toggleGenre = (genre: string) => {
    const currentGenres = selectedGenres || []
    if (currentGenres.includes(genre)) {
      setValue("selectedGenres", currentGenres.filter((g) => g !== genre))
    } else {
      setValue("selectedGenres", [...currentGenres, genre])
    }
  }

  const onSubmit = async (data: GenreFormData ) => {
    console.log("Selected genres:", data.selectedGenres)
    if(!data.selectedGenres || data.selectedGenres.length === 0){
      toast.warning("preferences are empty");
      return;
    }

    try{
        setLoading(true);
        const res = await dispatch(
          addUserInterests({
            userId:user.id,
            genres:data.selectedGenres
          })
        ).unwrap();
        console.log("res",res)
        toast.success(res?.message);
        // router.push("/")
    }catch(e:any){
      toast.error(e || "Could not add interests", { duration: 5000 });
    }finally{
      setLoading(false)
    }
    
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#141414] px-2 py-12 sm:px-6 lg:px-4 lg:pt-40">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] mb-4">
            Help us understand your preference
          </h1>
          <p className="text-lg sm:text-xl text-[#999999]">Explore, compare, vibe – without switching apps</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Genre Selection Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {genres.map((genre, index) => (
              <button
                key={`${genre}-${index}`}
                type="button"
                onClick={() => toggleGenre(genre)}
                className={`
                  cursor-pointer px-6 py-3 rounded-full text-sm sm:text-base font-medium
                  transition-all duration-200 ease-in-out
                  hover:scale-105 active:scale-95
                  ${
                    selectedGenres?.includes(genre)
                      ? "bg-[#c62676] text-white shadow-lg"
                      : "bg-[#E5E5E5] dark:bg-[#333333] text-[#2C2C2C] dark:text-[#FFFFFF] hover:bg-[#d9d9d9]"
                  }
                `}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {errors.selectedGenres && (
            <div className="text-center mb-8">
              <p className="text-red-500 text-sm">{errors.selectedGenres.message}</p>
            </div>
          )}

          {/* Ready to Explore Button */}
          <div className="text-center">
            <button 
              type="submit"
              disabled={loading}
              className="cursor-pointer text-lg sm:text-xl font-medium text-[#c62676] hover:underline transition-all duration-200"
            >
              I am ready to explore
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}