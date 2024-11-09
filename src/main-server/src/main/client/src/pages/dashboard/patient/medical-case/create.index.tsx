import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import DoctorPaginatedGrid from "@/components/medical-case/doctor-paginated-grid";
import FormError from "@/components/ui/form-error";
import { createMedicalCaseMut } from "@/react-query/mutations";
import { MedicalCaseCreationDto } from "@/types/backend-stubs";
import { ApiErrorCls, ValidationError } from "@/utils/error";
import { capitalize } from "@/utils/string";

function CreateMedicalCasePage() {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
    watch,
  } = useForm<MedicalCaseCreationDto>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createMedicalCaseMutation = useMutation({
    ...createMedicalCaseMut,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: createMedicalCaseMut.invalidateKeys,
      });
      toast.success("Medical case created successfully");
      navigate("/dashboard/patient/medical-case");
    },
    onError(error) {
      if (error instanceof ApiErrorCls) {
        setError("root", { message: error.message });
      } else if (error instanceof ValidationError) {
        Object.entries(error.validationErrors).forEach(([field, errMsg]) => {
          if (field === "id") {
            return setError("doctorAssignments", {
              message: "Select a doctor",
            });
          } else if (field === "caseDescription") {
            setError("caseDescription", {
              message: capitalize(errMsg),
            });
          } else {
            setError("root", { message: capitalize(errMsg) });
          }
        });
      }
    },
  });
  const handleDoctorChange = (doctorId: number) => {
    setValue("doctorAssignments.0.doctor.id", doctorId);
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">
        Create Medical Case
      </h1>

      <form
        onSubmit={handleSubmit(data => createMedicalCaseMutation.mutate(data))}
      >
        {errors.root && <FormError message={errors.root.message} />}
        <Controller
          control={control}
          name="caseDescription"
          render={({ fieldState, field: { value, onChange } }) => (
            <Textarea
              classNames={{ label: "text-xl" }}
              errorMessage={fieldState.error?.message}
              isInvalid={fieldState.invalid}
              label="Case Description"
              labelPlacement="outside"
              placeholder="Ex: medical difficulties you might be facing"
              value={value}
              onValueChange={onChange}
            />
          )}
        />
        <DoctorPaginatedGrid
          selectedId={watch("doctorAssignments.0.doctor.id")}
          onSelect={handleDoctorChange}
        />
        <Button
          fullWidth
          className="text-textPrimary"
          color="primary"
          isLoading={createMedicalCaseMutation.isPending}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateMedicalCasePage;
