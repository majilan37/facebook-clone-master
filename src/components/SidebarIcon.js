function SidebarIcon({Icon, text, imgSrc}) {
    return (
        <div className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer">
            {imgSrc && (
                <img className="h-9 w-9 object-contain rounded-full" src={imgSrc} alt="" />
            )}
            {Icon && (
                <Icon className='h-9 text-gray-600' />
            )}
            <p className='text-sm font-semibold'>{text}</p>
        </div>
    )
}

export default SidebarIcon
