import { Button } from '@/components/ui/button';

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
      {pageNumbers.map((pageNumber) => (
        <Button
          variant='ghost'
          onClick={() => onPageChange(pageNumber)}
          key={pageNumber}
          className={` ${
            pageNumber === page ? 'bg-green-600 text-white' : 'text-green-600'
          }`}
        >
          {pageNumber}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
