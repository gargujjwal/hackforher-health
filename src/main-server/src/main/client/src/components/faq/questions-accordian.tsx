import {Accordion, AccordionItem} from "@nextui-org/accordion";

import Link from "../util/link";

import {Question} from "@/types/faq";

interface Props {
  questions: Question[];
  title?: string;
  className?: string;
}

function QuestionsAccordian({questions}: Props) {
  const defaultContent = (answer: string, source: Question["source"]) => (
      <div className="space-y-4">
        <p className="text-textSecondary">{answer}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-textSecondary">Source:</span>
          <Link isExternal showAnchorIcon color="primary" href={source.href}>
            {source.name}
          </Link>
        </div>
      </div>
  );

  return (
      <Accordion
          className="bg-cardBackground"
          selectionMode="multiple"
          variant="bordered"
      >
        {questions.map((q, index) => (
            <AccordionItem
                key={index}
                aria-label={q.question}
                className="border-borderColor"
                title={
                  <span className="font-medium text-textSecondary">{q.question}</span>
                }
            >
              {defaultContent(q.answer, q.source)}
            </AccordionItem>
        ))}
      </Accordion>
  );
}

export default QuestionsAccordian;
