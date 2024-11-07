import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import QuestionnaireForm from "@/components/questionnaire/questionnaire-form";
import FormError from "@/components/ui/form-error";
import H1 from "@/components/ui/h1";
import { getQuestionnaireSubmissionById } from "@/react-query/queries";

function QuestionnaireSubmissionViewPage() {
  const { questionnaireSubmissionId } = useParams();
  const submissionQuery = useQuery({
    ...getQuestionnaireSubmissionById(Number(questionnaireSubmissionId)),
  });

  switch (submissionQuery.status) {
    case "pending":
      return (
        <div className="grid place-content-center">
          <Spinner />
        </div>
      );
    case "error":
      return <FormError message={submissionQuery.error.message} />;
    case "success":
      return (
        <div>
          <H1>Questionnaire Submission #{submissionQuery.data.id}</H1>
          <QuestionnaireForm response={submissionQuery.data} strategy="show" />
        </div>
      );
  }
}

export default QuestionnaireSubmissionViewPage;
