import { db } from "@/firebase.config";
import { User } from '@/app/types/user';
import bcrypt from 'bcryptjs';
import { doc, getDoc, setDoc } from "firebase/firestore";

export const createUser = async (user: User) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const userData = {
            ...user,
            password: hashedPassword
        }

        await setDoc(doc(db, 'users', user.id), userData);
        console.log('User created successfully', userData);
    } catch (error) {
        console.error('Error creating user', error);
        throw new Error('Failed to create user');
    }
}

export const getUserById = async (userId: string): Promise<User | null> => {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            return userDoc.data() as User;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
    }
};