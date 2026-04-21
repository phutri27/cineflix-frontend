export default function LoadingScreen(){
     return (
            <div className="bg-[#141414] text-white min-h-screen p-6 md:p-10 font-sans">
                <div className="flex justify-center mb-10 border-b border-neutral-800 pb-6">
                    <div className="h-10 w-48 bg-neutral-800 animate-pulse rounded"></div>
                </div>
                <div className="max-w-2xl mx-auto flex flex-col gap-6">
                    <div className="h-14 w-full bg-neutral-800/40 animate-pulse rounded-lg border border-neutral-800"></div>
                    <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-6 flex flex-col gap-4 animate-pulse">
                        <div className="h-7 w-48 bg-neutral-800 rounded mb-2"></div>
                        <div className="h-20 w-full bg-neutral-800/60 rounded-lg"></div>
                        <div className="h-20 w-full bg-neutral-800/60 rounded-lg"></div>
                    </div>
                    <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-6 flex flex-col gap-4 animate-pulse">
                        <div className="h-7 w-48 bg-neutral-800 rounded mb-2"></div>
                        <div className="flex gap-4">
                            <div className="h-28 w-20 bg-neutral-800 rounded shrink-0"></div>
                            <div className="flex flex-col gap-3 flex-1 pt-1">
                                <div className="h-5 w-3/4 bg-neutral-800 rounded"></div>
                                <div className="h-4 w-16 bg-neutral-800 rounded"></div>
                                <div className="mt-2 h-16 w-full bg-neutral-800/50 rounded"></div>
                            </div>
                        </div>
                        <div className="border-t border-neutral-800 mt-2 pt-4 flex justify-between">
                            <div className="h-5 w-24 bg-neutral-800 rounded"></div>
                            <div className="h-6 w-20 bg-neutral-800 rounded"></div>
                        </div>
                    </div>
                    <div className="h-12 w-full bg-neutral-800 animate-pulse rounded-lg"></div>
                </div>
            </div>
        )
}