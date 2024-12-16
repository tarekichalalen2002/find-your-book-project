import React, { useEffect, useState } from 'react';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import AuthorCard from './AuthorCard';
import DeleteConfirm from './DeleteConfirmation';

const Pagination = ({ items, forBooks }) => {

  const itemsPerPage = forBooks ? 6 : 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null)

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Determine the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)

  // Function to handle page change
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    console.log('Current item', itemToDelete);  
  }, [itemToDelete])

  return (
    <div className=' w-full'>

    {forBooks ? (<section className=' border-[2px] border-gray-200 border-solid min-h-[375px] max-h-screen h-full'>
        <table className=' w-full '>
            <thead className=' w-full text-sm text-gray-600 font-semibold bg-gray-100'>
                <th className=' py-2'>NO.</th>
                <th className=' py-2'>ISBN</th>
                <th className=' py-2'>Book Title</th>
                <th className=' py-2'>Author Name (s)</th>
                <th className=' py-2'>Genre (s)</th>
                <th className=' py-2'>Edit or Delete</th>
            </thead>
            <tbody className=' w-full'>
                {currentItems.map((item, index) => (
                    <tr className=' w-full text-sm text-gray-600 font-normal' key={index}>
                        <td className=' text-center py-2'>{index + 1}</td>
                        <td className=' text-center py-2 text-base font-semibold'>{item.isbn}</td>
                        <td className=' text-center py-2'>{item.title}</td>
                        <td className=' text-center py-2'>{item?.author}</td>
                        <td className=' text-center py-2'>{item.genre}</td>
                        <td className=' text-center py-2'>
                            <button className=' bg-emerald-600 text-white px-2 py-1 rounded-lg mr-1.5'>Edit</button>
                            <button className=' bg-gray-600 text-white px-2 py-1 rounded-lg' onClick={() => {setOpen(true); setItemToDelete(item.ISBN)}}>Delete</button>
                        </td>
                    </tr>
                ))  }
            </tbody>
        </table>
        <DeleteConfirm 
          open={open}
          setOpen={setOpen}
          itemToDelete={itemToDelete}
        />
        {!currentItems.length && <div className=' flex items-center justify-center w-full min-h-[400px] h-full text-lg font-semibold text-gray-900'>No Book Found</div>}
    </section>
  )
    :
    (<section className=' w-full flex flex-col gap-4 min-h-[300px] max-h-screen h-full'>
        {currentItems.map((author, index) => (
            <AuthorCard key={index} author={author} setItemToDelete={setItemToDelete} setOpen={setOpen} />
        ))}
        <DeleteConfirm 
          open={open}
          setOpen={setOpen}
          itemToDelete={itemToDelete}
        />
        {!currentItems.length && <div className=' flex items-center justify-center w-full min-h-[400px] h-full text-lg font-semibold text-gray-900'>No author Found</div>}
    </section>
  )
    }

      {currentItems.length > 0 && <div className="flex justify-center items-center py-6 ">
        <button
            onClick={handlePrevious}
            disabled={currentPage === 1} 
            className={`p-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ' text-gray-800'}`}
            >
            <FaChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            className={`${currentPage === index + 1 ? 'active bg-emerald-600 px-3 py-1.5 rounded-full text-white' : ' text-gray-900' } mx-1.5 text-sm`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`p-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ' text-gray-800'}`}
        >
            <FaChevronRight />
        </button>
      </div>}
    </div>
  );
};

export default Pagination;