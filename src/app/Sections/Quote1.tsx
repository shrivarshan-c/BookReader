import { IconQuote } from "@tabler/icons-react"

export const Quote1 = ()=>{


    return(

        <div className="max-w-5xl mx-auto -my-24 px-4 h-4">
            <div className="relative flex items-center justify-center p-8 md:p-12 bg-linear-to-b from-white via-neutral-50 to-neutral-200 rounded-2xl border-2 border-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-accent-yellow rounded-full border-2 border-border flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <IconQuote size={32} className="text-main-foreground" />
                </div>
                
                <div className="flex flex-col items-center gap-4 max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-main-foreground leading-relaxed">
                        Books and music are the strongest forms of magic.
                    </h2>
                    <p className="text-lg md:text-xl font-medium text-main-foreground/80">— T. K. Coleman</p>
                </div>
            </div>
        </div>
    )
}