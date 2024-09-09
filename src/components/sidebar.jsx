import React from "react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/shadcn/components/mode-toggle";
import { Button } from "@/shadcn/components/ui/button";
import {
  CalendarIcon,
  ChatBubbleIcon,
  DashboardIcon,
  ExitIcon,
  FileTextIcon,
  InfoCircledIcon,
  LightningBoltIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useLogout } from "@/hooks/useLogout";
import Logo1 from "@/assets/LOGO CRM 1.png";
import { Icon } from "lucide-react";
import { Separator } from "@/shadcn/components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { useAuthContext } from "@/hooks/useAuthContext";
import LabelSvg from "@/components/Label";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import getInitials from "@/utils/getInitials";
import Logo from "./logo";

const userOptions = [
  {
    route: "/activy",
    name: "Atividade",
    icon: <LightningBoltIcon />,
  },
  {
    route: "/profile",
    name: "Meu perfil",
    icon: <PersonIcon />,
  },
];

const projectOption = [
  {
    route: "/",
    name: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    route: "/tasks",
    name: "Tarefas",
    icon: <FileTextIcon />,
  },
  {
    route: "/chats",
    name: "Conversa",
    icon: <ChatBubbleIcon />,
  },
  {
    route: "/calendar",
    name: "Calendário",
    icon: <CalendarIcon />,
  },
];

const labelOptions = [
  {
    route: "/a",
    name: "Alta prioridade",
    icon: <LabelSvg color="#e9171b" />,
  },
  {
    route: "/b",
    name: "Média prioridade",
    icon: <LabelSvg color="#f7b020" />,
  },
  {
    route: "/c",
    name: "Baixa prioridade",
    icon: <LabelSvg color="#feff2d" />,
  },
  {
    route: "/d",
    name: "Em Standby",
    icon: <LabelSvg color="#31ff9a" />,
  },
];

export default function sidebar() {
  const navigate = useNavigate();

  const { logout, error, isPending } = useLogout();

  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  //<img className="p-5" src={Logo1} alt="logo" />

  return (
    <nav className="h-screen w-[250px] bg-secondary border border-border">
      <ScrollArea className="">
        <Logo />
        <div className="p-5 gap-4 flex">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/70">
              {getInitials(user.displayName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.displayName}</p>
            <p className="text-muted-foreground/75 text-sm">{user.email}</p>
          </div>
        </div>

        <h2 className="text-mt font-medium text-muted-foreground px-5">
          Ínicio
        </h2>

        {userOptions.map((option) => (
          <div
            key={option.route}
            className="text-foreground px-5 py-2 flex items-center gap-2"
            onClick={() => navigate(option.route)}
            role="button"
          >
            {option.icon}
            <p className="text-mt font-medium">{option.name}</p>
          </div>
        ))}
        <div className="flex justify-center">
          <Separator className="my-4 w-10/12" />
        </div>

        <h2 className="text-mt font-medium text-muted-foreground px-5">
          Projeto
        </h2>

        {projectOption.map((option) => (
          <div
            key={option.route}
            className="text-foreground px-5 py-2 flex items-center gap-2"
            onClick={() => navigate(option.route)}
            role="button"
          >
            {option.icon}
            <p className="text-mt font-medium">{option.name}</p>
          </div>
        ))}

        <div className="flex justify-center">
          <Separator className="my-4 w-10/12" />
        </div>

        <h2 className="text-mt font-medium text-muted-foreground px-5">Tags</h2>

        {labelOptions.map((option) => (
          <div
            key={option.route}
            className="text-foreground px-5 py-2 flex items-center gap-2"
            onClick={() => navigate(option.route)}
            role="button"
          >
            {option.icon}
            <p className="text-mt font-medium">{option.name}</p>
          </div>
        ))}

        <div className="flex justify-center">
          <Separator className="my-4 w-10/12" />
        </div>

        <div className="px-5 py-2">
          <Button variant="outline" className="opacity-50 ">
            <InfoCircledIcon className="w-4 h-4 mr-2" />
            Central de ajuda
          </Button>
        </div>

        <div className="px-5 py-2">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="opacity-50 "
          >
            <ExitIcon className="w-4 h-4 mr-2" />
            Sair da conta
          </Button>
        </div>
      </ScrollArea>
    </nav>
  );
}
