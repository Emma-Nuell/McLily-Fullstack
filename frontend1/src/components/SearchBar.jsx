import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// import { useSearchSuggestions } from "../hooks/productHooks";
import { Search } from "lucide-react";
import { useSearchSuggestions } from "../hooks/storeHooks";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  };

  const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { data, isLoading, isError } = useSearchSuggestions(
    debouncedSearchTerm,
    isSuggestionsOpen
  );

  // Close suggestions when clicking outside
  useOnClickOutside(searchRef, () => setIsSuggestionsOpen(false));

  const suggestions = data?.suggestions || [];

  const handleSearch = (query = searchTerm) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchTerm("");
      setIsSuggestionsOpen(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsSuggestionsOpen(true);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSearch(suggestions[selectedIndex].name);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Escape") {
      setIsSuggestionsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion.name);
  };

  const popularSearches = [
    "Running Shoes",
    "Summer Dresses",
    "Men's Watches",
    "Women's Bags",
    "Kids Toys",
  ];

  return (
    <div>
      <div className="flex justify-center items-center" ref={searchRef}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="w-full flex-grow relative"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsSuggestionsOpen(true)}
            className="w-full py-2.5 px-7.5 pr-16 rounded-full border-2 border-text outline-none text-text-secondary font-normal"
            placeholder="Search for products, brands, or categories..."
          />
          <button
            type="submit"
            className="flex items-center justify-center absolute right-5.5 top-1/2 -translate-y-1/2 cursor-pointer border-none text-xl p-3 w-22 h-16  rounded-xl bg-primary-400 dark:bg-primary-200 text-text"
          >
            <Search size={16} />
          </button>
        </form>
        {/* Search Suggestions Dropdown */}
        {isSuggestionsOpen && (
          <div className="absolute top-full left-0 right-0 bg-background-white border border-primary-300 dark:border-primary-100 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto scrollbar-hidden text-gray-800 dark:text-gray-300">
            {/* Loading State */}
            {isLoading && (
              <div className="p-4 text-center text-gray-600 dark:text-gray-400">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-300 mx-auto"></div>
                <p className="mt-2">Searching...</p>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="p-4 text-center text-red-600 dark:text-red-400">
                <p>Failed to load suggestions</p>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && !isError && (
              <>
                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="border-b border-primary-300 dark:border-primary-100">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={suggestion.productId}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 ${
                          selectedIndex === index
                            ? "bg-blue-50 dark:bg-blue-600/30"
                            : ""
                        }`}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <img
                          src={suggestion.image}
                          alt={suggestion.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {suggestion.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                            {suggestion.brand} • {suggestion.category}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Popular Searches */}
                {suggestions.length === 0 && searchTerm.length >= 2 && (
                  <div className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      No results found for &quot;{searchTerm}&quot;
                    </p>
                    <p className="text-sm font-medium mb-2">
                      Try these popular searches:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="px-3 py-1 bg-primary-500 dark:bg-primary-300 hover:bg-primary-600 dark:hover:bg-primary-200 text-white rounded-full text-sm"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Initial State - Popular Searches */}
                {suggestions.length === 0 && searchTerm.length < 2 && (
                  <div className="p-4 ">
                    <p className="text-sm font-medium mb-2">
                      Popular Searches:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="px-3 py-1 bg-primary-500 dark:bg-primary-300 hover:bg-primary-600 dark:hover:bg-primary-200 text-white rounded-full text-sm "
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* View All Results */}
                {suggestions.length > 0 && (
                  <div className="p-3 bg-gray-50 dark:bg-surface border-t border-primary-300 dark:border-primary-100">
                    <button
                      onClick={() => handleSearch()}
                      className="w-full text-center text-primary-600 dark:text-primary-300 hover:text-primary-500 dark:hover:text-primary-200 font-medium text-sm"
                    >
                      View all results for &quot;{searchTerm}&quot;
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
