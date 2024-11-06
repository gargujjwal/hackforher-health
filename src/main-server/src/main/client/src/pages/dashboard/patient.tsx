import {Spinner} from "@nextui-org/spinner";
import {BsThreeDots} from "react-icons/bs";
import {FaBriefcaseMedical, FaClipboardQuestion, FaUserClock,} from "react-icons/fa6";
import {HiChatBubbleLeftRight} from "react-icons/hi2";

import ActionCard from "@/components/action-card";
import {useAuth} from "@/contexts/auth-context";
import {useUnresolvedMedicalCase} from "@/contexts/unresolved-medical-case";
import DisabledOverlay from "@/components/ui/disabled-overlay";

function PatientDashboard() {
  const auth = useAuth();
  const unresolvedMedicalCase = useUnresolvedMedicalCase();

  if (auth.status !== "authenticated") {
    return null;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6 lg:text-3xl">
        Welcome {auth.user.firstName},
      </h1>
      <p className="text-xs mb-2 md:text-sm lg:text-base">
        What what would you like to do today,
      </p>

      {unresolvedMedicalCase.isLoading ? (
          <div className="grid place-content-center">
            <Spinner/>
          </div>
      ) : (
          <ul className="grid grid-cols-2 gap-1.5 md:gap-3 lg:grid-cols-4 xl:gap-4">
            <li>
              <ActionCard
                  footer={["View", "Create"]}
                  href="/dashboard/patient/medical-case"
                  icon={<FaBriefcaseMedical className="text-buttonText size-8"/>}
                  title="Medical Case"
                  variant={1}
              />
            </li>
            <li>
              {unresolvedMedicalCase.medicalCase ? (
                  <ActionCard
                      footer="Check for Cervical Cancer with AI"
                      href="/dashboard/patient/questionnaire"
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
      <BsThreeDots className="mx-auto my-6 size-6" />

      <h3 className="font-bold text-xl mb-3">How it works</h3>
      <ol className="list-decimal list-inside">
        <li>
          To consult with doctors available on the website, you have to create a
          medical case
        </li>
      </ol>
    </div>
  );
}

export default PatientDashboard;
