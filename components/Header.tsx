const Header = () => {
    return (
        <header className="w-full bg-black shadow-lg mb-4 border-b-3 border-green-800 capitalize">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    <span className="text-green-600 uppercase">Wound</span> Checklist Assistant <span className="text-green-600">AI</span>
                </h1>
                <div className="text-lg sm:text-base text-white font-bold">
                    Welcome, <span className="font-semibold text-white">Greg Rue</span>
                </div>
            </div>
        </header>
    )
}

export default Header
