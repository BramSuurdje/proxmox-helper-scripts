import {
  LucideBookOpenCheck,
  LucideClipboardSignature,
  LucideGitPullRequestDraft,
  MessageSquareText,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const navBarLinks = [
  {
    href: "https://github.com/tteck/Proxmox/discussions",
    event: "Discussions",
    icon: <MessageSquareText className="mr-2 h-4 w-4" />,
    text: "Discussions",
  },
  {
    href: "https://github.com/tteck/Proxmox/blob/main/.github/CONTRIBUTING.md",
    event: "Contributing",
    icon: <LucideGitPullRequestDraft className="mr-2 h-4 w-4" />,
    text: "Contribute",
  },
  {
    href: "https://github.com/tteck/Proxmox/blob/main/USER_SUBMITTED_GUIDES.md",
    event: "Guides",
    icon: <LucideBookOpenCheck className="mr-2 h-4 w-4" />,
    text: "Guides",
  },
  {
    href: "https://github.com/tteck/Proxmox/blob/main/CHANGELOG.md",
    event: "Change Log",
    icon: <LucideClipboardSignature className="mr-2 h-4 w-4" />,
    text: "Changelog",
  },
  {
    href: "https://github.com/tteck/Proxmox",
    event: "View on GitHub",
    icon: <FaGithub className="mr-2 h-4 w-4" />,
    text: "View on Github",
  },
];
