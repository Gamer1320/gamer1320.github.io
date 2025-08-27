import React from 'react'
import { Wrench, Clock } from 'lucide-react'

export default function Maintenance() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white rounded-lg shadow-xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#870044] rounded-full mb-6">
                        <Wrench className="w-8 h-8 text-white" />
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Site Shut Down
                    </h1>                 
                </div>
            </div>
        </div>
    )
}