import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import DoctorProfile from "@/components/doctor-profile";
import FormError from "@/components/ui/form-error";
import Spinner from "@/components/ui/spinner";
import { getDoctorProfileById } from "@/react-query/queries";

function DoctorProfilePage() {
  const { doctorId } = useParams();
  const {
    status,
    data: profile,
    error,
  } = useQuery({
    ...getDoctorProfileById(Number(doctorId)),
  });

  switch (status) {
    case "pending":
      return <Spinner />;
    case "error":
      return <FormError message={error?.message} />;
    case "success":
      return <DoctorProfile doctorProfile={profile} />;
  }
}

export default DoctorProfilePage;
