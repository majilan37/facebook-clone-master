import {useRef, useState} from 'react'
import { useStateValue } from "../redux/StateProvider"
import { VideoCameraIcon } from '@heroicons/react/solid'
import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline'
import { db, storage } from '../firebase'
import {addDoc, collection, serverTimestamp, updateDoc, doc} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import Posts from './Posts'

function InputBox() {
    const { user } = useStateValue()
    const [imgPost, setImgPost] = useState(null)
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const inputFileRef = useRef()

    const fileReader = (e) =>{
        const reader = new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (event) => {
            setImgPost(event.target.result)
        }
    }
    
    const addImgToPost = async (e) => {
        e.preventDefault();
        if (!value) return; 
        setLoading(true)
        const docRef = await addDoc(collection(db,'posts' ), {
            name: user.displayName,
            avatar: user.photoURL,
            email: user.email,
            title: value,
            timestamp: serverTimestamp(),
        })
        console.log('doc added to db', docRef);

        if(!imgPost) return;
        const imgRef = ref(storage, `posts/${docRef.id}/image`)
        await uploadString(imgRef, imgPost, 'data_url')
                .then( async () => {
                    const downloadUrl = await getDownloadURL(imgRef)
                    await updateDoc(doc(db, 'posts', docRef.id),{
                        image: downloadUrl
                    })
                })

        setValue('')
        setImgPost(null)
        setLoading(false)
    }
    return (
        <>
            {user && (
                <div className="px-3 py-4 bg-white my-3 rounded-md shadow-md">
                    <form onSubmit={addImgToPost} className="border-b flex flex-col items-center pb-3">
                        <div className="flex items-center space-x-2 w-full pb-3 flex-grow">
                            <img src={user?.photoURL} className="w-10 h-10 object-contain rounded-full" alt="" />
                            <input value={value} onChange={(e) => setValue(e.target.value)} className="flex-grow bg-gray-100 px-4 py-2 rounded-full outline-none" placeholder={`What's on your mind, ${user?.displayName} ?`} type="text" />
                            {imgPost && (
                                <div className="flex flex-col justify-center">
                                    <img className="h-10 object-contain" src={imgPost} alt="" />
                                    <p onClick={() => setImgPost(null)} className="text-sm cursor-pointer text-red-500 font-semibold" >Remove</p>
                                </div>
                            )}
                        </div>
                        {value && <button type='submit' disabled={loading} className={`bg-blue-400 px-4 py-2 rounded-md text-white hover:bg-blue-500 active:bg-blue-600 ${loading && '!bg-gray-400 !text-gray-200 cursor-not-allowed'}`}>upload Task</button>}
                    </form>
                    <div className="flex justify-between pt-4 px-2">
                        <div className="flex flex-col cursor-pointer">
                            <VideoCameraIcon className='h-7 text-red-500' />
                            <p className="text-sm font-semibold">Live Video</p>
                        </div>
                        <div onClick={() => inputFileRef.current.click()} className="flex flex-col cursor-pointer">
                            <PhotographIcon className='h-7 text-green-500' />
                            <p className="text-sm font-semibold">Photo/video</p>
                            <input hidden type="file" onChange={fileReader} ref={inputFileRef} />
                        </div>
                        <div className="flex flex-col cursor-pointer">
                            <EmojiHappyIcon className='h-7 text-yellow-300' />
                            <p className="text-sm font-semibold">Feeling/activity</p>
                        </div>
                    </div>
                </div>
            )}
            <Posts />
        </>
    )
}

export default InputBox
