import {
  MessagesSquare,
  Scroll,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const navbarLinks = [
  {
    href: "https://github.com/tteck/Proxmox",
    event: "Github",
    icon: <FaGithub className="h-4 w-4" />,
    text: "Github",
  },
  {
    href: "https://github.com/tteck/Proxmox/blob/main/CHANGELOG.md",
    event: "Change Log",
    icon: <Scroll className="h-4 w-4" />,
    text: "Change Log",
  },
  {
    href: "https://github.com/tteck/Proxmox/discussions",
    event: "Discussions",
    icon: <MessagesSquare className="h-4 w-4" />,
    text: "Discussions",
  },
];