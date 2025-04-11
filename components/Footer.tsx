const Footer = () => {
    return (
        <footer className="w-full bg-black text-white border-t-2 border-green-800 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                <p className="text-center sm:text-left text-sm sm:text-base">
                    &copy; {new Date().getFullYear()} <span className="font-semibold">WoundCareAI</span>. All rights reserved.
                </p>
                <p className="text-center sm:text-right text-sm sm:text-base">
                    Version <span className="font-semibold">1.0</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer
