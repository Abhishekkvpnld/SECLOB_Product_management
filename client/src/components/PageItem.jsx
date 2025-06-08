


const PageItem = () => {
    return (
        <div className="hidden md:flex  items-center space-x-1 text-sm text-gray-600">
            <span>Show</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>30</option>
                <option>50</option>
                <option>100</option>
            </select>
            <span>rows</span>
        </div>
    )
}

export default PageItem