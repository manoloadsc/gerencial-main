import React from "react";
import getMessagePosition from "@/utils/getMessagePosition";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function messages({ message }) {
  const { user } = useAuthContext();
  return (
    <div
      key={message.id}
      className={`${getMessagePosition(
        message.author,
        user.uid
      )} p-2.5 w-fit m-2 rounded-lg font-semibold	text-secondary`}
    >
      {message.content}
    </div>
  );
}
