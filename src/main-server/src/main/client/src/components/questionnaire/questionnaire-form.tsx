import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FormEvent } from "react";

import FormError from "../ui/form-error";

import { getQuestionnaireQuery } from "@/react-query/queries";

type Props = Readonly<{
  onSubmit: (data: Record<number, string>) => void;
  isPending: boolean;
}>;

function QuestionnaireForm({ onSubmit, isPending }: Props) {
  const questionsQuery = useQuery({ ...getQuestionnaireQuery });

  const handleQuestionnaireSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    // Convert keys to numbers and set the type to Record<number, string>
    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [
        parseInt(key),
        value,
      ]),
    ) as Record<number, string>;

    onSubmit(payload);
  };

  switch (questionsQuery.status) {
    case "pending":
      return (
        <div className="grid place-content-center">
          <Spinner color="primary" />
        </div>
      );
    case "error":
      return <FormError message={questionsQuery.error.message} />;
    case "success":
      return (
        <form className="space-y-6" onSubmit={handleQuestionnaireSubmit}>
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
                          description={question.descriptionText}
                          label={question.text}
                          name={question.id.toString()}
                          placeholder={question.placeholderText}
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
                          description={question.descriptionText}
                          label={question.text}
                          name={question.id.toString()}
                          placeholder={question.placeholderText}
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
                          label={question.text}
                          name={question.id.toString()}
                          placeholder={question.placeholderText}
                          type="text"
                        />
                      );
                  }
                })}
              </div>
            </fieldset>
          ))}
          <Button
            fullWidth
            className="text-textPrimary"
            color="primary"
            isLoading={isPending}
            type="submit"
          >
            Get Prediction
          </Button>
        </form>
      );
  }
}

export default QuestionnaireForm;
