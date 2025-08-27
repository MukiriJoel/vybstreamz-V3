import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const SearchDropdown = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Sample search data
  const searchData = [
    'Awinja Comedy',
    'Awinja Comedy 2025',
    "Awinja's Wedding", 
    'Awinja',
    'Awinja Movies',
    'Awinja Best Moments',
    'Awinja Stand Up',
    'Awinja Live Show'
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchData.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered as any);
      setIsDropdownOpen(true);
    } else {
      setFilteredResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e:any) => {
    e.preventDefault();
    console.log('Search submitted:', searchQuery);
    setIsDropdownOpen(false);
  };

  const handleSuggestionClick = (suggestion:any) => {
    setSearchQuery(suggestion);
    setIsDropdownOpen(false);
    console.log('Selected:', suggestion);
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() && filteredResults.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  return (
    <div className="relative w-full max-w-2xl" ref={dropdownRef}>
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="Search for a help topic"
            className="w-full h-14 pl-6 pr-14 text-gray-700 placeholder-gray-500 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-400 transition-colors duration-200 text-lg"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {isDropdownOpen && filteredResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50">
          <div className="max-h-80 overflow-y-auto">
            {filteredResults.map((result, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(result)}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
              >
                <span className="text-gray-700 text-lg">{result}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;