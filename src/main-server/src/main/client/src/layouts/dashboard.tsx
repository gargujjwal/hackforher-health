import {Outlet} from "react-router-dom";

import {useAuth} from "@/contexts/auth-context";
import {UnResolvedMedicalCaseProvider} from "@/contexts/unresolved-medical-case";

function DashboardLayout() {
  const auth = useAuth();

  if (auth.status !== "authenticated") {
    return null;
  }

  if (auth.user.role === "PATIENT") {
    return (
        <UnResolvedMedicalCaseProvider patientId={auth.user.id}>
          <Outlet/>
        </UnResolvedMedicalCaseProvider>
    );
  }

  return <Outlet/>;
}

export default DashboardLayout;
