import { addDoc, collection, collectionGroup, getDoc, getDocs, query, where } from "firebase/firestore";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from './AuthProvider';

export const DataContext = createContext()
export function useData(){
    
    return useContext( DataContext )
}
export const DataProvider = ( {children} ) =>{
    
    const [messages, setMessages] = useState( [] );
    const { currentUser } = useAuth()
    
    const getMessages = useCallback(
        async () => {
            const allMessages = collectionGroup(db, 'messages')
            const q = query(allMessages, where('receiver', '==', 'currentUser.email'));
            const querySnapshot = await getDocs(allMessages)
            let retrievedMessages = []
            querySnapshot.forEach((doc) => {
                retrievedMessages.push(doc.data())
            });
                setMessages(retrievedMessages)                
                return querySnapshot
        },
        [db]
    )

    const sendMessage = async ( formData ) =>{
        //get reference of current user's sent collection
        let collectionRef = await collection ( db, 'messages')
        //execute a function to add new doc based on form data
        const docRef = await addDoc( collectionRef, formData )
        //call setPosts to set it equal to current list of posts + new post
        let dataToAddToSent = { 
            id: docRef.id,
            ...docRef.data(),
            user:{
                id: currentUser.id,
                // ...userRef.data()
            }
        
         }
        setMessages( [ dataToAddToSent , ...messages ] )
    }

    useEffect(() => {
        getMessages()
    }, [getMessages])

    const context = {
        messages, sendMessage
    }
    return (
        <DataContext.Provider value = { context }>
                { children }
        </DataContext.Provider>
    )
}