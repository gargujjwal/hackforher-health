import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";

import { getUnresolvedMedicalCaseByPatientId } from "@/react-query/queries";
import { MedicalCaseResponseDto } from "@/types/backend-stubs";

interface UnResolvedMedicalCaseContextType {
  medicalCase: MedicalCaseResponseDto | undefined;
  isLoading: boolean;
}

const UnResolvedMedicalCaseContext =
  createContext<UnResolvedMedicalCaseContextType | null>(null);

interface Props {
  patientId: number;
  children: ReactNode;
}

export const UnResolvedMedicalCaseProvider: React.FC<Props> = ({
  patientId,
  children,
}) => {
  const { data: medicalCase, isLoading } = useQuery({
    ...getUnresolvedMedicalCaseByPatientId(patientId),
    throwOnError: false,
  });

  return (
    <UnResolvedMedicalCaseContext.Provider value={{ medicalCase, isLoading }}>
      {children}
    </UnResolvedMedicalCaseContext.Provider>
  );
};

export function useUnresolvedMedicalCase() {
  const context = useContext(UnResolvedMedicalCaseContext);

  if (!context) {
    throw new Error("useMedicalCase must be used within a MedicalCaseProvider");
  }

  return context;
}
