import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const useSearch = () => {
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();

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

  //   SEARCH RESULTS
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/search?query=${encodeURIComponent(query)}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("_user_accessToken_")}`,
            },
          }
        );

        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const filterResults = () => {
    if (!results) return { users: [], posts: [] };

    switch (activeTab) {
      case "users":
        return { users: results.users, posts: [] };
      case "posts":
        return { users: [], posts: results.posts };
      default:
        return results;
    }
  };

  const { users, posts } = filterResults();

  return {
    //  SEARCH FORM
    search,
    setSearch,
    query,
    handleSubmit,
    clearSearch,

    //   SEARCH RESULTS
    results,
    loading,
    error,
    activeTab,
    setActiveTab,
    users,
    posts,
  };
};

export default useSearch;
