import React from 'react'
import {
    Menu,
    Home,
    Map,
    Settings,
    HelpCircle
} from 'lucide-react'

const LeftBar = () => {
    return (
        <div className="fixed inset-y-0 left-0 z-[1000] w-16 flex flex-col items-center bg-white border-r border-gray-200 py-4">
            <div className="mb-8">
                <button className="p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex flex-col gap-4 w-full items-center">

                <button className="p-3 rounded-full transition-colors bg-blue-100 text-blue-700">
                    <Home className="w-6 h-6" />
                </button>

                <button className="p-3 rounded-full transition-colors text-gray-600 hover:bg-gray-100">
                    <Map className="w-6 h-6" />
                </button>
            </nav>

            <div className="mt-auto flex flex-col gap-4 w-full items-center">
                <button className="p-3 rounded-full transition-colors text-gray-600 hover:bg-gray-100">
                    <HelpCircle className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}

export default LeftBar