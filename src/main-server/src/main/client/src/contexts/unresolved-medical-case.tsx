import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect } from "react";

import { getUnresolvedMedicalCaseByPatientId } from "@/react-query/queries";
import { MedicalCaseResponseDto } from "@/types/backend-stubs";

type UnResolvedMedicalCaseContextType = {
  medicalCase: MedicalCaseResponseDto | undefined;
  isLoading: boolean;
  status: "success" | "error" | "pending";
};

const UnResolvedMedicalCaseContext =
  createContext<UnResolvedMedicalCaseContextType | null>(null);

type Props = Readonly<{
  patientId: number;
  children: ReactNode;
}>;

export function UnResolvedMedicalCaseProvider({ patientId, children }: Props) {
  const {
    data: medicalCase,
    isLoading,
    status,
  } = useQuery({
    ...getUnresolvedMedicalCaseByPatientId(patientId),
    retry: false,
    throwOnError: false,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status === "error" && medicalCase) {
      queryClient.resetQueries({
        queryKey: ["medicalCase", "unresolved", patientId],
      });
    }
  }, [status, medicalCase]);

  return (
    <UnResolvedMedicalCaseContext.Provider
      value={{ medicalCase, isLoading, status }}
    >
      {children}
    </UnResolvedMedicalCaseContext.Provider>
  );
}

export function useUnresolvedMedicalCase() {
  const context = useContext(UnResolvedMedicalCaseContext);

  if (!context) {
    throw new Error("useMedicalCase must be used within a MedicalCaseProvider");
  }

  return context;
}
