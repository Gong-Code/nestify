"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/user";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase.config";
import { createUser, getUserById } from "../lib/user.db";

type AuthValues = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

type AuthContextType = {
  user: User | null;
  authLoaded: boolean;
  register: (values: AuthValues) => Promise<string | void>;
  login: (values: AuthValues) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data() as User;
        setUser(userData);
      } else {
        setUser(null);
      }
      setAuthLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  const register = async (values: AuthValues): Promise<string | void> => {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

      if (!userCredential.user) return "Failed to register user";

      await updateProfile(userCredential.user, {
        displayName: `${values.firstName} ${values.lastName}`,
      });

      await createUser({
        id: userCredential.user.uid,
        email: values.email,
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        password: values.password,
      });

      setUser({
        id: userCredential.user.uid,
        email: userCredential.user.email || "",
        firstName: values.firstName || "",
        lastName: values.lastName || "",
        password: values.password,
      });

      console.log("Account created successfully", { userCredential });

      return userCredential.user.uid;
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const login = async (values: AuthValues): Promise<boolean> => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (!userCredential.user) {
        throw new Error("Failed to log in user");
      }

      console.log(userCredential);
      const token = await userCredential.user.getIdToken();
      console.log("Token:", token);

      console.log("User logged in successfully", {
        id: userCredential.user.uid,
      });

      const userData = await getUserById(userCredential.user.uid);
      if (!userData) throw new Error("User not found");

      setUser(userData);
      console.log("logged in user data:", userData);
      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  const value = {
    user,
    authLoaded,
    register,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};
