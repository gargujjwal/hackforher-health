import {useQuery} from "@tanstack/react-query";

import DoctorProfile from "@/components/doctor-profile";
import FormError from "@/components/ui/form-error";
import LoadingScreen from "@/components/ui/loading-screen";
import {useAuthenticatedUser} from "@/contexts/auth-context";
import {getDoctorProfileById} from "@/react-query/queries";

function AuthenticatedDoctorProfilePage() {
  const {user} = useAuthenticatedUser();
  const {status, data, error} = useQuery({
    ...getDoctorProfileById(user.id),
  });

  switch (status) {
    case "pending":
      return <LoadingScreen/>;
    case "error":
      return <FormError message={error?.message}/>;
    case "success":
      return <DoctorProfile doctorProfile={data}/>;
  }
}

export default AuthenticatedDoctorProfilePage;
