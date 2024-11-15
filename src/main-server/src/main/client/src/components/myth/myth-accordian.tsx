import { Accordion, AccordionItem } from "@nextui-org/accordion";

import Link from "../util/link";

import { Myth } from "@/types/myth";

type Props = { myths: Myth[] };

function MythsAccordian({ myths }: Props) {
  return (
    <Accordion className="w-full">
      {myths.map(item => (
        <AccordionItem
          key={item.id}
          className="border-b border-borderColor last:border-0"
          title={
            <h3 className="mb-2 text-lg font-semibold text-primary">
              Myth: {item.myth}
            </h3>
          }
          value={item.id}
        >
          <div className="rounded-md bg-accent p-3">
            <h4 className="mb-1 font-medium text-primary">Reality:</h4>
            <p className="text-textSecondary">{item.reality}</p>
          </div>
          <div className="mt-4">
            <p className="text-textSecondary">{item.explanation}</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-secondary">
            <span>Source:</span>
            <Link
              isExternal
              showAnchorIcon
              color="primary"
              href={item.source.href}
            >
              {item.source.name}
            </Link>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default MythsAccordian;
