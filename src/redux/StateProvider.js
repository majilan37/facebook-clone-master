import {createContext, useContext, useState, useEffect} from 'react'
import { FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const StateContext = createContext()


export default function StateProvider({children}) {
    const [user, setUser] = useState(null)
    const [userCredential, setUserCredential] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const provider = new FacebookAuthProvider();
    const handleSubmit = () => {
        signInWithPopup(auth, provider)
        .then((res) => {
            const credential = FacebookAuthProvider.credentialFromResult(res);
            setUserCredential(credential)
            setLoading(true)
        }).then(() => navigate('/'))
        .catch(err => console.log(err.message))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setLoading(false)
            } 
            else setUser(null)
        })
        return () => unsubscribe
    }, [])

    const logOut = () => {
        signOut(auth).then(() => {
            navigate('/login')
          }).catch((error) => {
            console.log(error.message)
          });
    }

    const values = {
        handleSubmit,
        logOut,
        user,
        userCredential,
    }
    return (
        <StateContext.Provider value={values} >
            {!loading && children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)

 
