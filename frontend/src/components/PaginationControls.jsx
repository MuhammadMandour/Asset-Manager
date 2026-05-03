import React from 'react';

const PaginationControls = ({ pagedData, onPageChange }) => {
  if (!pagedData || pagedData.totalPages <= 1) return null;

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{pagedData.page * pagedData.size + 1}</span> to{' '}
            <span className="font-medium">{Math.min((pagedData.page + 1) * pagedData.size, pagedData.totalElements)}</span> of{' '}
            <span className="font-medium">{pagedData.totalElements}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(pagedData.page - 1)}
              disabled={pagedData.page === 0}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(pagedData.page + 1)}
              disabled={pagedData.last}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
