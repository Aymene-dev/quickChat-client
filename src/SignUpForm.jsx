import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/axios.js";
import { useSuccessMsg } from "./context/successMessageContext.jsx";

function SignUpForm() {
  const defaultPp =
    "https://res.cloudinary.com/dgkwexcoc/image/upload/v1781018793/user_txrwu9.png";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayImageForm, setDisplayImageForm] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(defaultPp);

  const [emailTouched, setEmailTouched] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [usernameAvailability, setUsernameAvailability] = useState(true); //true for available username
  const [emailAvailability, setEmailAvailability] = useState(true); //true for available email
  const { successMsgDisplay, setSuccessMsgDisplay } = useSuccessMsg();

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isEmailValid = emailRegex.test(email);

  let isUsernameValid = true;

  const checkUsername = async () => {
    const response = await api.get("/users/search-one", {
      params: { username },
    });
    if (!response.data.availability) {
      setUsernameAvailability(false);
    } else {
      setUsernameAvailability(true);
    }
  };

  useEffect(() => {
    checkUsername();
  }, [username]);

  const checkEmail = async () => {
    const response = await api.get("/users/check-email", {
      params: { email },
    });
    if (!response.data.availability) {
      setEmailAvailability(false);
    } else {
      setEmailAvailability(true);
    }
  };

  useEffect(() => {
    checkEmail();
  }, [email]);

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const isConfirmPasswordValid =
    confirmPassword === password && confirmPassword !== "";

  const handleNext = () => {
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);
    console.log(isEmailValid);
    console.log(usernameAvailability);
    console.log(isPasswordValid);
    console.log(isConfirmPasswordValid);

    if (
      isEmailValid &&
      usernameAvailability &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      setDisplayImageForm(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "quickchat");
    formData.append("folder", "quickchat-pps");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgkwexcoc/image/upload",
      { method: "POST", body: formData },
    );
    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async () => {
    const profilePicDb = profilePic
      ? await uploadToCloudinary(profilePic)
      : defaultPp;
    const response = await api.post("/auth/register", {
      username,
      email,
      avatar: profilePicDb,
      password,
    });
    if (response.status === 201) {
      setSuccessMsgDisplay(true);
      navigate("/login");
    }
  };

  const CheckIcon = () => <span className="text-green-500 mr-1">✓</span>;
  const CrossIcon = () => <span className="text-red-500 mr-1">✗</span>;

  return (
    <div className="w-full h-screen bg-blue-950 flex justify-center items-center">
      <form
        className="bg-white py-6 min-h-100 w-4/10 rounded-3xl shadow-2xl relative overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        {displayImageForm && (
          <button
            type="button"
            className="absolute z-10 font-bold text-4xl top-3 left-8 text-white bg-green-400 cursor-pointer px-3 pt-1 pb-3 rounded-full"
            onClick={() => setDisplayImageForm(false)}
          >
            &larr;
          </button>
        )}

        <div
          className={`w-full flex justify-center flex-col ${displayImageForm ? "hidden" : "block"}`}
        >
          <h1 className="mb-7 text-3xl font-bold mx-auto">
            Create a new account
          </h1>

          <label htmlFor="email-input" className="w-4/5 mb-5 mx-auto">
            Email
            <input
              type="text"
              id="email-input"
              className={`block bg-gray-200 px-3 py-2 rounded-4xl mt-3 w-full focus:outline-none border-2 ${
                emailTouched && !isEmailValid
                  ? "border-red-500"
                  : "border-transparent"
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailTouched(true);
              }}
            />
            {emailTouched && !emailAvailability && (
              <p className="mt-2 text-sm">
                An account with this email already exists. You can sign in.
              </p>
            )}
            {emailTouched && !isEmailValid && (
              <p className="text-red-500 mt-2 text-sm">
                Please enter a valid email
              </p>
            )}
          </label>

          <label htmlFor="username-input" className="w-4/5 mb-5 mx-auto">
            Username
            <input
              type="text"
              id="username-input"
              className={`block bg-gray-200 px-3 py-2 rounded-4xl mt-3 w-full focus:outline-none border-2
                ${
                  usernameTouched && (!usernameAvailability || username === "")
                    ? "border-red-500"
                    : "border-transparent"
                }`}
              placeholder="Choose a username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameTouched(true);
              }}
            />
            {username !== "" && usernameTouched && usernameAvailability && (
              <p className="text-green-500 mt-2 text-sm">
                This username is available.
              </p>
            )}
            {username !== "" && usernameTouched && !usernameAvailability && (
              <p className="text-red-500 mt-2 text-sm">
                This username has already been taken.
              </p>
            )}
            {username === "" && usernameTouched && (
              <p className="text-red-500 mt-2 text-sm">
                The username can not be empty
              </p>
            )}
          </label>

          <label htmlFor="password-input" className="w-4/5 mb-5 mx-auto">
            Password
            <input
              type="password"
              id="password-input"
              className={`block bg-gray-200 px-3 py-2 rounded-4xl mt-3 w-full focus:outline-none border-2 ${
                passwordTouched && !isPasswordValid
                  ? "border-red-500"
                  : "border-transparent"
              }`}
              placeholder="Enter a password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordTouched(true);
              }}
            />
            {passwordTouched && (
              <ul className="mt-2 text-sm space-y-1">
                <li
                  className={
                    passwordChecks.length ? "text-green-500" : "text-red-500"
                  }
                >
                  {passwordChecks.length ? <CheckIcon /> : <CrossIcon />}
                  At least 8 characters
                </li>
                <li
                  className={
                    passwordChecks.uppercase ? "text-green-500" : "text-red-500"
                  }
                >
                  {passwordChecks.uppercase ? <CheckIcon /> : <CrossIcon />}
                  At least one capital letter
                </li>
                <li
                  className={
                    passwordChecks.lowercase ? "text-green-500" : "text-red-500"
                  }
                >
                  {passwordChecks.lowercase ? <CheckIcon /> : <CrossIcon />}
                  At least one small letter
                </li>
                <li
                  className={
                    passwordChecks.number ? "text-green-500" : "text-red-500"
                  }
                >
                  {passwordChecks.number ? <CheckIcon /> : <CrossIcon />}
                  At least one number
                </li>
              </ul>
            )}
          </label>

          <label htmlFor="confirm-password-input" className="w-4/5 mx-auto">
            Confirm password
            <input
              type="password"
              id="confirm-password-input"
              className={`block bg-gray-200 px-3 py-2 rounded-4xl mt-3 w-full focus:outline-none border-2 ${
                confirmPasswordTouched && !isConfirmPasswordValid
                  ? "border-red-500"
                  : "border-transparent"
              }`}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordTouched(true);
              }}
            />
            {confirmPasswordTouched && !isConfirmPasswordValid && (
              <p className="text-red-500 mt-2 text-sm">
                The passwords don't match
              </p>
            )}
          </label>

          <div
            className="mt-8 bg-green-400 text-white px-4 py-2 rounded-3xl cursor-pointer mx-auto"
            onClick={handleNext}
          >
            Next <span className="text-lg">&rarr;</span>
          </div>
          <p className="mt-2 mx-auto">
            Already have an account?{" "}
            <a
              className="text-blue-500 underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign in
            </a>
          </p>
        </div>

        <div
          className={`w-full flex justify-center items-center flex-col ${displayImageForm ? "block" : "hidden"}`}
        >
          <p className="mb-8">Select a profile picture (optional)</p>
          <label htmlFor="pp-input">
            <div className="relative w-100 h-100 rounded-full overflow-hidden group cursor-pointer">
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
          <button
            type="button"
            className="mt-8 bg-green-400 text-white px-4 py-2 rounded-3xl cursor-pointer"
            onClick={handleSubmit}
          >
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
