import { Card, CardBody } from "@heroui/card";

function DetectionStagingTab() {
  return (
    <Card>
      <CardBody>
        <h3 className="mb-4 text-2xl font-bold text-[#921A40]">
          Signs and Symptoms of Cervical Cancer
        </h3>
        <p className="mb-4 text-[#2E2E2E]">
          Women with early cervical cancers and pre-cancers usually have no
          symptoms. Symptoms often do not begin until the cancer becomes larger
          and grows into nearby tissue. When this happens, the most common
          cervical cancer symptoms are:
        </p>
        <ul className="mb-4 list-inside list-disc pl-6 text-[#2E2E2E]">
          <li>
            Abnormal vaginal bleeding, such as bleeding after vaginal sex,
            bleeding after menopause, bleeding and spotting between periods, or
            having (menstrual) periods that are longer or heavier than usual.
            Bleeding after douching may also occur.
          </li>
          <li>
            An unusual discharge from the vagina − the discharge may contain
            some blood and may occur between your periods or after menopause.
          </li>
          <li>Pain during sex</li>
          <li>Pain in the pelvic region</li>
        </ul>
        <p className="mb-4 text-[#2E2E2E]">
          Signs and symptoms of cervical cancer seen with more advanced disease
          can include:
        </p>
        <ul className="mb-4 list-inside list-disc pl-6 text-[#2E2E2E]">
          <li>Swelling of the legs</li>
          <li>Problems urinating or having a bowel movement</li>
          <li>Blood in the urine</li>
        </ul>
        <p className="mb-4 text-[#2E2E2E]">
          These signs and symptoms can also be caused by conditions other than
          cervical cancer. Still, if you have any of these cervical cancer
          symptoms, see a health care professional right away. Ignoring symptoms
          may allow the cancer to grow to a more advanced stage and lower your
          chance for successful treatment.
        </p>
        <p className="mb-4 text-[#2E2E2E]">
          For the best chances for treatment to be successful, don&apos;t wait
          for symptoms and signs of cervical cancer to appear. Have regular
          screening tests for cervical cancer.
        </p>

        <h3 className="mb-4 text-2xl font-bold text-[#921A40]">
          Can Cervical Cancer Be Found Early?
        </h3>
        <p className="mb-4 text-[#2E2E2E]">
          The best way to find cervical cancer early is to have regular
          screening tests. The tests for cervical cancer screening are the HPV
          test and the Pap test. These tests can be done alone or at the same
          time (called a co-test). Regular screening has been shown to prevent
          cervical cancers and save lives.{" "}
          <span className="font-bold">
            The most important thing to remember is to get screened regularly,
            no matter which test you get.
          </span>
        </p>
        <p className="mb-4 text-[#2E2E2E]">
          Early detection greatly improves the chances of successful treatment
          of pre-cancers and cancer. Being aware of any signs and symptoms of
          cervical cancer can also help avoid delays in diagnosis.
        </p>
      </CardBody>
    </Card>
  );
}

export default DetectionStagingTab;
