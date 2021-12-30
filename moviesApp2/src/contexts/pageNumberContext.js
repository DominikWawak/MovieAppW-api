import { createContext, useState } from "react";

const PageNumContext = createContext();

export const PageNumProvider = ({children}) => {
    const [pageNum,setPageNum] = useState(0);

    return (
        <PageNumProvider
        value={{
            pageNum,
            setPageNum
        }}
        >
            {children}
        </PageNumProvider>
    )
}

export default PageNumContext;