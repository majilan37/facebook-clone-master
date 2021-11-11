import { useStateValue } from "../redux/StateProvider"
import Contacts from "./Contacts"
import Feed from "./Feed"
import Header from "./Header"
import Sidebar from "./Sidebar"

function Home() {
    const {user} = useStateValue()
    return (
        <div>
            <Header />
            <div className="relative pt-20">
                {user && <Sidebar />}
                <Feed />
                {user && <Contacts />}
            </div>
        </div>
    )
}

export default Home
