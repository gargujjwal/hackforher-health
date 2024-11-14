import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";

import QuestionnaireForm from "@/components/questionnaire/questionnaire-form";
import QuestionnaireReviewForm from "@/components/questionnaire/questionnaire-review-form";
import FormError from "@/components/ui/form-error";
import H1 from "@/components/ui/h1";
import Spinner from "@/components/ui/spinner";
import {getQuestionnaireSubmissionById} from "@/react-query/queries";

function QuestionnaireSubmissionReviewPage() {
  const {questionnaireSubmissionId} = useParams();
  const {data, status, error} = useQuery({
    ...getQuestionnaireSubmissionById(Number(questionnaireSubmissionId)),
  });

  return (
      <div>
        <H1>Review Questionnaire</H1>
        {status === "pending" && <Spinner/>}
        {status === "error" && <FormError message={error.message}/>}
        {status === "success" && (
            <QuestionnaireForm response={data} strategy="show"/>
        )}

        <div className="mt-12">
          <QuestionnaireReviewForm
              questionnaireSubmissionId={Number(questionnaireSubmissionId)}
          />
        </div>
      </div>
  );
}

export default QuestionnaireSubmissionReviewPage;
