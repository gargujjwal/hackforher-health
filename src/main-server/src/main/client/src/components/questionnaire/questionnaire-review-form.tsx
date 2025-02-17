import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import FormError from "../ui/form-error";

import { reviewQuestionnaireSubmissionMut } from "@/react-query/mutations";
import { QuestionnaireReviewDto } from "@/types/backend-stubs";
import { ApiErrorCls, ValidationError } from "@/utils/error";
import { capitalize } from "@/utils/string";

type Props = { questionnaireSubmissionId: number };

function QuestionnaireReviewForm({ questionnaireSubmissionId }: Props) {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<QuestionnaireReviewDto>();
  const questionnareiReviewMutationObject = reviewQuestionnaireSubmissionMut(
    questionnaireSubmissionId,
  );
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    ...questionnareiReviewMutationObject,
    onSuccess() {
      toast.success(
        "You have successfully reviewed this questionnaire submission",
      );
      queryClient.invalidateQueries({
        queryKey: questionnareiReviewMutationObject.invalidateKeys,
      });
      navigate("/dashboard/doctor");
    },
    onError(error) {
      if (error instanceof ApiErrorCls) {
        setError("root", { message: error.message });
      } else if (error instanceof ValidationError) {
        Object.entries(error.validationErrors).forEach(([field, errMsg]) => {
          setError(field as keyof QuestionnaireReviewDto, {
            message: capitalize(errMsg),
          });
        });
      }
    },
  });

  return (
    <Card as="form" onSubmit={handleSubmit(data => mutate(data))}>
      <CardHeader>
        <h1 className="text-lg font-bold">Review Form</h1>
      </CardHeader>
      <CardBody>
        {errors.root && <FormError message={errors.root.message} />}
        <Controller
          control={control}
          name="reviewStatus"
          render={({ fieldState, field: { value, onChange } }) => (
            <RadioGroup
              classNames={{
                wrapper: "flex flex-row gap-3 mb-6",
              }}
              color="primary"
              errorMessage={fieldState?.error?.message}
              isInvalid={fieldState?.invalid}
              label="Your Verdict"
              value={value}
              onValueChange={onChange}
            >
              <Radio
                key="CORRECT"
                classNames={{
                  base: "inline-flex m-0 items-center justify-between flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-3 border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 data-[selected=true]:bg-emerald-500",
                  label:
                    "capitalize text-emerald-700 group-data-[selected=true]:text-white group-data-[selected=true]:font-bold",
                  wrapper:
                    "group-data-[selected=true]:bg-white group-data-[selected=true]:border-emerald-300",
                }}
                value="CORRECT"
              >
                Correct
              </Radio>
              <Radio
                key="WRONG"
                classNames={{
                  base: "inline-flex m-0 items-center justify-between flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-3 border-2 border-red-500 bg-red-50 hover:bg-red-100 data-[selected=true]:bg-red-500",
                  label:
                    "capitalize text-red-700 group-data-[selected=true]:text-white group-data-[selected=true]:font-bold",
                  wrapper:
                    "group-data-[selected=true]:bg-white group-data-[selected=true]:border-red-300",
                }}
                value="WRONG"
              >
                Wrong
              </Radio>
              <Radio
                key="NEEDS_DISCUSSION"
                classNames={{
                  base: "inline-flex m-0 items-center justify-between flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-3 border-2 border-amber-500 bg-amber-50 hover:bg-amber-100 data-[selected=true]:bg-amber-500",
                  label:
                    "capitalize text-amber-700 group-data-[selected=true]:text-white group-data-[selected=true]:font-bold",
                  wrapper:
                    "group-data-[selected=true]:bg-white group-data-[selected=true]:border-amber-300",
                }}
                value="NEEDS_DISCUSSION"
              >
                Needs Discussion
              </Radio>
            </RadioGroup>
          )}
        />
        <Controller
          control={control}
          name="doctorNotes"
          render={({ fieldState, field: { value, onChange } }) => (
            <Textarea
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              label="Additional Notes"
              labelPlacement="outside"
              placeholder="Ex: Review added depends on many things..."
              type="text"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
      </CardBody>
      <CardFooter>
        <Button
          fullWidth
          className="text-textPrimary"
          color="primary"
          isLoading={isPending}
          type="submit"
        >
          Submit your Review
        </Button>
      </CardFooter>
    </Card>
  );
}

export default QuestionnaireReviewForm;
