import { MedicalCaseResponseDto } from "@/types/backend-stubs";

export function getHandlingDoctorAssignment(
  doctorAssignments: MedicalCaseResponseDto["doctorAssignments"],
): MedicalCaseResponseDto["doctorAssignments"][0] {
  const sortedDoctorAssignment = [...doctorAssignments].sort((a, b) => {
    return new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime();
  });
  const handlingDoctor = sortedDoctorAssignment[0];

  return handlingDoctor;
}
