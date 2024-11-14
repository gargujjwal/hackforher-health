import {useQuery} from "@tanstack/react-query";

import DoctorProfileEditForm from "@/components/doctor-profile-edit-form";
import FormError from "@/components/ui/form-error";
import Spinner from "@/components/ui/spinner";
import {useAuthenticatedUser} from "@/contexts/auth-context";
import {getDoctorProfileById} from "@/react-query/queries";

function DoctorProfileEditPage() {
  const {user} = useAuthenticatedUser();
  const {
    data: doctorProfile,
    status,
    error,
  } = useQuery({
    ...getDoctorProfileById(user.id),
  });

  switch (status) {
    case "pending":
      return <Spinner/>;
    case "error":
      return <FormError message={error.message}/>;
    case "success":
      return <DoctorProfileEditForm profile={doctorProfile}/>;
  }
}

export default DoctorProfileEditPage;
