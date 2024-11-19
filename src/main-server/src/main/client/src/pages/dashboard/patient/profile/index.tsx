import { useQuery } from "@tanstack/react-query";

import PatientProfile from "@/components/patient-profile";
import FormError from "@/components/ui/form-error";
import LoadingScreen from "@/components/ui/loading-screen";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { getPatientProfileById } from "@/react-query/queries";

function AuthenticatedPatientProfilePage() {
  const { user } = useAuthenticatedUser();
  const { status, data, error } = useQuery({
    ...getPatientProfileById(user.id),
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

export default AuthenticatedPatientProfilePage;
