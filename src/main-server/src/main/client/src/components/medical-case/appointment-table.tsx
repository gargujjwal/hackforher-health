import {Button, ButtonGroup} from "@nextui-org/button";
import {Chip, ChipProps} from "@nextui-org/chip";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,} from "@nextui-org/table";
import {Tooltip} from "@nextui-org/tooltip";
import {Key, useCallback} from "react";
import {FaEdit} from "react-icons/fa";
import {TiCancel} from "react-icons/ti";

import Link from "@/components/util/link";
import {AppointmentStatus, AppointmentType, MedicalCaseResponseDto,} from "@/types/backend-stubs";

function AppointmentTable({
                            doctorAssignments,
                          }: Readonly<{
  doctorAssignments: MedicalCaseResponseDto["doctorAssignments"];
}>) {
  const columns = [
    {uid: "createdAt", name: "CREATED AT"},
    {uid: "withDoctor", name: "WITH DOCTOR"},
    {uid: "appointmentType", name: "TYPE"},
    {uid: "status", name: "STATUS"},
    {uid: "timings", name: "TIMINGS"},
    {uid: "actions", name: "ACTIONS"},
  ];
  const appointmentTypeColorMap = {
    ONLINE: "primary",
    OFFLINE: "secondary",
  } satisfies Record<AppointmentType, ChipProps["color"]>;
  const appointmentStatusColorMap = {
    PENDING: "warning",
    ACCEPTED: "secondary",
    COMPLETED: "success",
    REJECTED: "danger",
    CANCELLED: "danger",
  } satisfies Record<AppointmentStatus, ChipProps["color"]>;
  const renderCell = useCallback(
      (
          doctor: MedicalCaseResponseDto["doctorAssignments"][0]["doctor"],
          appointment: MedicalCaseResponseDto["doctorAssignments"][0]["appointments"][0],
          columnKey: Key,
      ) => {
        switch (columnKey) {
          case "createdAt":
            return (
                <p>
                  {new Date(appointment.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
            );
          case "withDoctor":
            return (
                <p className="text-bold text-ellipsis text-sm capitalize">
                  Dr. {doctor.firstName} {doctor.lastName}
                </p>
            );
          case "appointmentType":
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
          case "status":
            return (
                <Chip
                    color={appointmentStatusColorMap[appointment.appointmentStatus]}
                    size="sm"
                    variant="flat"
                >
                  {appointment.appointmentStatus}
                </Chip>
            );
          case "actions":
            return (
                <div className="relative flex items-center justify-center gap-2">
                  <ButtonGroup size="md">
                    <Tooltip content="Edit Appointment">
                      <Button isIconOnly>
                        <FaEdit/>
                      </Button>
                    </Tooltip>
                    <Tooltip content="Cancel Appointment">
                      <Button isIconOnly>
                        <TiCancel/>
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </div>
            );
          default:
            return null;
        }
      },
      [],
  );

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
          {doctorAssignments
          .map(({doctor, appointments}) => {
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

export default AppointmentTable;
