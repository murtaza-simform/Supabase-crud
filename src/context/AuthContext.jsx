/* eslint-disable react/prop-types */
// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    async function getSessionData(){
      const session = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null);
        }
      );
    }

    getSessionData()
    

    // return () => {
    //   authListener.subscription.unsubscribe();
    // };
  }, []);

  const value = {
    user,
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
