
import React, { useState, createContext } from "react";
import { logIn, signup,updateUser,generateToken,validateToken,getUser } from "../api/movie-api";

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

  const authenticateWT = async (username, password,token) => {
   
    const result = await logIn(username, password);
   
    
  
    if (result.token ) {

      setToken(result.token)
      //setIsAuthenticated(true);
      setUserName(username);

      const user = await getUser(username)
      const secret = user.authToken;
      const valid = await validateToken(secret,token);

      if(valid.valid){
        setIsAuthenticated(true);
      }

    }
    else{
      return result.msg
    }
  };

  const register = async (username, password) => {
    const secret = await generateToken()
    console.log("Secretttt",secret)
    const result = await signup(username, password,secret.secret);
    console.log(result.msg);
    return result.msg
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }

  const updateEmail=async (username,newusername)=>{
    const result = await updateUser(username, newusername);
    console.log(result.msg);
    return result.msg
  };
  

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        authenticateWT,
        register,
        signout,
        updateEmail,
        userName
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
