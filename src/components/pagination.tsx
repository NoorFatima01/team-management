export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center'>
      <ul className='flex border border-slate-300'>
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`w-10 h-10 flex justify-center items-center ${
              pageNumber === page ? 'bg-blue-600 text-white' : 'text-blue-600'
            }`}
          >
            <button onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
