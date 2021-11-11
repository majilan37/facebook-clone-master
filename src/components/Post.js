import {useState, useEffect} from 'react'
import { ChatAltIcon, DotsCircleHorizontalIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/outline"
import { ThumbUpIcon as ThumbUpIconFilled } from '@heroicons/react/solid'
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useStateValue } from "../redux/StateProvider"
import Moment from "react-moment"


function Post({post}) {
    const { user } = useStateValue()
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts', post.id, 'likes'), (snapshot) =>{
            setLikes(snapshot.docs)
        })

        return () => unsubscribe()
    }, [db])

    useEffect(() => {
        return setHasLiked(likes.findIndex(like => (like.id === user?.uid)) !== -1)
    }, [likes])

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts', post.id, 'comments'), (snapshot) =>{
            setComments(snapshot.docs)
        })

        return () => unsubscribe()
    }, [db])

    const setPostLikes = async () => {
        if(!hasLiked){
            await setDoc(doc(db, 'posts', post.id, 'likes', user?.uid ), {
                username: user.displayName,
            })
        } else {
            await deleteDoc(doc(db, 'posts', post.id, 'likes', user?.uid ))
        }
    }

    const addComment = async () => {
        if(!comment) return;

        await addDoc(collection(db, 'posts', post.id, 'comments',), {
            username: user.displayName,
            comment: comment,
            avatar: user.photoURL,
            timestamp: serverTimestamp()
        })

        setComment('')
    }
    console.log(comments)
    return (
        <div className='bg-white shadow-md rounded-lg  my-4'>
            <div className="flex items-center space-x-3 p-4">
                <img className="w-10 h-10 object-contain rounded-full" src={post.data().avatar} />
                <div className="flex items-center justify-between flex-grow">
                    <div className="flex flex-col">
                        <p>{post.data().name}</p>
                        <Moment className="text-xs text-gray-500" fromNow>
                            {post.data().timestamp?.toDate()}
                        </Moment>
                    </div>
                    {user && <DotsCircleHorizontalIcon className="h-7 text-gray-500 cursor-pointer" />}
                </div>
            </div>
            <p className="text-sm py-2 px-4">{post.data().title}</p>
            <img className='w-full' src={post.data().image} alt="" />
            <div>
                <div className='px-4 pt-3 border-b mx-4'>
                   <p className={`text-sm text-gray-600 font-semibold ${!user && 'pb-3'}`}> {likes.length} likes</p>
                </div>
                {user && (
                    <>
                        <div className='flex items-center justify-center p-4'>
                            {!hasLiked ? (
                                <div onClick={setPostLikes} className='post__actions'>
                                    <ThumbUpIcon className='h-6 text-gray-500 transform' />
                                    <p className='text-sm font-semibold'>Like</p>
                                </div>
                            ) : (
                                <div onClick={setPostLikes} className='post__actions'>
                                    <ThumbUpIconFilled className='h-6 text-blue-500 transform' />
                                    <p className='text-sm text-blue-500 font-semibold'>Like</p>
                                </div>
                            )}
                            <div onClick={() => setShowComments(e => !e)} className='post__actions'>
                                <ChatAltIcon className='h-6 text-gray-500' />
                                <p className='text-sm font-semibold'>Comment</p>
                            </div>
                            <div className='post__actions'>
                                <ShareIcon className='h-6 text-gray-500' />
                                <p className='text-sm font-semibold'>Share</p>
                            </div>
                        </div>
                        {showComments && (
                            <div>
                                <div className='flex items-center px-6 pb-3 space-x-2'>
                                    <input 
                                        value={comment} 
                                        onChange={(e) => setComment(e.target.value)} 
                                        type="text" 
                                        placeholder='Write a comment' 
                                        className='flex-grow outline-none border px-4 py-2 bg-gray-100 rounded-full' 
                                    />
                                    <button onClick={addComment} className='px-5 py-2 bg-gray-200 text-blue-500 font-semibold rounded-full' >post</button>
                                </div>
                                <div className='w-full space-y-2 px-4 py-4'>
                                    {comments.map((comment) => (
                                        <div className='relative flex space-x-2 '>
                                            <img className='w-8 h-8 object-contain rounded-full' src={comment.data().avatar} alt="" />
                                            <div className='p-4 bg-gray-200 rounded-xl space-y-3'>
                                                <p className='text-sm truncate font-semibold'>{comment.data().username}</p>
                                                <p>{comment.data().comment}</p>
                                            </div>
                                            <Moment className='mt-auto ml-auto text-sm text-gray-600' fromNow>
                                                {comment.data().timestamp?.toDate()}
                                            </Moment>
                                        </div>
                                    ) )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Post
