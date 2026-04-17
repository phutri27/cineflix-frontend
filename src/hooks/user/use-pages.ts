import { useState } from "react";

export const useGetPages = () => {
    const [page, setPage] = useState<number>(1)
    const [pageGroup, setPageGroup] = useState<number>(0)

    const handleChoosePage = (page: number) => {
        setPage(page)
    }
    
    const incrementPageGroup = () => {
        setPageGroup((prev) => prev + 1)
    }

    const decrementPageGroup = () => {
        setPageGroup((prev) => prev - 1)
    }

    return {
        page,
        pageGroup, 
        handleChoosePage,
        incrementPageGroup,
        decrementPageGroup
    }
}