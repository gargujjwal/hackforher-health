import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import MedicalCasesTable from "@/components/medical-case/medical-case-table";
import H1 from "@/components/ui/h1";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { getMedicalCaseById } from "@/react-query/queries";
import Spinner from "@/components/ui/spinner";
import FormError from "@/components/ui/form-error";
import QuestionnaireTable from "@/components/questionnaire/questionnaire-table";
import AppointmentTable from "@/components/appointment/appointment-table";

function DoctorDashboard() {
  const { user } = useAuthenticatedUser();
  const [selectedMedicalCaseId, setSelectedMedicalCaseId] = useState<
    number | null
  >(null);
  const { data, status, error } = useQuery({
    ...getMedicalCaseById(selectedMedicalCaseId!),
    enabled() {
      return !!selectedMedicalCaseId;
    },
  });

  console.log(selectedMedicalCaseId);

  return (
    <div>
      <H1>Welcome Dr. {user.firstName}</H1>
      <p className="text-xs md:text-sm lg:text-base">
        Here, you can chat with your patients in real-time, set and manage
        appointments seamlessly, and review questionnaire submissions to gain
        valuable insights before consultations. Enjoy an organized, efficient
        workflow that helps you stay connected and informed for better
        healthcare outcomes.
      </p>

      <div className="mt-12 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Medical Cases Assigned to You
          </h2>
          <MedicalCasesTable
            selectedMedicalCaseId={selectedMedicalCaseId}
            strategy="doctor"
            onSelectMedicalCase={id => setSelectedMedicalCaseId(id)}
          />
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Questionnaire Submission of Selected Medical Case
          </h2>
          {selectedMedicalCaseId ? (
            <>
              {status === "pending" && <Spinner />}
              {status === "error" && <FormError message={error.message} />}
              {status === "success" && (
                <QuestionnaireTable
                  doctorAssignments={data.doctorAssignments}
                  patient={data.patient}
                  strategy="doctor"
                />
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400">
              Select a medical case from `Medical Case Table` to see
              questionnaire submissions in that medical case
            </p>
          )}
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Appointments of Selected Medical Case
          </h2>
          {selectedMedicalCaseId ? (
            <>
              {status === "pending" && <Spinner />}
              {status === "error" && <FormError message={error.message} />}
              {status === "success" && (
                <AppointmentTable medicalCase={data} strategy="doctor" />
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400">
              Select a medical case from `Medical Case Table` to see
              appointments scheduled in that medical case
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default DoctorDashboard;
