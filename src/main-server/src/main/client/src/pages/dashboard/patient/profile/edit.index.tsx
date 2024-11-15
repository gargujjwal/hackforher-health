import { useQuery } from "@tanstack/react-query";

import PatientProfileEditForm from "@/components/patient-profile-edit-form";
import FormError from "@/components/ui/form-error";
import Spinner from "@/components/ui/spinner";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import { getPatientProfileById } from "@/react-query/queries";

function PatientProfileEditPage() {
  const { user } = useAuthenticatedUser();
  const {
    data: patientProfile,
    error,
    status,
  } = useQuery({
    ...getPatientProfileById(user.id),
  });

  switch (status) {
    case "pending":
      return <Spinner />;
    case "error":
      return <FormError message={error.message} />;
    case "success":
      return <PatientProfileEditForm profile={patientProfile} />;
  }
}

export default PatientProfileEditPage;
