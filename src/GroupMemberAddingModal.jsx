import React, { useState, useEffect } from "react";
import api from "./api/axios";
import { useConversation } from "./context/ConversationContext.jsx";
import { useGroupModal } from "./context/GroupModalContext.jsx";

function GroupMemberAddingModal() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const { conversation, triggerRefresh } = useConversation();
  const [existingMembers, setExistingMembers] = useState([]);
  const { setRenderAddMember, setDisplayGroupMenuModal } = useGroupModal();

  const deleteUser = (id) => {
    const newList = membersList.filter((u) => {
      return u._id !== id;
    });
    setMembersList(newList);
  };

  const handleSubmit = async () => {
    try {
      const responseArray = Promise.all(
        membersList.map(async (member) => {
          const response = api.post("/conversation/addMember", {
            memberId: member._id,
            convId: conversation._id,
          });
        }),
      );
      setRenderAddMember(false);
      setDisplayGroupMenuModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await api.get("/conversation/convMembers", {
        params: { convId: conversation._id },
      });
      setExistingMembers(response.data.map((m) => m._userId));
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    if (membersList.length === 10) return;
    const timer = setTimeout(async () => {
      const response = await api.get("/users/search", {
        params: { username: query },
      });
      setResults(response.data);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <h1 className="mt-7 text-3xl font-bold mb-5">Add a member</h1>
      <form className="flex flex-col">
        <label htmlFor="member-selection">
          Add a member
          <input
            type="text"
            id="member-selection"
            value={query}
            className="block bg-gray-200 px-3 py-2 rounded-4xl mt-3 w-full focus:outline-none"
            placeholder="Search for a member..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div>
          <p className="mb-3 flex justify-between pr-5 mt-5">
            <span>
              Added members{" "}
              <span className="text-black/50">
                {"(Click on a member to delete them)"}
              </span>
            </span>
            <span
              className={`${membersList.length === 10 - existingMembers.length ? "text-red-600" : "text-gray-500"} ml-5`}
            >
              {membersList.length}/{10 - existingMembers.length}
            </span>
          </p>
          <div className="w-full min-h-8 bg-gray-200 rounded-xl px-3 py-1">
            {membersList.map((user, index) => {
              return index !== membersList.length - 1 ? (
                <p
                  className="inline"
                  key={index}
                  onClick={() => deleteUser(user._id)}
                >
                  <span className="cursor-pointer hover:bg-gray-300">
                    {user.username}
                  </span>
                  ,
                </p>
              ) : (
                <p
                  className="inline "
                  key={index}
                  onClick={() => deleteUser(user._id)}
                >
                  <span className="cursor-pointer hover:bg-gray-300">
                    {user.username}
                  </span>
                  .
                </p>
              );
            })}
          </div>
          <ul
            className={`absolute top-45 left-30 bg-gray-100 min-w-sm px-2 py-1 pt-2 z-10 rounded-md border ${results.length !== 0 && membersList.length < 10 - existingMembers.length ? "block" : "hidden"}`}
          >
            {results.map((user, index) => {
              const isAlreadyMember = existingMembers.includes(user._id);
              return (
                <React.Fragment key={user._id}>
                  <li
                    key={user._id}
                    id={user._id}
                    className={`flex items-center mx-auto text-lg cursor-pointer py-1 px-2 font-bold rounded-sm hover:bg-gray-300 mb-1 mt-1 ${isAlreadyMember ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
                    onClick={() => {
                      if (isAlreadyMember) return;
                      if (membersList.some((u) => u._id === user._id)) {
                        setQuery("");
                        return;
                      }
                      setMembersList([
                        ...membersList,
                        { _id: user._id, username: user.username },
                      ]);
                      setQuery("");
                    }}
                  >
                    <img
                      src={user.avatar}
                      className="w-12 h-12 rounded-full mr-6"
                      alt=""
                    />
                    {user.username}
                    {isAlreadyMember && (
                      <span className="text-xs text-gray-400 ml-2">
                        Already in group
                      </span>
                    )}
                  </li>
                  {index !== results.length - 1 ? (
                    <div className="w-full h-px bg-black"></div>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <button
          type="button"
          className="bg-green-500 text-white cursor-pointer mx-auto px-4 py-2 rounded-lg mt-6"
          onClick={handleSubmit}
        >
          Add members to group
        </button>
      </form>
    </>
  );
}

export default GroupMemberAddingModal;
