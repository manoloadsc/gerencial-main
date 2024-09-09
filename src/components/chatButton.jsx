import React from "react";
import { Button } from "@/shadcn/components/ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

export default function chatButton({ setChatIsOpen, setSelectedChat }) {

  const handleClick = () => {
    setSelectedChat(null);
    setChatIsOpen((prev) => !prev);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-16 w-16 bg-primary fixed bottom-12 right-[300px] rounded-full p-3 hover:bg-primary-foreground"
      onClick={handleClick}
    >
      <ChatBubbleIcon className="h-8 w-8" />
    </Button>
  );
}
