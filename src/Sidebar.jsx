import React, { useEffect, useState } from "react";
import ConvList from "./ConvList";
import SidebarHeader from "./SidebarHeader";
import api from "./api/axios.js";
import UsersList from "./UsersList.jsx";

function Sidebar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [displayProp, setDisplayProp] = useState("");
  useEffect(() => {
    if (!query) {
      setResults([]);
      setDisplayProp("hidden");
      return;
    }
    const timer = setTimeout(async () => {
      const response = await api.get("/users/search", {
        params: { username: query },
      });
      setResults(response.data);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    Array.isArray(results) && results.length !== 0
      ? setDisplayProp("block")
      : setDisplayProp("hidden");
  }, [results]);
  return (
    <div className="bg-gray-800 pt-3 pl-2 pr-2 border-r border-r-gray-500 shadow-xl/30 absolute top-0 bottom-0 w-1/5 min-w-xs flex flex-col items-center">
      <SidebarHeader />
      <input
        type="text"
        className="w-9/10 mt-6 mb-6 bg-gray-300 px-3 py-1 rounded-4xl focus:outline-none"
        value={query}
        name="user_input"
        id="input"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search or start a new chat"
      />
      <UsersList display={displayProp} results={results} setQuery={setQuery} />
      <ConvList />
    </div>
  );
}

export default Sidebar;
