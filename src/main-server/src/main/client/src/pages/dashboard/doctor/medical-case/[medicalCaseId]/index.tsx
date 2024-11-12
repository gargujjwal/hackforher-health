import { useParams } from "react-router-dom";

function DoctorMedicalCaseDetailPage() {
  const { medicalCaseId } = useParams();

  return <div>DoctorMedicalCaseDetailPage</div>;
}

export default DoctorMedicalCaseDetailPage;
