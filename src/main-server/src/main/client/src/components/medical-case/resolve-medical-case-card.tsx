import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

import { markMedicalCaseAsResolvedMut } from "@/react-query/mutations";
import { MedicalCaseResponseDto } from "@/types/backend-stubs";

function ResolveMedicalCaseCard({
  medicalCase,
}: {
  medicalCase: MedicalCaseResponseDto;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutationObj = markMedicalCaseAsResolvedMut(medicalCase.id);
  const markCaseAsResolvedMutation = useMutation({
    ...mutationObj,
    onSuccess: () => {
      toast.success("Case resolved successfully");
      queryClient.invalidateQueries({ queryKey: mutationObj.invalidateKeys });
      navigate("/dashboard/patient");
    },
  });

  return medicalCase.isResolved ? (
    <Card className="flex-row bg-success font-bold text-textPrimary">
      <CardBody className="flex-row items-center justify-center gap-1">
        <p> Case is resolved </p>
        <TiTick className="size-6" />
      </CardBody>
    </Card>
  ) : (
    <Card className="bg-primary text-textPrimary md:flex-row md:gap-4">
      <CardBody className="flex-grow md:justify-center">
        <p>
          Do you think its time to resolve this case? If{" "}
          <b className="font-bold">yes</b> click `Resolve Case` button
        </p>
      </CardBody>
      <CardFooter className="md:w-max">
        <Button
          className="mx-auto md:hidden"
          color="danger"
          isLoading={markCaseAsResolvedMutation.isPending}
          onClick={() => markCaseAsResolvedMutation.mutate()}
        >
          Resolve Case
        </Button>
        <Button
          className="ml-auto hidden px-12 md:flex"
          color="danger"
          isLoading={markCaseAsResolvedMutation.isPending}
          size="lg"
          onClick={() => markCaseAsResolvedMutation.mutate()}
        >
          Resolve Case
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ResolveMedicalCaseCard;
