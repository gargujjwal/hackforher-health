import {ChildrenProps} from "@/types";

function H1({children}: ChildrenProps) {
  return <h1 className="mb-4 text-2xl font-bold lg:text-3xl">{children}</h1>;
}

export default H1;
