import React, { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { Separator } from "@/shadcn/components/ui/separator";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useSubcollection } from "@/hooks/useSubcollection";
import Message from "@/components/message";
import getInitials from "@/utils/getInitials";
import { useFirestore } from "@/hooks/useFirestore";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function chat({
  selectedChat,
  chats,
  setSelectedChat,
  setChatIsOpen,
  users,
}) {
  const { user } = useAuthContext();

  const { addSubDocument: createMessage } = useFirestore("chats");

  const [messageContent, setMessageContent] = useState("");

  const chat = chats.find((chat) => {
    console.log(selectedChat?.id);
    return chat.id === selectedChat?.id;
  });

  const { documents: messages } = useSubcollection(
    "chats",
    chat?.id,
    "messages",
    null,
    ["createdAt", "asc"]
  );

  const sendMessage = async () => {
    if (messageContent === "") return;

    await createMessage(chat?.id, "messages", {
      author: user.uid,
      createdAt: new Date(),
      content: messageContent,
    });
    setMessageContent("");
  };

  const closeChat = (chat) => {
    setChatIsOpen(false);
    setSelectedChat(null);
  };

  const openChat = (chat, userName) => {
    setChatIsOpen(true);
    setSelectedChat({
      id: chat.id,
      recipient: userName,
    });
  };

  const formatMessageDate = (dateObj) => {
    const now = new Date();
    const dayInMilliseconds = 24 * 60 * 60 * 1000;
    const daysOfWeek = [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
    ];

    // Calcula a diferença entre a data atual e a data passada em dias
    const diffInDays = Math.floor((now - dateObj) / dayInMilliseconds);

    // Se for o mesmo dia, retorna a hora
    if (diffInDays === 0) {
      return dateObj.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // Se for o dia anterior, retorna "Ontem"
    if (diffInDays === 1) {
      return "Ontem";
    }

    // Se for entre 2 e 6 dias atrás, retorna o dia da semana
    if (diffInDays >= 2 && diffInDays < 7) {
      return daysOfWeek[dateObj.getDay()];
    }

    // Se for 7 dias atrás ou mais, retorna a data no formato DD/MM/AA
    return dateObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="fixed bottom-32 right-[300px] h-[500px] w-96 border border-foreground/10 bg-input rounded-lg p-5">
      <div className="flex flex-col h-full">
        <Button
          variant="ghost"
          className="absolute top-3 right-2"
          onClick={closeChat}
        >
          <Cross2Icon />
        </Button>
        <div className="flex items-center gap-3">
          {selectedChat && (
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/70">
                {getInitials(selectedChat.recipient)}{" "}
              </AvatarFallback>
            </Avatar>
          )}
          <p className="font-medium">{selectedChat?.recipient || "Conversa"}</p>
        </div>
        <Separator className="bg-foreground/10 my-4" />
        <ScrollArea className="flex-grow">
          {selectedChat
            ? messages?.map((message) => (
                <Message key={message.id} message={message} />
              )) || (
                <p className="text-foreground/50 text-sm ">
                  Não há mensagens para exibir
                </p>
              )
            : chats?.map((chat) => {
                const chatUser = users.find(
                  (u) => chat.participants.includes(u.id) && u.id !== user.uid
                );
                return (
                  <>
                    <div
                      key={chat.id}
                      role="button"
                      className="hover:opacity-60 hover:bg-foreground/10 p-1 rounded-lg"
                      onClick={() => openChat(chat, chatUser.name)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/70">
                            {getInitials(chatUser.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold">{chatUser.name}</p>
                          <p className="text-muted-foreground text-sm">
                            {chat.lastMessage.content}
                          </p>
                        </div>
                        <p className="absolute top-1 right-2 text-muted-foreground text-xs">
                          {formatMessageDate(chat.lastMessage.createdAt.toDate())}
                        </p>
                      </div>
                    </div>
                    <Separator className="bg-foreground/10 my-4" />
                  </>
                );
              }) || <p>Não há conversar para exibir!</p>}
        </ScrollArea>
        <div className="flex gap-2.5">
          <Input
            type="text"
            placeholder="Digite aqui"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <Button onClick={sendMessage}>Enviar</Button>
        </div>
      </div>
    </div>
  );
}
