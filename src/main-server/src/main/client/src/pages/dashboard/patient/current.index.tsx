import { Tab, Tabs } from "@nextui-org/tabs";
import { useSearchParams } from "react-router-dom";

import FormError from "@/components/ui/form-error";
import H1 from "@/components/ui/h1";
import Spinner from "@/components/ui/spinner";
import { useUnresolvedMedicalCase } from "@/contexts/unresolved-medical-case";
import { ApiErrorCls } from "@/utils/error";
import DoctorAssignmentCarousel from "@/components/medical-case/doctor-assignment-carousel";
import ResolveMedicalCaseCard from "@/components/medical-case/resolve-medical-case-card";
import AppointmentCreateUpdateForm from "@/components/appointment/appointment-create-update-form";
import Link from "@/components/util/link";
import DoctorChangeForm from "@/components/medical-case/doctor-change-form";
import QuestionnaireTable from "@/components/questionnaire/questionnaire-table";
import AppointmentTable from "@/components/appointment/appointment-table";

function CurrentMedicalCasePage() {
  const { medicalCase, status, error } = useUnresolvedMedicalCase();
  const [searchParams] = useSearchParams({
    entitiesTab: "questionnaireSubmissions",
  });

  return (
    <div>
      <H1>Currently Active Medical Case</H1>
      {status === "pending" && <Spinner />}
      {status === "error" && <ErrorComp error={error} />}
      {status === "success" && (
        <>
          <div className="space-y-8 md:flex md:gap-8 md:space-y-0">
            <div className="w-full space-y-8">
              <section className="space-y-1.5">
                <h2 className="text-lg">Case Description</h2>
                <p className="text-sm">{medicalCase?.caseDescription}</p>
              </section>
              <section className="hidden md:block">
                <ResolveMedicalCaseCard medicalCase={medicalCase!} />
              </section>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg">Doctors Handling the case</h2>
              <DoctorAssignmentCarousel
                doctorAssignments={medicalCase!.doctorAssignments}
              />
            </div>

            <div className="md:hidden">
              <ResolveMedicalCaseCard medicalCase={medicalCase!} />
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
            <Tabs defaultSelectedKey={searchParams.get("entitiesTab")!}>
              <Tab
                key="questionnaireSubmissions"
                title="QuestionnaireSubmissions"
              >
                <QuestionnaireTable
                  doctorAssignments={medicalCase!.doctorAssignments}
                  patient={medicalCase!.patient}
                  strategy="patient"
                />
              </Tab>
              <Tab key="appointments" title="Appointments">
                <AppointmentTable
                  medicalCase={medicalCase!}
                  strategy="patient"
                />
              </Tab>
              <Tab key="changeDoctor" title="Change Doctor">
                <DoctorChangeForm />
              </Tab>
            </Tabs>
          </section>
        </>
      )}
    </div>
  );
}

function ErrorComp({ error }: { error: Error | null }) {
  let message: string = "Are you sure that you have an unresolved medical case";

  if (error instanceof ApiErrorCls) {
    message = error.description;
  }

  return <FormError message={message} />;
}

export default CurrentMedicalCasePage;
