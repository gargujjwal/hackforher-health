import { HeroUIProvider } from "@heroui/system";
import { useNavigate } from "react-router-dom";

import { ChildrenProps } from "@/types";

export default function NextUiProvider({ children }: ChildrenProps) {
  const navigate = useNavigate();

  return <HeroUIProvider navigate={navigate}>{children}</HeroUIProvider>;
}
