import type { LucideIcon } from "lucide-react";
import { Plus, Home, FileText, Wallet, Stamp, User } from "lucide-react";
import "./HeaderTitle.css";

type HeaderTitleType =
  | "dashboard"
  | "new-request"
  | "certificates"
  | "debts"
  | "profile"
  | "default";

interface Props {
  title: string;
  type?: HeaderTitleType;
}

const ICONS: Record<HeaderTitleType, LucideIcon> = {
  dashboard: Home,
  "new-request": Plus,
  certificates: FileText,
  debts: Wallet,
  profile: User,
  default: Stamp,
};

export default function HeaderTitle({ title, type = "default" }: Props) {
  const Icon = ICONS[type];

  return (
    <div className="header-title">
      <Icon size={20} strokeWidth={2.2} />
      <h2>{title}</h2>
    </div>
  );
}