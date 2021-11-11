import {useEffect, useState} from 'react'
import faker from "faker";
import Story from './Story'
import {useStateValue} from '../redux/StateProvider'
import InputBox from './InputBox';

function Feed() {
    const { user } = useStateValue()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fakeUsers = [...Array(15)].map((_,i) => ({
            ...faker.helpers.contextualCard(),
            id: i
        }))
        setUsers(fakeUsers)

        return () => fakeUsers
    }, [])
    console.log(loading);
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex overflow-x-scroll space-x-2 scrollbar-thin scrollbar-thumb-black">
                {user && <Story key={user.id} username={user.displayName} avatar={user.photoURL} />}
                {users.map((user) => (
                    <Story key={user.id} username={user.username} avatar={user.avatar} />
                ))}
            </div>
            <InputBox />
        </div>
    )
}

export default Feed
