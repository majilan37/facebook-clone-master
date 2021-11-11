import {useState, useEffect} from 'react';
import { DotsCircleHorizontalIcon } from "@heroicons/react/outline"
import { SearchIcon, VideoCameraIcon } from "@heroicons/react/solid"
import faker from 'faker';

function Contacts() {
    const [fakeUsers, setFakeUsers] = useState([])
    useEffect(() => {
        const users = [...new Array(16)].map((_,i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }))

        setFakeUsers(users)
    }, [])
    return (
        <div className="hidden xl:block ">
            <div className="fixed border-l pl-2 right-0 top-24">
                <div className="flex items-center justify-between w-72">
                    <p>Contacts</p>
                    <div className='flex space-x-2 items-center'>
                        <VideoCameraIcon className='h-6 text-gray-500' />
                        <SearchIcon className="h-6 w-6 text-gray-500" />
                        <DotsCircleHorizontalIcon className="h-6 text-gray-500 cursor-pointer" />
                    </div>
                </div>
                <div className="space-y-2 max-h-full overflow-y-auto py-3">
                    {fakeUsers?.map(user => (
                        <div className="flex items-center space-x-2 hover:bg-gray-200 cursor-pointer py-1" key={user.id} >
                            <img className="h-8 w-8 object-contain rounded-full" src={user.avatar} alt="" />
                            <p>{user.username}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Contacts
