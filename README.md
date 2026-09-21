# QuickChat — Client

A real-time messaging web app built with React. Send messages, create group chats, search for users, and manage group members — all in a clean, responsive interface.

🔗 **Live demo:** [quick-chat-client-woad-eight.vercel.app](https://quick-chat-client-woad-eight.vercel.app)

> The backend lives in the [quickChat](https://github.com/aymene-dev/quickChat) repository.

---

## Features

- **Authentication** — Register with avatar upload, login, persistent sessions via refresh tokens
- **Real-time messaging** — Messages appear instantly using WebSockets (Socket.io)
- **Private conversations** — Start a 1-on-1 chat by searching for a user
- **Group chats** — Create groups, add/remove members, leave a group
- **User search** — Live search with debounce as you type
- **Responsive** — Works on mobile and desktop

---

## Tech Stack

- **React 19** + Vite
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **Socket.io-client** for real-time communication
- **React Router** for navigation
- **JWT Decode** for token handling
- **Cloudinary** for avatar storage
- **Context API** for state management (Auth, Conversation, GroupModal, SuccessMessage)

---

## Getting Started

```bash
git clone https://github.com/aymene-dev/quickchat-client
cd quickchat-client
npm install
```

Create a `.env.development` file at the root:

```
VITE_API_URL=http://localhost:3000
```

Then run:

```bash
npm run dev
```

Make sure the backend is running locally. See the [quickChat](https://github.com/aymene-dev/quickChat) repo for setup instructions.

---

## Project Structure

```
src/
├── api/              # Axios instance
├── context/          # React contexts (Auth, Conversation, GroupModal, SuccessMessage)
├── AccountMenu.jsx
├── ConvList.jsx      # Conversation list in the sidebar
├── ConvPanel.jsx     # Main chat view
├── GroupCreationModal.jsx
├── GroupMemberAddingModal.jsx
├── GroupMemberDelete.jsx
├── GroupMembersModal.jsx
├── GroupMenu.jsx
├── GroupModal.jsx
├── LeaveGroupModal.jsx
├── LoginForm.jsx
├── MainPage.jsx
├── ProtectedRoute.jsx
├── Sidebar.jsx
├── SidebarHeader.jsx
├── SignUpForm.jsx
├── SuccessMessage.jsx
└── UsersList.jsx
```

---

## Roadmap

This is an MVP. A lot of features are missing — here's what's planned:

- [ ] Message deletion and editing from the UI
- [ ] Read receipts (✓✓)
- [ ] Typing indicators
- [ ] Push notifications
- [ ] File and image sharing
- [ ] Online/offline status
- [ ] Message reactions
- [ ] Admin transfer in groups
- [ ] Dark mode

Will these ever be implemented? Honestly, probably not. But they look great on a roadmap.

---

## Deployment

- **Frontend** — Vercel
- **Backend** — Railway
- **Database** — MongoDB Atlas
- **Media** — Cloudinary