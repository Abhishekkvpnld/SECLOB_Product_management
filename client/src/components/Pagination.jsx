import { useState } from "react";
import PageItem from "./PageItem"


const Pagination = () => {


    const [currentPage, setCurrentPage] = useState(2);

    return (
        <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
                16 of 65 results
            </div>

            <div className="flex items-center space-x-2">
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    1
                </button>
                <button className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-medium">
                    2
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    3
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    4
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    5
                </button>
                <span className="text-gray-400">...</span>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    10
                </button>
            </div>

            <PageItem />

        </div>
    )
}

export default Pagination