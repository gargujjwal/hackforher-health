import {useSearchParams} from "react-router-dom";

import FormError from "@/components/ui/form-error";
import H1 from "@/components/ui/h1";
import Spinner from "@/components/ui/spinner";
import {useUnresolvedMedicalCase} from "@/contexts/unresolved-medical-case";
import {ApiErrorCls} from "@/utils/error";
import MedicalCaseDetail from "@/components/medical-case/medical-case-detail";

function CurrentMedicalCasePage() {
  const {medicalCase, status, error} = useUnresolvedMedicalCase();
  const [searchParams] = useSearchParams({
    entitiesTab: "questionnaireSubmissions",
  });

  return (
      <div>
        <H1>Currently Active Medical Case</H1>
        {status === "pending" && <Spinner/>}
        {status === "error" && <ErrorComp error={error}/>}
        {status === "success" && (
            <MedicalCaseDetail
                activeEntityTab={searchParams.get("entitiesTab")!}
                medicalCase={medicalCase!}
            />
        )}
      </div>
  );
}

function ErrorComp({error}: { error: Error | null }) {
  let message: string = "Are you sure that you have an unresolved medical case";

  if (error instanceof ApiErrorCls) {
    message = error.description;
  }

  return <FormError message={message}/>;
}

export default CurrentMedicalCasePage;
