import { CalendarIcon, ChevronDownIcon, RefreshIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/outline"
import { BookmarkIcon, DesktopComputerIcon, FlagIcon, UsersIcon } from "@heroicons/react/solid"
import { useStateValue } from "../redux/StateProvider"
import SidebarIcon from "./SidebarIcon"



function Sidebar() {
    const { user } = useStateValue()
    return (
        <div className="hidden lg:block w-72 ">
            <div className="fixed left-0 h-screen px-4 py-6">
                <SidebarIcon imgSrc={user?.photoURL} text={user?.displayName} />
                <SidebarIcon Icon={UsersIcon} text='Friends' />
                <SidebarIcon Icon={UserGroupIcon} text='Groups' />
                <SidebarIcon Icon={ShoppingBagIcon} text='MarketPlace' />
                <SidebarIcon Icon={DesktopComputerIcon} text='Watch' />
                <SidebarIcon Icon={RefreshIcon} text='Memories' />
                <SidebarIcon Icon={BookmarkIcon} text='Saved' />
                <SidebarIcon Icon={FlagIcon} text='Pages' />
                <SidebarIcon Icon={CalendarIcon} text='Events' />
                <SidebarIcon Icon={ChevronDownIcon} text='See more' />
            </div>
        </div>
    )
}

export default Sidebar
