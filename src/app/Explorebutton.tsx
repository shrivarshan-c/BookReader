"use client";
"use client";
import { Button } from "@/components/ui/NeoBrutalismButton"
import { IconBook } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export const Explorebutton =()=>{
    const router = useRouter()


    return(
        <div className="w-full h-36 mt-32 flex items-center justify-center">

       
        <Button 
    onClick={() => router.push('/library')}
    className="flex items-center w-fit gap-2 bg-accent-lightGreen hover:bg-accent-lightRed hover:text-white text-black px-4 py-2 rounded-lg"
>
    <IconBook size={20} />
    <span>Explore More</span>
</Button> 
</div>   )
}
