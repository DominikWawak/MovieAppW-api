import React, { useState ,useEffect,useContext} from "react";
//import  { getFirestore, deleteDoc,collection,query, where, getDocs,limit,orderBy,doc,setDoc } from "firebase/firestore"
import { AuthContext} from './AuthContext'
import { getFavourites,addFavourite, deleteFavourite ,getWatchList,addToWatchlist} from "../api/movie-api";




export const MoviesContext = React.createContext(null);

//const db = getFirestore();


const MoviesContextProvider = (props) => {
  const context = useContext(AuthContext)
  const [favorites, setFavorites] = useState( [] )
  const [mustWatch, setMustWatch] = useState( [] )
  const currentUser = context.userName
  
 
  // Need to finish upcoming movies, error because umcpoming movies are not stored in the db
  //
  const addWatchlist =  async (movie) => {

    console.log(movie.id,currentUser)
    if(!favorites.includes(movie.id)){
     await addToWatchlist(currentUser,movie.id)
    setMustWatch([...mustWatch,movie.id])
    }
  };
  // We will use this function in a later section
  const removeFromWatchList = (movie) => {
    setMustWatch( mustWatch.filter(
      (mId) => mId !== movie.id
    ) )
  };


         useEffect(() => {
          const getFavs = async () => {
            const data = await getFavourites(currentUser)
            console.log("FAFAFA",data)
            const f = data.map((m) => m.id)
            console.log("ffffffffff",f)
            setFavorites(f)
          }
          const getMoviesToWatch = async () => {
            const data = await getWatchList(currentUser)
            console.log("WATCHLISTDATAAA",data)
            const f = data.map((m) => m.id)
            
            setMustWatch(f)
          }



          getMoviesToWatch()
          getFavs()
            
         }, [addToFavorites,currentUser])

  const addToFavorites = async (movie) => {
    
    console.log(movie)
    var id = movie.id

    // checking duplicates
    if(!favorites.includes(movie.id)){
    await addFavourite(currentUser,movie.id,movie.title)
    setFavorites([...favorites,movie.id])
    }

   
  };
  // We will use this function in a later section
  const removeFromFavorites = async (movie) => {
   
    await deleteFavourite(currentUser,movie.id)
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
    

  };

  return (
    <MoviesContext.Provider
  
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        mustWatch,
        addWatchlist,
        removeFromWatchList
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;