import {SearchIcon, CalendarIcon, TableIcon, ChevronDownIcon} from '@heroicons/react/outline'
import {HomeIcon, ViewGridAddIcon, InboxIcon, ChatIcon, BellIcon} from '@heroicons/react/solid'
import { useStateValue } from '../redux/StateProvider'
import HeaderIcons from './HeaderIcons'
import { useNavigate } from 'react-router-dom'

function Header() {
    const { user } = useStateValue()
    const navigate = useNavigate()
    return (
            <header className='flex px-2 md:px-10 py-4 fixed top-0 w-full bg-white shadow-md z-50'>
                <div className="flex">
                    <img className="object-contain h-12" src="https://bit.ly/3nORy7J" alt="" />
                    <div className="bg-gray-100 flex items-center px-3 rounded-full mx-2">
                        <SearchIcon className="h-6 w-6 text-gray-500" />
                        <input className="px-3 hidden md:flex outline-none bg-transparent" placeholder="Search Facebook" type="text" />
                    </div>
                </div>
                <div className="hidden lg:flex items-center space-x-3 flex-grow justify-center">
                    {user && (
                        <>
                            <HomeIcon className="icons" />
                            <ViewGridAddIcon className="icons" />
                            <CalendarIcon className="icons" />
                            <InboxIcon className="icons" />
                        </>
                    )}
                </div>
                <div className="flex justify-end items-center flex-grow lg:flex-grow-0">
                    {
                        user ? <HeaderIcons img />
                             : <button onClick={() => navigate('/login')} className="font-semibold text-blue-500 mx-4" >Sign in</button>
                    }
                    <HeaderIcons Icon={TableIcon} />
                    {user && (
                        <>
                            <HeaderIcons Icon={ChatIcon} />
                            <HeaderIcons Icon={BellIcon} />
                            <HeaderIcons Icon={ChevronDownIcon} />
                        </>
                    )}
                </div>
            </header>
    )
}

export default Header
