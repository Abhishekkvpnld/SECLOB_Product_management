import PageItem from "./PageItem"


const Pagination = ({ setCurrentPage, totalPages, currentPage }) => {

      const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
                12 of 24 results
            </div>

            <div className="flex items-center space-x-2">
                {pages?.map((page, index) =>
                    page === currentPage ? (
                        <button
                            key={index}
                            className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-medium"
                            onClick={() => handleClick(page)}
                        >
                            {page}
                        </button>
                    ) : page === "..." ? (
                        <span key={index} className="text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={index}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                            onClick={() => handleClick(page)}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <PageItem />

        </div>
    )
}

export default Pagination