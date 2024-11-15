import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getPatientProfileById } from "@/react-query/queries";
import PatientProfile from "@/components/patient-profile";
import FormError from "@/components/ui/form-error";
import LoadingScreen from "@/components/ui/loading-screen";

function PatientProfilePage() {
  const { patientId } = useParams();
  const { status, data, error } = useQuery({
    ...getPatientProfileById(Number(patientId)),
  });

  switch (status) {
    case "pending":
      return <LoadingScreen />;
    case "error":
      return <FormError message={error?.message} />;
    case "success":
      return <PatientProfile patientProfile={data} />;
  }
}

export default PatientProfilePage;
