
import React, { useEffect, useState ,createContext,useContext}  from "react";
import ReactPaginate from "react-paginate";
import PageNumContext from "../../contexts/pageNumberContext";
import HomePage from "../../pages/HomePage.js"
import { getMovies } from "../../api/tmdb-api";
import { PinDropSharp } from "@material-ui/icons";
import TemplateMoviePage from "../templateMoviePage";

const Paginator= (props)=>{
  
  
  //const [pageCount, setPageCount] = useState(1); 
 
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [])

 

  // useEffect(() => {
  //   console.log("update",currentPage)
  // }
 // )
 //<HomePage pagenum={currentPage}></HomePage>

  return (
    <>
    <br></br>
   <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          
          pageCount={15}
          marginPagesDisplayed={4}
          onPageChange={props.clickFunction}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
         

				/>
   
   
   </>
   
  );
}


export default Paginator;
