import { MdOutlinePreview } from "react-icons/md";
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

import {
  DateCell,
  HandlingDoctorCell,
  PatientCell,
} from "../util/table-related";

import Link from "@/components/util/link";
import {
  MedicalCaseResponseDto,
  ModelPrediction,
  ReviewStatus,
} from "@/types/backend-stubs";

type Props = {
  patient: MedicalCaseResponseDto["patient"];
  doctorAssignments: MedicalCaseResponseDto["doctorAssignments"];
  strategy: "patient" | "doctor";
};

function QuestionnaireTable({ patient, doctorAssignments, strategy }: Props) {
  const columns = getTableColumns(strategy);
  const renderCell = useCallback(
    (
      doctor: MedicalCaseResponseDto["doctorAssignments"][0]["doctor"],
      questionnaireSubmission: MedicalCaseResponseDto["doctorAssignments"][0]["questionnaireSubmissions"][0],
      columnKey: Key,
    ) => {
      switch (columnKey) {
        case "submittedAt":
          return <DateCell date={questionnaireSubmission.submittedAt} />;
        case "modelPrediction":
          return (
            <ModelPredictionCell
              prediction={questionnaireSubmission.modelPrediction}
            />
          );
        case "handlingDoctor":
          return <HandlingDoctorCell doctor={doctor} />;
        case "patient":
          return <PatientCell patient={patient} />;
        case "reviewStatus":
          return (
            <ReviewStatusCell
              reviewStatus={questionnaireSubmission.reviewStatus}
            />
          );
        case "doctorNotes":
          return <p>{questionnaireSubmission.doctorNotes ?? "-"}</p>;
        case "actions":
          return strategy === "patient" ? (
            <PatientActionsCell
              questionnaireSubmission={questionnaireSubmission}
            />
          ) : (
            <DoctorActionsCell
              questionnaireSubmission={questionnaireSubmission}
            />
          );
        default:
          return null;
      }
    },
    [],
  );
  const tableBodyEmptyMsg =
    strategy === "patient"
      ? "Seems like you haven't submitted questionnaire, so go ahead and submit one!"
      : "No questionnaire submissions yet.";

  return (
    <Table>
      <TableHeader columns={columns}>
        {column => (
          <TableColumn key={column.uid} align="center">
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={tableBodyEmptyMsg}>
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

function getTableColumns(strategy: Props["strategy"]) {
  return strategy === "patient"
    ? [
        { uid: "submittedAt", name: "SUBMITTED AT" },
        { uid: "modelPrediction", name: "MODEL PREDICTION" },
        { uid: "handlingDoctor", name: "HANDLING DOCTOR" },
        { uid: "reviewStatus", name: "REVIEW STATUS" },
        { uid: "doctorNotes", name: "DOCTOR NOTES" },
        { uid: "actions", name: "ACTIONS" },
      ]
    : [
        { uid: "submittedAt", name: "SUBMITTED AT" },
        { uid: "modelPrediction", name: "MODEL PREDICTION" },
        { uid: "patient", name: "PATIENT" },
        { uid: "reviewStatus", name: "REVIEW STATUS" },
        { uid: "doctorNotes", name: "DOCTOR NOTES" },
        { uid: "actions", name: "ACTIONS" },
      ];
}

function ModelPredictionCell({ prediction }: { prediction: ModelPrediction }) {
  return (
    <div className="flex justify-center gap-1">
      <Chip
        color={prediction.hasCervicalCancer ? "danger" : "success"}
        size="sm"
        variant="flat"
      >
        {prediction.hasCervicalCancer ? "YES" : "NO"}
      </Chip>
      <Chip
        color={
          prediction.accuracy > 0.8
            ? "success"
            : prediction.accuracy > 0.6
              ? "warning"
              : "danger"
        }
        size="sm"
        variant="flat"
      >
        {prediction.accuracy * 100}%
      </Chip>
    </div>
  );
}

function ReviewStatusCell({ reviewStatus }: { reviewStatus: ReviewStatus }) {
  const reviewStatusColorMap = {
    CORRECT: "success",
    WRONG: "danger",
    NEEDS_DISCUSSION: "warning",
    PENDING: "warning",
  } satisfies Record<ReviewStatus, ChipProps["color"]>;

  return (
    <Chip color={reviewStatusColorMap[reviewStatus]} size="sm" variant="flat">
      {reviewStatus}
    </Chip>
  );
}

function PatientActionsCell({
  questionnaireSubmission,
}: {
  questionnaireSubmission: MedicalCaseResponseDto["doctorAssignments"][0]["questionnaireSubmissions"][0];
}) {
  return (
    <Tooltip content="Details">
      <Button
        isIconOnly
        as={Link}
        href={`/dashboard/patient/questionnaire-submission/${questionnaireSubmission.id}`}
      >
        <IoEyeOutline />
      </Button>
    </Tooltip>
  );
}

function DoctorActionsCell({
  questionnaireSubmission,
}: {
  questionnaireSubmission: MedicalCaseResponseDto["doctorAssignments"][0]["questionnaireSubmissions"][0];
}) {
  return (
    <ButtonGroup size="md">
      <Tooltip content="Details">
        <Button
          isIconOnly
          as={Link}
          href={`/dashboard/doctor/questionnaire-submission/${questionnaireSubmission.id}`}
        >
          <IoEyeOutline />
        </Button>
      </Tooltip>

      <Tooltip
        content={
          questionnaireSubmission.reviewStatus === "PENDING"
            ? "Review Questionnaire Submission"
            : "Already reviewed"
        }
      >
        <Button
          isIconOnly
          as={Link}
          disabled={questionnaireSubmission.reviewStatus !== "PENDING"}
          href={`/dashboard/doctor/questionnaire-submission/${questionnaireSubmission.id}`}
        >
          <MdOutlinePreview />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

export default QuestionnaireTable;
