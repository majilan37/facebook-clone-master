import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import {useState, useEffect} from 'react'
import { db } from '../firebase'
import Post from './Post'

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const querySnap = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(querySnap, (snap) => {
            setPosts(snap.docs)
        })

        return () =>  unsubscribe()
    }, [db])
    return (
        <div>
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}

export default Posts
