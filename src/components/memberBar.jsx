import React, { useState, useEffect, useLayoutEffect } from "react";
import { useCollection } from "@/hooks/useCollection";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { useAuthContext } from "@/hooks/useAuthContext";

function MemberSkeleton() {
  return (
    <div className="flex items-center gap-2.5 py-2">
      <Skeleton className="h-4 bg-muted-foreground/75 w-4 rounded-full" />
      <Skeleton className="h-4 bg-muted-foreground/75 w-[120px]" />
    </div>
  );
}

export default function MemberBar({ setSelectedChat, setChatIsOpen, chats, users }) {
  const { user } = useAuthContext();

  const [userLength, setUserLength] = useState(
    Number(localStorage.getItem("userLength")) || 0
  );

  const openChat = (userId, userName) => {
    const chat = chats.find(
      (chat) =>
        chat.participants.includes(userId) &&
        chat.participants.includes(user.uid)
    );
    setChatIsOpen(true);
    setSelectedChat({
      id: chat.id,
      recipient: userName,
    });
  };

  useEffect(() => {
    if (users) {
      localStorage.setItem("usersLength", users.length);
      setUserLength(users.length);
    }
  }, [users]);

  useLayoutEffect(() => {
    setUserLength(Number(localStorage.getItem("usersLength")) || 0);
  }, []);

  return (
    <aside className="h-screen w-[250px] bg-secondary border border-border p-5">
      <h2 className="font-medium text-xl mb-5">Membros</h2>
      {users
        ? users.filter(u => u.id !== user.uid).map((user) => (
            <div
              key={user.id}
              className="flex gap-3 items-center py-1"
              role="button"
              onClick={() => openChat(user.id, user.name)}
            >
              <div
                className={`${
                  user.online ? "bg-green-500" : "bg-red-500"
                } h-3 w-3 block rounded-full`}
              />
              <p className="font-medium">{user.name}</p>
            </div>
          ))
        : [...Array(userLength)].map((_, index) => (
            <MemberSkeleton key={index} />
          ))}
    </aside>
  );
}
