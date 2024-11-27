import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, X, Sparkles } from "lucide-react";
import SearchResultPage from "./SearchResultPage";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  useEffect(() => {
    if (query) setSearch(query);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearch("");
    navigate("/search");
  };

  return (
    <div className="min-h-full bg-gray-50 dark:bg-neutral-800 rounded-xl">
      <div className="container mx-auto px-4 py-8">
        {/* Search Container */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="mb-6 w-full relative ">
            <div className="flex items-center bg-white dark:bg-neutral-500 shadow-lg rounded-full p-2">
              {/* Search Input */}
              <div className="flex-grow relative">
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 
                    text-gray-800 dark:text-gray-200 
                    bg-transparent 
                    placeholder-gray-400 
                    focus:outline-none 
                    text-sm md:text-base"
                />

                {/* Clear Button */}
                {search ? (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 
                      text-gray-400 hover:text-gray-600 
                      dark:hover:text-gray-300 
                      transition-colors"
                  >
                    <X size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 
                      text-gray-400 hover:text-gray-600 
                      dark:hover:text-gray-300 
                      transition-colors"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Search Results Section */}
          {query && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Sparkles className="mr-2 text-blue-500" />
                  Results for: "{query}"
                </h2>
              </div>

              <SearchResultPage query={query} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
