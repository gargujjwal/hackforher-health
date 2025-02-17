import { Card, CardBody, CardHeader } from "@heroui/card";

const treatmentSections = [
  {
    title: "Common Types of Treatments for Cervical Cancer",
    content: [
      "Surgery for Cervical Cancer",
      "Radiation Therapy for Cervical Cancer",
      "Chemotherapy for Cervical Cancer",
      "Targeted Drug Therapy for Cervical Cancer",
      "Immunotherapy for Cervical Cancer",
    ],
  },
  {
    title: "Common Treatment Approaches",
    content: [
      "Depending on the type and stage of your cancer, you may need more than one type of treatment. For the earliest stages of cervical cancer, either surgery or radiation combined with chemo may be used. For later stages, radiation combined with chemo is usually the main treatment. Chemo (by itself) is often used to treat advanced cervical cancer.",
    ],
  },
  {
    title: "Who Treats Cervical Cancer?",
    content: [
      "A gynecologist: a doctor who treats diseases of the female reproductive system",
      "A gynecologic oncologist: a doctor who specializes in cancers of the female reproductive system who can perform surgery and prescribe chemotherapy and other medicines",
      "A radiation oncologist: a doctor who uses radiation to treat cancer",
      "A medical oncologist: a doctor who uses chemotherapy and other medicines to treat cancer",
    ],
  },
];

function TreatmentTab() {
  return (
    <Card>
      <CardHeader>
        <h3 className="mb-4 text-2xl font-bold text-[#921A40]">
          Treatment Options for Cervical Cancer
        </h3>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {treatmentSections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <h3 className="font-semibold text-textSecondary">
                {section.title}
              </h3>
            </CardHeader>
            <CardBody as="ul" className="list-inside list-disc">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-5 text-textSecondary">
                  {item}
                </li>
              ))}
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </Card>
  );
}

export default TreatmentTab;
