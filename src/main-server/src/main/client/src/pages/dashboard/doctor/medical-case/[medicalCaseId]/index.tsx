import { Tab, Tabs } from "@heroui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import AppointmentTable from "@/components/appointment/appointment-table";
import PatientCard from "@/components/card/patient-card";
import Chat from "@/components/chat/chat";
import DoctorAssignmentCarousel from "@/components/medical-case/doctor-assignment-carousel";
import QuestionnaireTable from "@/components/questionnaire/questionnaire-table";
import FormError from "@/components/ui/form-error";
import H1 from "@/components/ui/h1";
import Spinner from "@/components/ui/spinner";
import { getMedicalCaseById } from "@/react-query/queries";
import { getHandlingDoctorAssignment } from "@/utils/logic";

function DoctorMedicalCaseDetailPage() {
  const { medicalCaseId } = useParams();
  const {
    data: medicalCase,
    status,
    error,
  } = useQuery({ ...getMedicalCaseById(Number(medicalCaseId)) });

  switch (status) {
    case "pending":
      return <Spinner />;
    case "error":
      return <FormError message={error.message} />;
    case "success":
      return (
        <>
          <H1>Medical Case #{medicalCase.id}</H1>
          <div className="space-y-8 md:flex md:gap-8 md:space-y-0">
            <div className="w-full space-y-8">
              <section className="space-y-1.5">
                <h2 className="text-lg">Case Description</h2>
                <p className="text-sm">{medicalCase.caseDescription}</p>
              </section>
              <section className="hidden md:block">
                <h2 className="text-lg">Doctors Handling the case</h2>
                <DoctorAssignmentCarousel
                  doctorAssignments={medicalCase.doctorAssignments}
                />
              </section>
            </div>

            <div className="flex items-center space-y-1.5">
              <PatientCard patient={medicalCase.patient} />
            </div>

            <div className="md:hidden">
              <h2 className="text-lg">Doctors Handling the case</h2>
              <DoctorAssignmentCarousel
                doctorAssignments={medicalCase.doctorAssignments}
              />
            </div>
          </div>

          <section className="mt-8" id="entities">
            <h3 className="mb-4 text-lg font-bold">
              Entities Associated With Your Case
            </h3>
            <Tabs>
              <Tab
                key="questionnaireSubmissions"
                title="Questionnaire Submissions"
              >
                <QuestionnaireTable
                  doctorAssignments={medicalCase.doctorAssignments}
                  patient={medicalCase.patient}
                  strategy="doctor"
                />
              </Tab>
              <Tab key="appointments" title="Appointments">
                <AppointmentTable medicalCase={medicalCase} strategy="doctor" />
              </Tab>
              <Tab key="chat" title="Chat With Patient">
                <Chat
                  doctorAssignmentId={
                    getHandlingDoctorAssignment(medicalCase.doctorAssignments)
                      .id
                  }
                />
              </Tab>
            </Tabs>
          </section>
        </>
      );
  }
}

export default DoctorMedicalCaseDetailPage;
