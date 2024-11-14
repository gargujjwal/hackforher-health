import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";
import {useQuery} from "@tanstack/react-query";
import {FormEvent} from "react";
import {FaDownload} from "react-icons/fa6";
import {Margin, usePDF} from "react-to-pdf";

import FormError from "../ui/form-error";

import ModelPredictionCard from "./model-prediction-card";
import ReviewStatusCard from "./review-status-card";

import Spinner from "@/components/ui/spinner";
import {getQuestionnaireQuery} from "@/react-query/queries";
import {QuestionnaireSubmissionResponseDto} from "@/types/backend-stubs";

type Props =
    | {
  strategy: "create";
  onSubmit: (data: Record<number, string>) => void;
  isPending: boolean;
}
    | { strategy: "show"; response: QuestionnaireSubmissionResponseDto };

function QuestionnaireForm(props: Props) {
  const questionsQuery = useQuery({...getQuestionnaireQuery});
  const {toPDF, targetRef} = usePDF({
    filename: "medical-questionnaire-response.pdf",
    page: {margin: Margin.MEDIUM},
  });

  function handleQuestionnaireSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    // Convert keys to numbers and set the type to Record<number, string>
    const payload = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [
          parseInt(key),
          value,
        ]),
    ) as Record<number, string>;

    if (props.strategy === "create") {
      props.onSubmit(payload);
    }
  }

  switch (questionsQuery.status) {
    case "pending":
      return <Spinner/>;
    case "error":
      return <FormError message={questionsQuery.error.message}/>;
    case "success":
      return (
          <form
              ref={targetRef}
              className="space-y-6"
              onSubmit={handleQuestionnaireSubmit}
          >
            {props.strategy === "show" && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <ModelPredictionCard
                      modelPrediction={props.response.modelPrediction}
                  />
                  <ReviewStatusCard
                      doctorNotes={props.response.doctorNotes}
                      reviewStatus={props.response.reviewStatus}
                  />
                </div>
            )}
            {props.strategy === "show" && (
                <h2 className="text-xl font-semibold">Your Submission</h2>
            )}
            {questionsQuery.data.map(section => (
                <fieldset
                    key={section.id}
                    className="rounded-md border border-gray-300 p-4"
                >
                  <legend className="px-2 text-lg font-semibold">
                    {section.title}
                  </legend>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {section.questions.map(question => {
                      switch (question.type) {
                        case "MCQ":
                          return (
                              <Select
                                  key={question.id}
                                  isRequired
                                  required
                                  className="max-w-xs"
                                  defaultSelectedKeys={
                                    props.strategy === "show"
                                        ? props.response.questionResponses[question.id]
                                        : undefined
                                  }
                                  description={question.descriptionText}
                                  disabled={props.strategy === "show"}
                                  label={question.text}
                                  name={question.id.toString()}
                                  placeholder={question.placeholderText}
                                  value={
                                    props.strategy === "show"
                                        ? props.response.questionResponses[question.id]
                                        : undefined
                                  }
                              >
                                {question.options!.map((option, i) => (
                                    <SelectItem key={i} value={option}>
                                      {option}
                                    </SelectItem>
                                ))}
                              </Select>
                          );
                        case "BOOLEAN":
                          return (
                              <Select
                                  key={question.id}
                                  isRequired
                                  required
                                  className="max-w-xs"
                                  defaultSelectedKeys={
                                    props.strategy === "show"
                                        ? props.response.questionResponses[question.id]
                                        : undefined
                                  }
                                  description={question.descriptionText}
                                  disabled={props.strategy === "show"}
                                  label={question.text}
                                  name={question.id.toString()}
                                  placeholder={question.placeholderText}
                                  value={
                                    props.strategy === "show"
                                        ? props.response.questionResponses[question.id]
                                        : undefined
                                  }
                              >
                                <SelectItem key="1" value="1">
                                  Yes
                                </SelectItem>
                                <SelectItem key="0" value="0">
                                  No
                                </SelectItem>
                              </Select>
                          );
                        case "OPEN_ENDED":
                          return (
                              <Input
                                  key={question.id}
                                  isRequired
                                  required
                                  className="max-w-xs"
                                  description={question.descriptionText}
                                  disabled={props.strategy === "show"}
                                  label={question.text}
                                  name={question.id.toString()}
                                  placeholder={question.placeholderText}
                                  type="text"
                                  value={
                                    props.strategy === "show"
                                        ? props.response.questionResponses[question.id]
                                        : undefined
                                  }
                              />
                          );
                      }
                    })}
                  </div>
                </fieldset>
            ))}
            {props.strategy === "show" ? (
                <Button
                    fullWidth
                    className="text-textPrimary"
                    color="primary"
                    startContent={<FaDownload/>}
                    onClick={() => toPDF()}
                >
                  Download Report as PDF
                </Button>
            ) : (
                <Button
                    fullWidth
                    className="text-textPrimary"
                    color="primary"
                    isLoading={props.isPending}
                    type="submit"
                >
                  Get Prediction
                </Button>
            )}
          </form>
      );
  }
}

export default QuestionnaireForm;
