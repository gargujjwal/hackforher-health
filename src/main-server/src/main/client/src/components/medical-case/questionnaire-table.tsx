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
import { IoEyeOutline } from "react-icons/io5";

import Link from "@/components/util/link";
import { MedicalCaseResponseDto, ReviewStatus } from "@/types/backend-stubs";

function QuestionnaireTable({
  doctorAssignments,
}: Readonly<{
  doctorAssignments: MedicalCaseResponseDto["doctorAssignments"];
}>) {
  const columns = [
    { uid: "submittedAt", name: "SUBMITTED AT" },
    { uid: "modelPrediction", name: "MODEL PREDICTION" },
    { uid: "handlingDoctor", name: "HANDLING DOCTOR" },
    { uid: "reviewStatus", name: "REVIEW STATUS" },
    { uid: "doctorNotes", name: "DOCTOR NOTES" },
    { uid: "actions", name: "ACTIONS" },
  ];
  const reviewStatusColorMap = {
    CORRECT: "success",
    WRONG: "danger",
    NEEDS_DISCUSSION: "warning",
  } satisfies Record<ReviewStatus, ChipProps["color"]>;
  const renderCell = useCallback(
    (
      doctor: MedicalCaseResponseDto["doctorAssignments"][0]["doctor"],
      quesstionaireSubmission: MedicalCaseResponseDto["doctorAssignments"][0]["questionnaireSubmissions"][0],
      columnKey: Key,
    ) => {
      switch (columnKey) {
        case "submittedAt":
          return (
            <p>
              {new Date(quesstionaireSubmission.submittedAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </p>
          );
        case "modelPrediction":
          return (
            <>
              <Chip
                color={
                  quesstionaireSubmission.modelPrediction.hasCervicalCancer
                    ? "danger"
                    : "success"
                }
                size="sm"
                variant="flat"
              >
                {quesstionaireSubmission.modelPrediction.hasCervicalCancer
                  ? "YES"
                  : "NO"}
              </Chip>
              <Chip
                color={
                  quesstionaireSubmission.modelPrediction.accuracy > 80
                    ? "success"
                    : quesstionaireSubmission.modelPrediction.accuracy > 60
                      ? "warning"
                      : "danger"
                }
                size="sm"
                variant="flat"
              >
                {quesstionaireSubmission.modelPrediction.accuracy}%
              </Chip>
            </>
          );
        case "handlingDoctor":
          return (
            <p className="text-bold text-ellipsis text-sm capitalize">
              Dr. {doctor.firstName} {doctor.lastName}
            </p>
          );
        case "reviewStatus":
          return (
            <Chip
              color={reviewStatusColorMap[quesstionaireSubmission.reviewStatus]}
              size="sm"
              variant="flat"
            >
              {quesstionaireSubmission.reviewStatus}
            </Chip>
          );
        case "doctorNotes":
          return <p>{quesstionaireSubmission.doctorNotes}</p>;
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <ButtonGroup size="md">
                <Tooltip content="Details">
                  <Button
                    isIconOnly
                    as={Link}
                    href={`/dashboard/patient/questionnaire-submission/${quesstionaireSubmission.id}`}
                  >
                    <IoEyeOutline />
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
      <TableBody emptyContent="Seems like you haven't submitted questionnaire, so go ahead and submit one!">
        {doctorAssignments
          .map(({ doctor, questionnaireSubmissions }) => {
            return questionnaireSubmissions.map(submission => (
              <TableRow key={submission.id}>
                {columnKey => (
                  <TableCell>
                    {renderCell(doctor, submission, columnKey)}
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

export default QuestionnaireTable;
