import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useGroupModal } from "./context/GroupModalContext.jsx";
import { useConversation } from "./context/ConversationContext.jsx";
import api from "./api/axios.js";

function GroupCreationModal() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [membersList, setMembersList] = useState([]);
  const { triggerRefresh } = useConversation();
  const defaultGroupPicture =
    "https://res.cloudinary.com/dgkwexcoc/image/upload/v1781018793/user_txrwu9.png";
  const [previewPic, setPreviewPic] = useState(defaultGroupPicture);
  const [groupPic, setGroupPic] = useState(null);
  const { displayGroupModal, setDisplayGroupModal } = useGroupModal();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupPic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "quickchat");
    formData.append("folder", "quickchat-group-images");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgkwexcoc/image/upload",
      { method: "POST", body: formData },
    );
    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async () => {
    if (groupName === "" || membersList.length === 0) return;
    const imgUrl = groupPic
      ? await uploadToCloudinary(groupPic)
      : defaultGroupPicture;
    const response = await api.post("/conversation/createConversation", {
      type: "group",
      userIds: membersList,
      name: groupName,
      avatar: imgUrl,
    });
    setDisplayGroupModal(false);
    setGroupName("");
    setGroupPic(null);
    setMembersList([]);
    setPreviewPic(defaultGroupPicture);
    triggerRefresh();
  };

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

  const deleteUser = (id) => {
    const newList = membersList.filter((u) => {
      return u._id !== id;
    });
    setMembersList(newList);
  };

  return (
    <div
      className={`bg-black/60 w-full h-full z-50 flex justify-center items-center ${displayGroupModal ? "block" : "hidden"}`}
    >
      <div
        className={`w-3/5 pb-7 bg-white rounded-2xl relative flex flex-col items-center`}
      >
        <FontAwesomeIcon
          className="absolute top-5 right-5 text-red-600 cursor-pointer text-lg"
          icon={faXmark}
          onClick={() => {
            setDisplayGroupModal(false);
            setGroupName("");
            setGroupPic(null);
            setMembersList([]);
            setPreviewPic(defaultGroupPicture);
          }}
        />
        <h1 className="mt-7 text-3xl font-bold">Create a new group</h1>
        <form className="w-4/5 mt-8 h-full flex flex-col">
          <label htmlFor="group-name-input" className="mb-5">
            Group name
            <input
              type="text"
              id="group-name-input"
              placeholder="Enter the group's name..."
              value={groupName}
              className="block bg-gray-200 px-3 py-2 rounded-4xl mt-3 w-full focus:outline-none"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </label>
          <label htmlFor="member-selection" className="mb-5">
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
            <p className="mb-3 flex justify-between pr-5">
              <span>
                Added members{" "}
                <span className="text-black/50">
                  {"(Click on a member to delete them)"}
                </span>
              </span>
              <span
                className={`${membersList.length === 10 ? "text-red-600" : "text-gray-500"}`}
              >
                {membersList.length}/10
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
                  <p className="inline " onClick={() => deleteUser(user._id)}>
                    <span className="cursor-pointer hover:bg-gray-300">
                      {user.username}
                    </span>
                    .
                  </p>
                );
              })}
            </div>
            <ul
              className={`absolute top-70 left-50 bg-gray-100 min-w-sm px-2 py-1 pt-2 z-10 rounded-md border ${results.length !== 0 && membersList.length < 10 ? "block" : "hidden"}`}
            >
              {results.map((user, index) => {
                return (
                  <React.Fragment key={user._id}>
                    <li
                      key={user.id}
                      id={user._id}
                      className="flex items-center mx-auto text-lg cursor-pointer py-1 px-2 font-bold rounded-sm hover:bg-gray-300 mb-1 mt-1"
                      onClick={() => {
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
          <div>
            <p className="mt-5">Select a photo for the group {"(optional)"}</p>
            <div className="flex justify-center mt-3">
              <label htmlFor="pp-input" className="">
                <div className="relative w-60 h-60 rounded-full overflow-hidden group cursor-pointer">
                  <img
                    src={previewPic}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-6xl rounded-full font-light opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                    +
                  </div>
                </div>
                <input
                  type="file"
                  id="pp-input"
                  accept=".jpg,.png,.jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <button
            type="button"
            className="text-white bg-green-500 mx-auto px-4 py-2 rounded-full mt-7 cursor-pointer"
            onClick={handleSubmit}
          >
            Create a group
          </button>
        </form>
      </div>
    </div>
  );
}

export default GroupCreationModal;
