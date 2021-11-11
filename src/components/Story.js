function Story({avatar, username,}) {
    return (
        <div className="flex-grow w-full relative">
            <div className="w-max py-4 pb-3 overflow-auto block">
                <img 
                    className="hidden lg:inline-flex h-48 max-w-[100px] object-cover filter brightness-75 rounded-lg mr-2" 
                    src={avatar} 
                    alt={''} 
                />
                <img 
                    className="lg:absolute lg:top-6 lg:left-2 h-14 w-14 rounded-full object-cover object-center p-[1.5px] 
                        cursor-pointer border-2 border-blue-500" 
                    src={avatar} 
                    alt="" 
                />
                <p className=" hidden lg:block lg:absolute  bottom-3 text-white font-medium text-sm p-1 truncate" >{username}</p>
            </div>
        </div>
    )
}

export default Story
