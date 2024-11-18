
const Pagination = () => {
    return (
        <>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button className="text-playden-primary">Previous</button>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
                        <button key={page} className={`px-2 py-1 rounded ${page === 1 ? 'bg-playden-primary text-white' : 'bg-gray-100 text-black'}`}>
                            {page}
                        </button>
                    ))}
                </div>
                <button className="text-playden-primary">Next</button>
            </div></>
    )
}

export default Pagination;