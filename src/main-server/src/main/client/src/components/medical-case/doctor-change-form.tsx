import { Button } from "@nextui-org/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import DoctorPaginatedGrid from "./doctor-paginated-grid";

import { assignDoctorToMedicalCaseMut } from "@/react-query/mutations";
import {
  DoctorAssignmentCreationDto,
  MedicalCaseResponseDto,
} from "@/types/backend-stubs";
import { ApiErrorCls, ValidationError } from "@/utils/error";
import { capitalize } from "@/utils/string";

type Props = {
  medicalCaseId: number;
  handlingDoctorAssignment: MedicalCaseResponseDto["doctorAssignments"][0];
};

function DoctorChangeForm({ medicalCaseId, handlingDoctorAssignment }: Props) {
  const queryClient = useQueryClient();
  const assignDoctorToMedicalCaseMutationObj =
    assignDoctorToMedicalCaseMut(medicalCaseId);
  const { mutate, isPending } = useMutation({
    ...assignDoctorToMedicalCaseMutationObj,
    onSuccess() {
      toast.success("Doctor assigned successfully");
      reset();
      queryClient.invalidateQueries({
        queryKey: assignDoctorToMedicalCaseMutationObj.invalidateKeys,
      });
    },
    onError(error) {
      if (error instanceof ApiErrorCls) {
        setError("root", { message: error.message });
      } else if (error instanceof ValidationError) {
        let errorMsg = "";

        Object.entries(error.validationErrors).forEach(([_, errMsg]) => {
          errorMsg += capitalize(errMsg);
        });

        setError("root", { message: capitalize(errorMsg) });
      }
    },
  });
  const { watch, setValue, reset, handleSubmit, setError } =
    useForm<DoctorAssignmentCreationDto>({
      defaultValues: { doctorId: handlingDoctorAssignment.doctor.id },
    });

  return (
    <form onSubmit={handleSubmit(data => mutate(data))}>
      <DoctorPaginatedGrid
        selectedId={watch("doctorId")}
        onSelect={doctorId => setValue("doctorId", doctorId)}
      />
      <Button
        fullWidth
        className="text-textPrimary"
        color="primary"
        isLoading={isPending}
        type="submit"
      >
        Replace Doctor
      </Button>
    </form>
  );
}

export default DoctorChangeForm;
