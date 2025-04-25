import React from 'react'

const SortFilter = ({ sortBy, onChange }) => {
    return (
      <div>
        <h3 data-testid="filter-header-sort" className="font-semibold mb-2">Sort By</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="sort-fees"
              className="form-radio h-4 w-4 text-blue-600"
              checked={sortBy === 'fees'}
              onChange={() => onChange('fees')}
            />
            <span className="ml-2">Fees (Low to High)</span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              data-testid="sort-experience"
              className="form-radio h-4 w-4 text-blue-600"
              checked={sortBy === 'experience'}
              onChange={() => onChange('experience')}
            />
            <span className="ml-2">Experience (High to Low)</span>
          </label>
          
          {sortBy && (
            <button 
              className="text-sm text-blue-500 hover:underline mt-1"
              onClick={() => onChange('')}
            >
              Clear Selection
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default SortFilter;