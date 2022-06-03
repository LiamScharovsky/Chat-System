import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


export const AuthContext = createContext()

export function useAuth() {
    return useContext( AuthContext )
}

export const AuthProvider = ( { children } ) => {
    const [currentUser, setCurrentUser] = useState({ loggedIn: false })

    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const register = (formData) => {
        const { password, confirmPassword, email, username } = formData;

        if (password === confirmPassword) {
            // console.log( formData );
            createUserWithEmailAndPassword(auth, email, password, username)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const userRef = doc(db, 'users', user.uid);
                    setDoc(userRef, {
                        email: email,
                        username: username,
                    },
                        { merge: true }
                    );

                    console.log('User registered successfully');
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(error);
                    // ..
                });
        }
    };

    const signIn = (formData, providerOption) => {
        const { email, password } = formData;

        switch (providerOption) {
            case 'google':
                signInWithPopup(auth, provider)
                    .then(result => {
                        console.log('User logged in successfully');
                        const userRef = doc(db, 'users', result.user.uid);
                        setDoc(userRef, {
                            username: result.user.displayName,

                        }, { merge: true });
                    });
                break;
            case 'password':
                signInWithEmailAndPassword(auth, email.value, password.value)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log('User logged in successfully');
                        // ...
                    })
                    .catch((error) => {
                        // const errorCode = error.code;
                        // const errorMessage = error.message;
                        console.error(error);
                    });
                break;
            default:
                break;
        }
    };

    const signOff = () => {
        signOut(auth)
            .then(() => {
                setCurrentUser({ loggedIn: false });
                console.log('User logged out successfully');
            });
    };

    useEffect(() =>{
        onAuthStateChanged( auth, user => {
            if ( user ){

            //once user logs in, add them to the database as a reference
            //query the user's collection to find the user
                const userRef = doc(db, 'users', user.uid);
            //if user doesn't exist, add user to database
            //if user exists, override the user's info
                ( async () => {
                    let userData = await getDoc( userRef )
                    const retrievedUser = userData.data();
                    setCurrentUser({
                        id: userData.id,
                        email: retrievedUser.email,
                        loggedIn: true
                    });
                })()
            }
        } )
        //make useEffect render whenever you want to 
        //render once = [ ]
        //render everytime the component updates = ''
        //render whenever data changes  = [ data ]
    }, [ auth ])

    const context = {
        currentUser, signIn, signOff, register
    }
    return (
        <AuthContext.Provider value={ context }>
            { children }
        </AuthContext.Provider>         
    )
}

