export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">🌍</span>
                        </div>
                        <span className="font-semibold text-gray-700">Global Fame Monitor</span>
                    </div>

                    {/* Info */}
                    <div className="text-center sm:text-left">
                        <p className="text-sm text-gray-500">
                            Community voting platform • All votes are exclusive to this site
                        </p>
                    </div>

                    {/* Year */}
                    <div className="text-sm text-gray-400">
                        © 2026 GFM
                    </div>
                </div>
            </div>
        </footer>
    );
}
