import { Tab, Tabs } from "@nextui-org/tabs";

import AppointmentCreateUpdateForm from "@/components/appointment/appointment-create-update-form";
import AppointmentTable from "@/components/appointment/appointment-table";
import Chat from "@/components/chat/chat";
import DoctorAssignmentCarousel from "@/components/medical-case/doctor-assignment-carousel";
import DoctorChangeForm from "@/components/medical-case/doctor-change-form";
import ResolveMedicalCaseCard from "@/components/medical-case/resolve-medical-case-card";
import QuestionnaireTable from "@/components/questionnaire/questionnaire-table";
import Link from "@/components/util/link";
import { MedicalCaseResponseDto } from "@/types/backend-stubs";

type Props = { medicalCase: MedicalCaseResponseDto; activeEntityTab: string };

function MedicalCaseDetail({ medicalCase, activeEntityTab }: Props) {
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
        <h3 className="mb-4 text-lg font-bold">
          Actions You Can Take On This Case
        </h3>
        <Tabs>
          <Tab title="Create Appointment">
            <AppointmentCreateUpdateForm mode="create" />
          </Tab>
          <Tab
            as={Link}
            href="/dashboard/patient/questionnaire"
            title="Submit Questionnaire"
          />
          <Tab title="Change Doctor">
            <DoctorChangeForm />
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
            <Chat />
          </Tab>
        </Tabs>
      </section>
    </>
  );
}

export default MedicalCaseDetail;
