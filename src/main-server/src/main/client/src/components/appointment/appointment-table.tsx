import { Button, ButtonGroup } from "@nextui-org/button";
import { Chip, ChipProps } from "@nextui-org/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { Key, useCallback } from "react";
import { FaEdit } from "react-icons/fa";
import { TiCancel, TiTick } from "react-icons/ti";

import {
  DateCell,
  HandlingDoctorCell,
  PatientCell,
} from "../util/table-related";

import Link from "@/components/util/link";
import {
  AppointmentStatus,
  AppointmentType,
  MedicalCaseResponseDto,
} from "@/types/backend-stubs";

type Props = {
  strategy: "patient" | "doctor";
  medicalCase: MedicalCaseResponseDto;
};
function AppointmentTable({ medicalCase, strategy }: Props) {
  const renderCell = useCallback(
    (
      doctor: MedicalCaseResponseDto["doctorAssignments"][0]["doctor"],
      appointment: MedicalCaseResponseDto["doctorAssignments"][0]["appointments"][0],
      columnKey: Key,
    ) => {
      switch (columnKey) {
        case "createdAt":
          return <DateCell date={appointment.createdAt} />;
        case "withDoctor":
          return <HandlingDoctorCell doctor={doctor} />;
        case "appointmentType":
          return <AppointmentTypeCell appointment={appointment} />;
        case "status":
          return (
            <AppointmentStatusCell status={appointment.appointmentStatus} />
          );
        case "patient":
          return <PatientCell patient={medicalCase.patient} />;
        case "actions":
          return strategy === "patient" ? (
            <PatientActionsCell />
          ) : (
            <DoctorActionsCell
              appointmentStatus={appointment.appointmentStatus}
            />
          );
        default:
          return null;
      }
    },
    [],
  );
  const columns = getColumnKeys(strategy);

  return (
    <Table>
      <TableHeader columns={columns}>
        {column => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent="Seems like you haven't scheduled any appointments, so go ahead and schedule one!">
        {medicalCase.doctorAssignments
          .map(({ doctor, appointments }) => {
            return appointments.map(appointment => (
              <TableRow key={appointment.id}>
                {columnKey => (
                  <TableCell>
                    {renderCell(doctor, appointment, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            ));
          })
          .flat()}
      </TableBody>
    </Table>
  );
}

function getColumnKeys(strategy: Props["strategy"]) {
  return strategy === "patient"
    ? [
        { uid: "createdAt", name: "CREATED AT" },
        { uid: "withDoctor", name: "WITH DOCTOR" },
        { uid: "appointmentType", name: "TYPE" },
        { uid: "status", name: "STATUS" },
        { uid: "timings", name: "TIMINGS" },
        { uid: "actions", name: "ACTIONS" },
      ]
    : [
        { uid: "createdAt", name: "CREATED AT" },
        { uid: "patient", name: "Patient" },
        { uid: "appointmentType", name: "TYPE" },
        { uid: "status", name: "STATUS" },
        { uid: "timings", name: "TIMINGS" },
        { uid: "actions", name: "ACTIONS" },
      ];
}

function AppointmentTypeCell({
  appointment,
}: {
  appointment: MedicalCaseResponseDto["doctorAssignments"][0]["appointments"][0];
}) {
  const appointmentTypeColorMap = {
    ONLINE: "primary",
    OFFLINE: "secondary",
  } satisfies Record<AppointmentType, ChipProps["color"]>;

  return (
    <>
      <Chip
        color={appointmentTypeColorMap[appointment.appointmentType]}
        size="sm"
        variant="flat"
      >
        {appointment.appointmentType}
      </Chip>
      {appointment.appointmentType === "ONLINE" && (
        <Link href={appointment.meetLink}>Link</Link>
      )}
    </>
  );
}

function AppointmentStatusCell({ status }: { status: AppointmentStatus }) {
  const appointmentStatusColorMap = {
    PENDING: "warning",
    ACCEPTED: "secondary",
    COMPLETED: "success",
    REJECTED: "danger",
    CANCELLED: "danger",
  } satisfies Record<AppointmentStatus, ChipProps["color"]>;

  return (
    <Chip color={appointmentStatusColorMap[status]} size="sm" variant="flat">
      {status}
    </Chip>
  );
}

function PatientActionsCell() {
  return (
    <ButtonGroup size="md">
      <Tooltip content="Edit Appointment">
        <Button isIconOnly>
          <FaEdit />
        </Button>
      </Tooltip>
      <Tooltip content="Cancel Appointment">
        <Button isIconOnly>
          <TiCancel />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

function DoctorActionsCell({
  appointmentStatus,
}: {
  appointmentStatus: AppointmentStatus;
}) {
  return (
    <ButtonGroup size="md">
      {appointmentStatus === "ACCEPTED" ? (
        <Tooltip content="Appointment Already Accepted">
          <Button isDisabled isIconOnly color="success">
            <TiTick />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip content="Accept Appointment">
          <Button isIconOnly color="success">
            <TiTick />
          </Button>
        </Tooltip>
      )}
      <Tooltip content="Cancel Appointment">
        <Button isIconOnly>
          <TiCancel />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

export default AppointmentTable;
