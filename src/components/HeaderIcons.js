import { useStateValue } from "../redux/StateProvider"

function HeaderIcons({img, Icon}) {
    const {user, logOut, } = useStateValue()
    return (
        <div className="space-x-4">
            {img && (
                <div className="hidden md:flex items-center ">
                    <img onClick={logOut} className="w-10 h-10 mx-2 object-contain cursor-pointer rounded-full hidden md:inline-flex" src={user?.photoURL} alt="" />
                    <p className="truncate">{user?.displayName}</p>
                </div>
            )}
            {Icon && <Icon className="h-10 text-gray-900 cursor-pointer bg-gray-200 p-2 rounded-full mr-2 first:mx-2" />}
        </div>
    )
}

export default HeaderIcons
