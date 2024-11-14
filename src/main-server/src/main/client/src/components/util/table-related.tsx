import {MedicalCaseResponseDto} from "@/types/backend-stubs";
import {getHandlingDoctorAssignment} from "@/utils/logic";

export function DateCell({date}: { date: string }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <p>{formattedDate}</p>;
}

type HandlingDoctorCellProps =
    | { doctor: { firstName: string; lastName: string } }
    | { doctorAssignments: MedicalCaseResponseDto["doctorAssignments"] };

export function HandlingDoctorCell(props: HandlingDoctorCellProps) {
  const doctor =
      "doctor" in props
          ? props.doctor
          : getHandlingDoctorAssignment(props.doctorAssignments).doctor;

  return (
      <p className="font-bold">
        Dr. {doctor.firstName} {doctor.lastName}
      </p>
  );
}

export function PatientCell({
                              patient,
                            }: {
  patient: MedicalCaseResponseDto["patient"];
}) {
  return (
      <p className="text-bold text-ellipsis text-sm capitalize">
        {patient.firstName} {patient.lastName}
      </p>
  );
}
