const Footer = () => {
    return (
        <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <p className="text-center sm:text-left text-sm sm:text-base">
                    &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-900 dark:text-white">SmartClaimAI</span>. All rights reserved.
                </p>
                <p className="text-center sm:text-right text-sm sm:text-base">
                    Version <span className="font-semibold text-gray-900 dark:text-white">1.0</span>
                </p>
            </div>
        </footer>
    )
}

export default Footer
