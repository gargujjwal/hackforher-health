import { BsThreeDots } from "react-icons/bs";
import {
  FaBriefcaseMedical,
  FaClipboardQuestion,
  FaUserClock,
} from "react-icons/fa6";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

import ActionCard from "@/components/action-card";
import DisabledOverlay from "@/components/ui/disabled-overlay";
import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/contexts/auth-context";
import { useUnresolvedMedicalCase } from "@/contexts/unresolved-medical-case";

function PatientDashboard() {
  const auth = useAuth();
  const unresolvedMedicalCase = useUnresolvedMedicalCase();

  if (auth.status !== "authenticated") {
    return null;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">
        Welcome {auth.user.firstName},
      </h1>
      <p className="mb-2 text-xs md:text-sm lg:text-base">
        What what would you like to do today,
      </p>

      {unresolvedMedicalCase.status === "pending" ? (
        <Spinner />
      ) : (
        <ul className="grid grid-cols-2 gap-1.5 md:gap-3 lg:grid-cols-4 xl:gap-4">
          <li>
            <ActionCard
              footer={["View", "Create"]}
              href="/dashboard/patient/medical-case"
              icon={<FaBriefcaseMedical className="size-8 text-buttonText" />}
              title="Medical Case"
              variant={1}
            />
          </li>
          <li>
            {unresolvedMedicalCase.medicalCase ? (
              <ActionCard
                footer="Check for Cervical Cancer with AI"
                href="/dashboard/patient/questionnaire"
                icon={<FaClipboardQuestion className="size-8 text-headline" />}
                title="Questionnaire"
                variant={2}
              />
            ) : (
              <DisabledOverlay tooltipContent="Please create a medical case first">
                <ActionCard
                  footer="Check for Cervical Cancer with AI"
                  href="/dashboard/patient/questionnaire"
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
                href="/dashboard/patient/appointment"
                icon={<FaUserClock className="size-8 text-buttonText" />}
                title="Appointment"
                variant={3}
              />
            ) : (
              <DisabledOverlay tooltipContent="Please create a medical case first">
                <ActionCard
                  footer={["View", "Create", "Update", "Cancel"]}
                  href="/dashboard/patient/appointment"
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
                href="/dashboard/patient/chat"
                icon={<HiChatBubbleLeftRight className="size-8 text-primary" />}
                title="Chat with Doctor"
                variant={4}
              />
            ) : (
              <DisabledOverlay tooltipContent="Please create a medical case first">
                <ActionCard
                  footer="Chat with doctor handling your current case"
                  href="/dashboard/patient/chat"
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

      <h3 className="mb-3 text-xl font-bold">How it works</h3>
      <ol className="list-inside list-decimal">
        <li>
          To consult with doctors available on the website, you have to create a
          medical case
        </li>
      </ol>
    </div>
  );
}

export default PatientDashboard;
