import { ChildrenProps } from "@/types";

function CardTitle({ children }: ChildrenProps) {
  return <h2 className="text-lg font-semibold sm:text-xl">{children}</h2>;
}

export default CardTitle;
