import {Spinner} from "@nextui-org/spinner";
import {LuFolderPlus} from "react-icons/lu";
import {BsThreeDots} from "react-icons/bs";
import {FaUserClock} from "react-icons/fa";
import {FaClipboardQuestion} from "react-icons/fa6";
import {HiChatBubbleLeftRight} from "react-icons/hi2";

import {useUnresolvedMedicalCase} from "@/contexts/unresolved-medical-case";
import ActionCard from "@/components/action-card";
import DisabledOverlay from "@/components/ui/disabled-overlay";
import MedicalCasesTable from "@/components/medical-case/medical-case-table";

function MedicalCasePage() {
  const unresolvedMedicalCase = useUnresolvedMedicalCase();

  return (
      <div>
        <h1 className="font-bold text-2xl mb-6 lg:text-3xl">Medical Case</h1>
        <p className="text-xs mb-2 md:text-sm lg:text-base">
          You can create, view a medical case and much more...
        </p>

        {unresolvedMedicalCase.isLoading ? (
            <div className="grid place-content-center">
              <Spinner/>
            </div>
        ) : (
            <ul className="grid grid-cols-2 gap-1.5 md:gap-3 lg:grid-cols-4 xl:gap-4">
              <li>
                {unresolvedMedicalCase.medicalCase ? (
                    <DisabledOverlay
                        tooltipContent="You already have a medical case, please resolve it first">
                      <ActionCard
                          footer="Create"
                          href="/dashboard/patient/medical-case/create"
                          icon={<LuFolderPlus className="text-buttonText size-8"/>}
                          title="Medical Case"
                          variant={1}
                      />
                    </DisabledOverlay>
                ) : (
                    <ActionCard
                        footer="Create"
                        href="/dashboard/patient/medical-case/create"
                        icon={<LuFolderPlus className="text-buttonText size-8"/>}
                        title="Medical Case"
                        variant={1}
                    />
                )}
              </li>
              <li>
                {unresolvedMedicalCase.medicalCase ? (
                    <ActionCard
                        footer="Check for Cervical Cancer with AI"
                        href="/dashboard/patient/questionnaire/"
                        icon={<FaClipboardQuestion className="text-headline size-8"/>}
                        title="Questionnaire"
                        variant={2}
                    />
                ) : (
                    <DisabledOverlay tooltipContent="Please create a medical case first">
                      <ActionCard
                          footer="Check for Cervical Cancer with AI"
                          href="/dashboard/patient/questionnaire"
                          icon={
                            <FaClipboardQuestion className="text-headline size-8"/>
                          }
                          title="Questionnaire"
                          variant={2}
                      />
                    </DisabledOverlay>
                )}
              </li>
              <li>
                {unresolvedMedicalCase.medicalCase ? (
                    <ActionCard
                        footer={["View", "Create", "Update", "Cancel"]}
                        href="/dashboard/patient/appointment"
                        icon={<FaUserClock className="text-buttonText size-8"/>}
                        title="Appointment"
                        variant={3}
                    />
                ) : (
                    <DisabledOverlay tooltipContent="Please create a medical case first">
                      <ActionCard
                          footer={["View", "Create", "Update", "Cancel"]}
                          href="/dashboard/patient/appointment"
                          icon={<FaUserClock className="text-buttonText size-8"/>}
                          title="Appointment"
                          variant={3}
                      />
                    </DisabledOverlay>
                )}
              </li>
              <li>
                {unresolvedMedicalCase.medicalCase ? (
                    <ActionCard
                        footer="Chat with doctor handling your current case"
                        href="/dashboard/patient/chat"
                        icon={<HiChatBubbleLeftRight className="text-primary size-8"/>}
                        title="Chat with Doctor"
                        variant={4}
                    />
                ) : (
                    <DisabledOverlay tooltipContent="Please create a medical case first">
                      <ActionCard
                          footer="Chat with doctor handling your current case"
                          href="/dashboard/patient/chat"
                          icon={
                            <HiChatBubbleLeftRight className="text-primary size-8"/>
                          }
                          title="Chat with Doctor"
                          variant={4}
                      />
                    </DisabledOverlay>
                )}
              </li>
            </ul>
        )}

        <BsThreeDots className="mx-auto my-6 size-6"/>

        <h3 className="font-bold text-xl mb-3">All Your Medical Cases</h3>
        <MedicalCasesTable/>
      </div>
  );
}

export default MedicalCasePage;
