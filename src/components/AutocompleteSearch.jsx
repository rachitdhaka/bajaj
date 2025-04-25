import { useState, useEffect, useRef } from 'react';

const AutocompleteSearch = ({ doctors, onSearch, searchTerm }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState(searchTerm || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  
  // Update input value when searchTerm prop changes
  useEffect(() => {
    setInputValue(searchTerm || '');
  }, [searchTerm]);

  // Close suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      // Get top 3 suggestions based on doctor name
      const matches = doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 3);
      
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      onSearch('');
    }
  };

  const handleSuggestionClick = (name) => {
    setInputValue(name);
    onSearch(name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            data-testid="autocomplete-input"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search doctors by name..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue.trim() && setSuggestions.length > 0 && setShowSuggestions(true)}
          />
          <button 
            type="submit"
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {showSuggestions && inputValue.trim() && (
        <ul className="absolute z-10 w-full bg-white mt-1 border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.length > 0 ? (
            suggestions.map((doctor) => (
              <li 
                key={doctor.id}
                data-testid="suggestion-item"
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(doctor.name)}
              >
                {doctor.name}
              </li>
            ))
          ) : (
            <li 
              className="p-3 text-gray-500 text-center"
              data-testid="no-results"
            >
              No doctors found matching your search
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;