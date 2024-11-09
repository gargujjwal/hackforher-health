import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import clsx from "clsx";
import { ReactNode } from "react";
import { LuDot } from "react-icons/lu";

import Link from "@/components/util/link";

type Props = {
  href: string;
  title: string;
  icon: ReactNode;
  footer: string | string[];
  variant: 1 | 2 | 3 | 4;
};
function ActionCard({ href, title, icon, footer, variant }: Props) {
  return (
    <Card
      as={Link}
      className={clsx("h-full w-full text-center text-white", {
        "bg-cardAccent1": variant === 1,
        "bg-cardAccent2": variant === 2,
        "bg-cardAccent3": variant === 3,
        "bg-cardAccent4": variant === 4,
      })}
      href={href}
    >
      <CardHeader
        className={clsx("justify-center text-xl font-bold", {
          "text-buttonText": [1, 3].includes(variant),
          "text-headline": variant === 2,
          "text-primary": variant === 4,
        })}
      >
        {title}
      </CardHeader>
      <CardBody className="items-center">{icon}</CardBody>
      {Array.isArray(footer) ? (
        <CardFooter className="flex items-center justify-center space-x-0.5 text-xs text-buttonText md:text-sm">
          {footer.map((text, index) => (
            <>
              <p key={index}>{text}</p>
              {index < footer.length - 1 && <LuDot />}
            </>
          ))}
        </CardFooter>
      ) : (
        <CardFooter
          className={clsx("justify-center text-xs text-primary md:text-sm", {
            "text-buttonText": [1, 3].includes(variant),
            "text-headline": variant === 2,
            "text-primary": variant === 4,
          })}
        >
          <p>{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
}

export default ActionCard;
