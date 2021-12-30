// import React , {useContext,useState, useEffect}from 'react'
// import app from "../firebase"
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,sendPasswordResetEmail} from "firebase/auth";
// //import { getAuth, createUserWithEmailAndPassword } from "firebase/compat/auth";
// import firebase from 'firebase/compat';
// import { Link, useHistory} from 'react-router-dom'


// const AuthContext = React.createContext();
// const auth=getAuth()
// export function useAuth(){
//     return useContext(AuthContext);
// }



// export function AuthProvider({children}) {
//     const [currentUser,setCurrentUser] = useState("")
//     const [loading,setLoading] = useState(false)
//     const history=useHistory()

//     const usr = "hello";

//     function signUp(email,password){
//         createUserWithEmailAndPassword(auth,email,password) .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             // ...
//           })
//           .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorMessage)
//             // ..
//           });
//     }

//     function logIn(email,password){

//         // If i want to use another database I can just chnge the code in these functions
//          signInWithEmailAndPassword(auth,email,password) .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             // ...
//           })
//           .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorMessage)
//             // ..
//           });
//     }


//     function reserPassword(email){
//         sendPasswordResetEmail(auth,email);
//     }

//     function logOut(){
//         return auth.signOut()
//     }

//     useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth,user => {
      
//         setCurrentUser(user)
//         setLoading(false)
//         if(user){
//             history.push("/Dashboard")
//         }
//         else{
//             console.log("not logged in")
//         }
        
//     })

//     return unsubscribe()
// },[])

//     const value = {
//         currentUser,
        
//         signUp,
//         logIn,
//         logOut,
//         reserPassword,
//     }
//     return (
//         <AuthContext.Provider value = {value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     )
// }

// import React , {useContext,useState, useEffect}from 'react'
// import { logIn, signup } from "../api/movie-api";

// const AuthContext = React.createContext();

// export function useAuth(){
//     return useContext(AuthContext);
// }
// export function AuthProvider  ({children})  {
//   const existingToken = localStorage.getItem("token");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authToken, setAuthToken] = useState(existingToken);
//   const [currentUser,setCurrentUser] = useState("")

//   //Function to put JWT token in local storage.
//   const setToken = (data) => {
//     localStorage.setItem("token", data);
//     setAuthToken(data);
//   }

//   const login = async (username, password) => {
//     const result = await logIn(username, password);
//     if (result.token) {
//       setToken(result.token)
//       setIsAuthenticated(true);
//       setCurrentUser(username);
//     }
//   };

//   const signUp = async (username, password) => {
//     const result = await signup(username, password);
//     console.log(result.code);
//     return (result.code == 201) ? true : false;
//   };

//   const logOut = () => {
//     setTimeout(() => setIsAuthenticated(false), 100);
//   }


//   const value={
//     isAuthenticated,
//     login,
//     signUp,
//     logOut,
//     currentUser
//   }
//   return (
//     <AuthContext.Provider value = {value}>
//         {/* {!loading && children} */}
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { useState, createContext } from "react";
import { logIn, signup } from "../api/movie-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (username, password) => {
    const result = await logIn(username, password);
    
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setUserName(username);
    }
    else{
      return result.msg
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.msg);
    return result.msg
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
