import { Card, CardBody, CardHeader } from "@nextui-org/card";

const newSearches = [
  {
    title: "Immunotherapy",
    description:
      "Treatment of cervical cancer includes immunotherapy with drugs called checkpoint inhibitors. These drugs are generally only given to people with metastatic or recurrent disease, with or without chemo. Research is being done to determine if immunotherapy would work better with different combinations of chemo, or if it can be used for people with earlier-stage disease.",
  },

  {
    title: "Targeted therapy",
    description:
      "Current targeted therapy includes finding cells with changes in the RET and NTRK genes. Scientists are studying how other gene mutations found in cervical cancer cells can be targeted by specific drugs. Genes called oncogenes and tumor suppressor genes, which control cell growth, are of particular interest. ",
  },
  {
    title: "Radiation therapy",

    description:
      "Studies are being done to determine the best ways to use external beam therapy and brachytherapy to treat cervical cancer and still limit damage to normal tissue. Doctors are also looking for ways to use more focused radiation along with other treatments, like immunotherapy, to treat advanced cervical cancers.",
  },
  {
    title: "Chemotherapy",
    description:
      "Many clinical trials are looking for better chemo drugs to treat cervical cancer. Research is ongoing to understand which specific combinations of chemo drugs allow for the best treatment results.",
  },
  {
    title: "HPV vaccines",
    description:
      "Vaccines have been developed to prevent infection with some of the high risk HPV types  that are associated with cervical cancer. The current vaccines are intended to produce immunity to HPV types that cause about 90% of cervical cancers.",
  },
];

function NewResearchTab() {
  return (
    <Card>
      <CardHeader>
        <h3 className="mb-4 text-2xl font-bold text-[#921A40]">
          What&apos; New in Cervical Cancer Research?
        </h3>
      </CardHeader>
      <CardBody>
        <p className="mb-4 text-[#2E2E2E]">
          New ways to prevent and treat cancer of the cervix are being
          researched. Some of the promising new developments are covered here.
        </p>
        <ul className="space-y-4 text-[#2E2E2E]">
          {newSearches.map(search => (
            <li key={search.title}>
              <h4 className="text-lg font-bold text-[#921A40]">
                {search.title}
              </h4>
              <p>{search.description}</p>
            </li>
          ))}
        </ul>
        <p className="font-medium text-[#921A40]">
          Source:{" "}
          <a
            className="hover:underline"
            href="https://www.cdc.gov/hpv/index.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            CDC
          </a>
        </p>
      </CardBody>
    </Card>
  );
}

export default NewResearchTab;
