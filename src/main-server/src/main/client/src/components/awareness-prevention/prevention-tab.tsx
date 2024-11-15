import { Card, CardBody } from "@nextui-org/card";

function PreventionTab() {
  return (
    <Card>
      <CardBody>
        <h3 className="mb-4 text-2xl font-bold text-[#921A40]">
          Can Cervical Cancer Be Prevented?
        </h3>
        <p className="mb-4 text-[#2E2E2E]">
          The two most important things you can do to prevent cervical cancer
          are to get the HPV vaccine if you are eligible, and to be tested
          regularly according to American Cancer Society (ACS) guidelines.
        </p>
        <h4 className="mb-2 text-xl font-bold text-[#921A40]">
          Getting the HPV Vaccine
        </h4>
        <p className="mb-4 text-[#2E2E2E]">
          Vaccines are available that can help protect children and young adults
          against certain HPV infections. These vaccines protect against
          infection with the HPV types most commonly linked to cancer, as well
          as some types that can cause anal and genital warts.
        </p>
        <p className="mb-4 text-[#2E2E2E]">
          The ACS recommends HPV vaccination of children between the ages of 9
          and 12. Children and young adults age 13 through 26 who have not been
          vaccinated, or who haven&apos;t gotten all their doses, should get the
          vaccine as soon as possible.
        </p>
        <h4 className="mb-2 text-xl font-bold text-[#921A40]">
          Regular Cervical Cancer Screening
        </h4>
        <p className="mb-4 text-[#2E2E2E]">
          A well-proven way to prevent cervical cancer is to have screening
          tests, such as the Pap test and the HPV test. These tests can find
          pre-cancers before they turn into invasive cancer, allowing for
          treatment to prevent the cancer from developing.
        </p>
        <p className="mb-4 text-[#2E2E2E]">
          It is important to follow the ACS guidelines for regular cervical
          cancer screening, as most invasive cervical cancers are found in women
          who have not had regular Pap tests.
        </p>
        <h4 className="mb-2 text-xl font-bold text-[#921A40]">
          Other Prevention Strategies
        </h4>
        <p className="mb-4 text-[#2E2E2E]">
          Additional ways to help prevent cervical cancer include:
        </p>
        <ul className="mb-4 list-inside list-disc pl-6 text-[#2E2E2E]">
          <li>
            Limiting exposure to HPV by reducing the number of sexual partners
            and using condoms
          </li>
          <li>Not smoking, as smoking increases the risk of cervical cancer</li>
        </ul>
      </CardBody>
    </Card>
  );
}

export default PreventionTab;
