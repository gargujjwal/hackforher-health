import type { ChildrenProps } from "@/types";

import { Link } from "@nextui-org/link";

import Navbar from "@/components/navbar";
import { GithubIcon } from "@/components/util/icons";

export default function DefaultLayout({ children }: ChildrenProps) {
  return (
    <div className="relative flex h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-grow px-6 py-16">{children}</main>
      <footer className="flex w-full items-center justify-center gap-1 py-3 text-current">
        <Link
          isExternal
          href="https://github.com/ujjwalgarg100204/vit-project-1"
        >
          <GithubIcon className="text-default-500" />
        </Link>
        <span className="text-default-600">Created by</span>
        <p className="flex items-center gap-1.5 text-primary">
          <Link isExternal href="https://ujjwal-new-portfolio.vercel.app/">
            Ujjwal Garg,
          </Link>
          <Link isExternal href="https://github.com/namanrath2003">
            Naman Rath,
          </Link>
          <Link isExternal href="https://github.com/utkarsh-shukla2003">
            Utkarsh Shukla.
          </Link>
        </p>
      </footer>
    </div>
  );
}
