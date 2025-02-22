import { BsThreeDots } from "react-icons/bs";
import { FaUserClock } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { LuFolderPlus } from "react-icons/lu";

import ActionCard from "@/components/action-card";
import MedicalCasesTable from "@/components/medical-case/medical-case-table";
import DisabledOverlay from "@/components/ui/disabled-overlay";
import Spinner from "@/components/ui/spinner";
import { useUnresolvedMedicalCase } from "@/contexts/unresolved-medical-case";
import H1 from "@/components/ui/h1";
import { useAuthenticatedUser } from "@/contexts/auth-context";

function PatientDashboard() {
  const unresolvedMedicalCase = useUnresolvedMedicalCase();
  const { user } = useAuthenticatedUser();

  return (
    <div>
      <H1>Welcome {user.firstName}</H1>
      <p className="mb-2 text-xs md:text-sm lg:text-base">
        What what would you like to do today,
      </p>

      {unresolvedMedicalCase.status === "pending" ? (
        <Spinner />
      ) : (
        <ul className="grid grid-cols-2 gap-1.5 md:gap-3 lg:grid-cols-4 xl:gap-4">
          <li>
            {unresolvedMedicalCase.medicalCase ? (
              <DisabledOverlay tooltipContent="You already have a medical case, please resolve it first">
                <ActionCard
                  footer="Create"
                  href="/dashboard/patient/medical-case/create"
                  icon={<LuFolderPlus className="size-8 text-buttonText" />}
                  title="Medical Case"
                  variant={1}
                />
              </DisabledOverlay>
            ) : (
              <ActionCard
                footer="Create"
                href="/dashboard/patient/medical-case/create"
                icon={<LuFolderPlus className="size-8 text-buttonText" />}
                title="Medical Case"
                variant={1}
              />
            )}
          </li>
          <li>
            {unresolvedMedicalCase.medicalCase ? (
              <ActionCard
                footer="Check for Cervical Cancer with AI"
                href="/dashboard/patient/questionnaire/respond"
                icon={<FaClipboardQuestion className="size-8 text-headline" />}
                title="Questionnaire"
                variant={2}
              />
            ) : (
              <DisabledOverlay tooltipContent="Please create a medical case first">
                <ActionCard
                  footer="Check for Cervical Cancer with AI"
                  href="/dashboard/patient/questionnaire/respond"
                  icon={
                    <FaClipboardQuestion className="size-8 text-headline" />
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
                href="/dashboard/patient/medical-case/current?entitiesTab=appointments#entities"
                icon={<FaUserClock className="size-8 text-buttonText" />}
                title="Appointment"
                variant={3}
              />
            ) : (
              <DisabledOverlay tooltipContent="Please create a medical case first">
                <ActionCard
                  footer={["View", "Create", "Update", "Cancel"]}
                  href="/dashboard/patient/medical-case/current?entitiesTab=appointments#entities"
                  icon={<FaUserClock className="size-8 text-buttonText" />}
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
                href="/dashboard/patient/medical-case/current?entitiesTab=chat#entities"
                icon={<HiChatBubbleLeftRight className="size-8 text-primary" />}
                title="Chat with Doctor"
                variant={4}
              />
            ) : (
              <DisabledOverlay tooltipContent="Please create a medical case first">
                <ActionCard
                  footer="Chat with doctor handling your current case"
                  href="/dashboard/patient/medical-case/current?entitiesTab=chat#entities"
                  icon={
                    <HiChatBubbleLeftRight className="size-8 text-primary" />
                  }
                  title="Chat with Doctor"
                  variant={4}
                />
              </DisabledOverlay>
            )}
          </li>
        </ul>
      )}

      <BsThreeDots className="mx-auto my-6 size-6" />

      <h3 className="mb-3 text-xl font-bold">All Your Medical Cases</h3>
      <MedicalCasesTable strategy="patient" />
    </div>
  );
}

export default PatientDashboard;
