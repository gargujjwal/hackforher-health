import { Tab, Tabs } from "@heroui/tabs";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";

import AppointmentCreateUpdateForm from "@/components/appointment/appointment-create-update-form";
import AppointmentTable from "@/components/appointment/appointment-table";
import Chat from "@/components/chat/chat";
import DoctorAssignmentCarousel from "@/components/medical-case/doctor-assignment-carousel";
import DoctorChangeForm from "@/components/medical-case/doctor-change-form";
import ResolveMedicalCaseCard from "@/components/medical-case/resolve-medical-case-card";
import QuestionnaireTable from "@/components/questionnaire/questionnaire-table";
import { MedicalCaseResponseDto } from "@/types/backend-stubs";
import { getHandlingDoctorAssignment } from "@/utils/logic";

type Props = { medicalCase: MedicalCaseResponseDto; activeEntityTab: string };

function MedicalCaseDetail({ medicalCase, activeEntityTab }: Props) {
  const navigate = useNavigate();
  const handlingDoctorAssignment = getHandlingDoctorAssignment(
    medicalCase.doctorAssignments,
  );

  return (
    <>
      <div className="space-y-8 md:flex md:gap-8 md:space-y-0">
        <div className="w-full space-y-8">
          <section className="space-y-1.5">
            <h2 className="text-lg">Case Description</h2>
            <p className="text-sm">{medicalCase.caseDescription}</p>
          </section>
          <section className="hidden md:block">
            <ResolveMedicalCaseCard medicalCase={medicalCase} />
          </section>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-lg">Doctors Handling the case</h2>
          <DoctorAssignmentCarousel
            doctorAssignments={medicalCase.doctorAssignments}
          />
        </div>

        <div className="md:hidden">
          <ResolveMedicalCaseCard medicalCase={medicalCase} />
        </div>
      </div>

      <section id="actions">
        <h3 className="my-4 text-lg font-bold">
          Actions You Can Take On This Case
        </h3>
        <Tabs>
          <Tab title="Create Appointment">
            <AppointmentCreateUpdateForm
              doctorAssignment={handlingDoctorAssignment}
              mode="create"
              onAppointmentChange={() => {}}
            />
          </Tab>
          <Tab title="Submit Questionnaire">
            <Button
              className="text-textPrimary"
              color="primary"
              onClick={() =>
                navigate("/dashboard/patient/questionnaire/respond")
              }
            >
              Visit Questionnaire to Submit your Response
            </Button>
          </Tab>

          <Tab title="Change Doctor">
            <DoctorChangeForm
              handlingDoctorAssignment={handlingDoctorAssignment}
              medicalCaseId={medicalCase.id}
            />
          </Tab>
        </Tabs>
      </section>

      <section className="mt-8" id="entities">
        <h3 className="mb-4 text-lg font-bold">
          Entities Associated With Your Case
        </h3>
        <Tabs defaultSelectedKey={activeEntityTab}>
          <Tab key="questionnaireSubmissions" title="QuestionnaireSubmissions">
            <QuestionnaireTable
              doctorAssignments={medicalCase.doctorAssignments}
              patient={medicalCase.patient}
              strategy="patient"
            />
          </Tab>
          <Tab key="appointments" title="Appointments">
            <AppointmentTable medicalCase={medicalCase} strategy="patient" />
          </Tab>
          <Tab key="chat" title="Chat With Doctor">
            <Chat doctorAssignmentId={handlingDoctorAssignment.id} />
          </Tab>
        </Tabs>
      </section>
    </>
  );
}

export default MedicalCaseDetail;
