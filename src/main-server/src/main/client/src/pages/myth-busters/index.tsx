import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { IoAlertCircle } from "react-icons/io5";

import { myths } from "@/components/myth/data";
import MythsAccordian from "@/components/myth/myth-accordian";

function MythBustersIndexPage() {
  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <Card className="bg-cardBackground p-4">
        <CardHeader className="flex-col">
          <div className="flex items-center gap-2">
            <IoAlertCircle className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-headline">
              Cervical Cancer: Myths vs Reality
            </h1>
          </div>
          <p className="mt-2 text-textSecondary">
            Let&apos;s address common misconceptions about cervical cancer with
            evidence-based facts.
          </p>
        </CardHeader>
        <CardBody>
          <MythsAccordian myths={myths} />
        </CardBody>
      </Card>
    </div>
  );
}

export default MythBustersIndexPage;
