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
        </div>
    )
}

export default LeftBar