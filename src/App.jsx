import "./App.css";
import Sidebar from "./components/sidebar";
import MemberBar from "./components/memberBar";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Projects from "./pages/projects/projects";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Loading from "@/components/loading.jsx";
import Chat from "@/components/chat.jsx";
import ChatButton from "@/components/chatButton.jsx";
import { ThemeProvider } from "./providers/theme-provider";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState } from "react";
import { useCollection } from "@/hooks/useCollection";

function App() {
  const { user, authIsReady } = useAuthContext();

  const { documents: users } = useCollection("users");

  const [chatIsOpen, setChatIsOpen] = useState(false);

  const [selectedChat, setSelectedChat] = useState(null);

  const { documents: chats } = useCollection("chats");

  if (!chats) return <Loading />;

  if (!authIsReady) return <Loading />;

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="App flex">
        <BrowserRouter>
          {user ? (
            <>
              <Sidebar />
              <div className="flex-grow">
                <Routes>
                  <Route exect path="/" element={<Home />} />
                  <Route path="*" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/projects" element={<Projects />} />
                </Routes>
              </div>
              <MemberBar
                users={users}
                chats={chats}
                setSelectedChat={setSelectedChat}
                setChatIsOpen={setChatIsOpen}
              />
              {chatIsOpen && (
                <Chat
                  users={users}
                  setSelectedChat={setSelectedChat}
                  setChatIsOpen={setChatIsOpen}
                  chats={chats}
                  selectedChat={selectedChat}
                />
              )}
              <ChatButton
                setChatIsOpen={setChatIsOpen}
                setSelectedChat={setSelectedChat}
              />
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Signup />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
