import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";

import {ChildrenProps} from "@/types";

export default function NextUiProvider({children}: ChildrenProps) {
  const navigate = useNavigate();

  return <NextUIProvider navigate={navigate}>{children}</NextUIProvider>;
}
