import { Image } from "@nextui-org/image";
import { Tab, Tabs } from "@nextui-org/tabs";
import { motion } from "framer-motion";

import DetectionStagingTab from "@/components/awareness-prevention/detection-staging-tab";
import NewResearchTab from "@/components/awareness-prevention/new-research-tab";
import PreventionTab from "@/components/awareness-prevention/prevention-tab";
import TreatmentTab from "@/components/awareness-prevention/treatment-tab";

function AwarenessPreventionIndexPage() {
  return (
    <div className="bg-[#F4D9D0] px-4 py-12 md:px-8">
      <h2 className="mb-8 text-4xl font-bold text-[#921A40]">
        Awareness & Prevention
      </h2>

      <div className="rounded-lg bg-[#D9ABAB] p-6 shadow-lg">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-3xl font-bold text-[#921A40]">
              Cervical Cancer
            </h3>
            <p className="mb-4 text-[#2E2E2E]">
              Cervical cancer starts in the cells lining the cervix -- the lower
              part of the uterus (womb). The cervix connects the body of the
              uterus (the upper part where a fetus grows) to the vagina (birth
              canal). Cancer starts when cells in the body begin to grow out of
              control.
            </p>
            <p className="mb-4 text-[#2E2E2E]">
              The cervix is made of two parts and is covered with two different
              types of cells. The endocervix is the opening of the cervix that
              leads into the uterus, covered with glandular cells. The exocervix
              (or ectocervix) is the outer part of the cervix that can be seen
              by the doctor during a speculum exam, covered in squamous cells.
              The place where these two cell types meet in the cervix is called
              the transformation zone, where most cervical cancers begin.
            </p>
          </div>
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              alt="Diagram of the Cervix"
              className="h-full w-full rounded-lg shadow-lg"
              src="/cervical-cancer.jpg"
            />
          </motion.div>
        </div>
      </div>

      <Tabs
        aria-label="Awareness and Prevention Tabs"
        className="mt-8"
        classNames={{ tabList: "flex-col md:flex-row" }}
      >
        <Tab key="detecting-and-staging" title="Detecting & Staging">
          <DetectionStagingTab />
        </Tab>
        <Tab key="hpv-news" title="HPV News">
          <NewResearchTab />
        </Tab>
        <Tab key="prevention" title="Prevention">
          <PreventionTab />
        </Tab>
        <Tab key="treatment" title="Treatment">
          <TreatmentTab />
        </Tab>
      </Tabs>
    </div>
  );
}

export default AwarenessPreventionIndexPage;
