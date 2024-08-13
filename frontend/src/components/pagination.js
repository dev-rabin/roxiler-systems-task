import React from 'react'

const Pagination = ({ page, onPageChange, totalPages }) => {
    return (
        <>
           <div className=' text-center my-10'>
           <button onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className=' bg-blue-600 p-2 rounded-md text-white '
            >
                Prev
            </button>
            <span>{page} of {totalPages}</span>
            <button onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className=' bg-blue-600 p-2 rounded-md text-white '
            >
                Next
            </button>
           </div>
        </>
    )
}

export default Pagination;