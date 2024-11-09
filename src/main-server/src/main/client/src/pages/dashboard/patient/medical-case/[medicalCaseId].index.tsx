import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

import MedicalCaseDetail from "@/components/medical-case/medical-case-detail";
import FormError from "@/components/ui/form-error";
import H1 from "@/components/ui/h1";
import Spinner from "@/components/ui/spinner";
import { getMedicalCaseById } from "@/react-query/queries";

function MedicalCaseDetailPage() {
  const { medicalCaseId } = useParams();
  const [searchParams] = useSearchParams({
    entitiesTab: "questionnaireSubmissions",
  });
  const medicalCase = useQuery({
    ...getMedicalCaseById(parseInt(medicalCaseId!)),
  });

  return (
    <div>
      <H1>Medical Case #{medicalCaseId}</H1>
      {medicalCase.isLoading && <Spinner />}
      {medicalCase.isError && <FormError message={medicalCase.error.message} />}
      {medicalCase.isSuccess && (
        <MedicalCaseDetail
          activeEntityTab={searchParams.get("entitiesTab")!}
          medicalCase={medicalCase.data}
        />
      )}
    </div>
  );
}

export default MedicalCaseDetailPage;
