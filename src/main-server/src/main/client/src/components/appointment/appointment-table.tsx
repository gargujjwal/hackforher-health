import {Button, ButtonGroup} from "@nextui-org/button";
import {Chip, ChipProps} from "@nextui-org/chip";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import {Tooltip} from "@nextui-org/tooltip";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Key, useCallback} from "react";
import {FaCross, FaEdit} from "react-icons/fa";
import {TiCancel, TiTick} from "react-icons/ti";

import {
  DateCell,
  HandlingDoctorCell,
  PatientCell,
} from "../util/table-related";

import AppointmentCreateUpdateForm from "./appointment-create-update-form";

import Link from "@/components/util/link";
import {changeAppointmentStatusMut} from "@/react-query/mutations";
import {
  AppointmentDto,
  AppointmentStatus,
  AppointmentType,
  MedicalCaseResponseDto,
} from "@/types/backend-stubs";
import {useAuthenticatedUser} from "@/contexts/auth-context";

type Props = {
  strategy: "patient" | "doctor";
  medicalCase: MedicalCaseResponseDto;
};

function AppointmentTable({medicalCase, strategy}: Props) {
  const {user} = useAuthenticatedUser();
  const renderCell = useCallback(
      (
          doctor: MedicalCaseResponseDto["doctorAssignments"][0]["doctor"],
          appointment: MedicalCaseResponseDto["doctorAssignments"][0]["appointments"][0],
          da: MedicalCaseResponseDto["doctorAssignments"][0],
          columnKey: Key,
      ) => {
        switch (columnKey) {
          case "createdAt":
            return <DateCell date={appointment.createdAt}/>;
          case "withDoctor":
            return <HandlingDoctorCell doctor={doctor}/>;
          case "appointmentType":
            return <AppointmentTypeCell appointment={appointment}/>;
          case "status":
            return (
                <AppointmentStatusCell status={appointment.appointmentStatus}/>
            );
          case "patient":
            return <PatientCell patient={medicalCase.patient}/>;
          case "timings":
            return <TimeRange appointment={appointment}/>;
          case "actions":
            return strategy === "patient" ? (
                <PatientActionsCell
                    appointment={appointment}
                    doctorAssignment={da}
                />
            ) : (
                <DoctorActionsCell appointment={appointment}/>
            );
          default:
            return null;
        }
      },
      [],
  );
  const columns = getColumnKeys(strategy);

  if (strategy === "doctor") {
    // only show current doctors appointments
    medicalCase.doctorAssignments = medicalCase.doctorAssignments.filter(
        da => da.doctor.id === user.id,
    );
  }

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
        <TableBody
            emptyContent="Seems like you haven't scheduled any appointments, so go ahead and schedule one!">
          {medicalCase.doctorAssignments
          .map(da => {
            return da.appointments.map(appointment => (
                <TableRow key={appointment.id}>
                  {columnKey => (
                      <TableCell>
                        {renderCell(da.doctor, appointment, da, columnKey)}
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
        {uid: "createdAt", name: "CREATED AT"},
        {uid: "withDoctor", name: "WITH DOCTOR"},
        {uid: "appointmentType", name: "TYPE"},
        {uid: "status", name: "STATUS"},
        {uid: "timings", name: "TIMINGS"},
        {uid: "actions", name: "ACTIONS"},
      ]
      : [
        {uid: "createdAt", name: "CREATED AT"},
        {uid: "patient", name: "Patient"},
        {uid: "appointmentType", name: "TYPE"},
        {uid: "status", name: "STATUS"},
        {uid: "timings", name: "TIMINGS"},
        {uid: "actions", name: "ACTIONS"},
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
      <div className="space-x-1">
        <Chip
            color={appointmentTypeColorMap[appointment.appointmentType]}
            size="sm"
            variant="flat"
        >
          {appointment.appointmentType}
        </Chip>
        {appointment.appointmentType === "ONLINE" && (
            <Link
                isExternal
                showAnchorIcon
                href={appointment.meetLink}
                underline="hover"
            >
              Link
            </Link>
        )}
      </div>
  );
}

function AppointmentStatusCell({status}: { status: AppointmentStatus }) {
  const appointmentStatusColorMap = {
    PENDING: "warning",
    ACCEPTED: "success",
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

function PatientActionsCell({
                              appointment,
                              doctorAssignment,
                            }: {
  doctorAssignment: MedicalCaseResponseDto["doctorAssignments"][0];
  appointment: MedicalCaseResponseDto["doctorAssignments"][0]["appointments"][0];
}) {
  const queryClient = useQueryClient();
  const changeAppointmentStatusMutateObject = changeAppointmentStatusMut(
      appointment.id,
  );
  const {mutate, isPending} = useMutation({
    ...changeAppointmentStatusMutateObject,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: changeAppointmentStatusMutateObject.invalidateKeys,
      });
    },
  });
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
      <>
        <Modal className="w-[50rem]" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="w-[96rem] max-w-full overflow-y-scroll">
            {onClose => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Edit Your Appointment
                  </ModalHeader>
                  <ModalBody className="overflow-scroll">
                    <AppointmentCreateUpdateForm
                        appointment={appointment}
                        doctorAssignment={doctorAssignment}
                        mode="update"
                        onAppointmentChange={() => onClose()}
                    />
                  </ModalBody>
                </>
            )}
          </ModalContent>
        </Modal>
        <ButtonGroup size="md">
          <Tooltip content="Edit Appointment">
            <Button
                isIconOnly
                onClick={() => {
                  onOpen();
                }}
            >
              <FaEdit/>
            </Button>
          </Tooltip>
          <Tooltip content="Cancel Appointment">
            <Button
                isIconOnly
                isLoading={isPending}
                onClick={() => mutate({appointmentStatus: "CANCELLED"})}
            >
              <TiCancel/>
            </Button>
          </Tooltip>
        </ButtonGroup>
      </>
  );
}

function DoctorActionsCell({
                             appointment,
                           }: {
  appointment: MedicalCaseResponseDto["doctorAssignments"][0]["appointments"][0];
}) {
  const queryClient = useQueryClient();
  const changeAppointmentStatusMutateObject = changeAppointmentStatusMut(
      appointment.id,
  );
  const {mutate, isPending} = useMutation({
    ...changeAppointmentStatusMutateObject,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: changeAppointmentStatusMutateObject.invalidateKeys,
      });
    },
  });

  return (
      <ButtonGroup size="md">
        {appointment.appointmentStatus === "ACCEPTED" ? (
            <Tooltip content="Appointment Already Accepted">
              <Button isDisabled isIconOnly color="success">
                <TiTick/>
              </Button>
            </Tooltip>
        ) : (
            <Tooltip content="Accept Appointment">
              <Button
                  isIconOnly
                  color="success"
                  isDisabled={appointment.appointmentStatus === "CANCELLED"}
                  isLoading={isPending}
                  onClick={() => mutate({appointmentStatus: "ACCEPTED"})}
              >
                <TiTick/>
              </Button>
            </Tooltip>
        )}
        <Tooltip content="Reject Appointment">
          <Button
              isIconOnly
              isDisabled={
                  appointment.appointmentStatus === "CANCELLED" ||
                  appointment.appointmentStatus === "REJECTED" ||
                  appointment.appointmentStatus === "ACCEPTED"
              }
              isLoading={isPending}
              onClick={() => mutate({appointmentStatus: "REJECTED"})}
          >
            <FaCross/>
          </Button>
        </Tooltip>
        <Tooltip content="Cancel Appointment">
          <Button
              isIconOnly
              isDisabled={appointment.appointmentStatus === "CANCELLED"}
              isLoading={isPending}
              onClick={() => mutate({appointmentStatus: "CANCELLED"})}
          >
            <TiCancel/>
          </Button>
        </Tooltip>
      </ButtonGroup>
  );
}

function TimeRange({
                     appointment: {startTime, endTime},
                   }: {
  appointment: AppointmentDto;
}) {
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);

    // Format date: "15 Mar 2024"
    const day = date.getDate().toString().padStart(2, "0");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format time: "HH:MM"
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return {
      formattedDate: `${day} ${month} ${year}`,
      formattedTime: `${hours}:${minutes}`,
    };
  };

  const startDateTime = formatDateTime(startTime);
  const endDateTime = formatDateTime(endTime);

  return (
      <div className="flex items-center space-x-2">
      <span className="font-medium text-gray-700">
        {startDateTime.formattedDate}
      </span>
        <span className="text-gray-500">|</span>
        <span className="font-medium text-gray-700">
        {startDateTime.formattedTime}
      </span>
        <span className="text-gray-500">-</span>
        <span className="font-medium text-gray-700">
        {endDateTime.formattedTime}
      </span>
      </div>
  );
}

export default AppointmentTable;
