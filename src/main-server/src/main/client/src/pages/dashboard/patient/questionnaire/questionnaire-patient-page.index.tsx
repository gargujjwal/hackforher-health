import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import ModelPredictionCard from "@/components/questionnaire/model-prediction-card";
import QuestionnaireForm from "@/components/questionnaire/questionnaire-form";
import FormError from "@/components/ui/form-error";
import H1 from "@/components/ui/h1";
import { useUnresolvedMedicalCase } from "@/contexts/unresolved-medical-case";
import { submitQuestionnaireResponseMut } from "@/react-query/mutations";
import { ApiErrorCls } from "@/utils/error";
import { getHandlingDoctorAssignment } from "@/utils/logic";

function QuestionnairePatientPage() {
  const { medicalCase, status } = useUnresolvedMedicalCase();

  return (
    <div>
      <H1>Cervical Cancer Prediction Questionnaire</H1>
      <p className="mb-2 text-xs md:text-sm lg:text-base">
        This questionnaire is designed to help predict the likelihood of a
        patient having cervical cancer.
      </p>
      {status === "success" && (
        <QuestionnaireFormWrapper
          doctorAssignmentId={
            getHandlingDoctorAssignment(medicalCase!.doctorAssignments).id
          }
        />
      )}
      {status === "pending" && (
        <div className="grid place-content-center">
          <Spinner color="primary" />
        </div>
      )}
      {status === "error" && <Navigate to="/400" />}
    </div>
  );
}

function QuestionnaireFormWrapper({
  doctorAssignmentId,
}: {
  doctorAssignmentId: number;
}) {
  const {
    isOpen: isOpenResultModal,
    onOpen: onOpenResultModal,
    onOpenChange: onOpenChangeResultModal,
  } = useDisclosure();
  const questionnaireSubmissionMutation = useMutation({
    ...submitQuestionnaireResponseMut(doctorAssignmentId),
    onSuccess() {
      onOpenResultModal();
    },
  });

  return (
    <>
      {questionnaireSubmissionMutation.isError && (
        <FormError
          message={
            (questionnaireSubmissionMutation.error as ApiErrorCls).description
          }
        />
      )}
      <QuestionnaireForm
        isPending={questionnaireSubmissionMutation.isPending}
        strategy="create"
        onSubmit={data =>
          questionnaireSubmissionMutation.mutate({ questionResponses: data })
        }
      />
      <Modal isOpen={isOpenResultModal} onOpenChange={onOpenChangeResultModal}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Badge
                  color={
                    questionnaireSubmissionMutation.data!.modelPrediction
                      .hasCervicalCancer
                      ? "danger"
                      : "success"
                  }
                  content={
                    questionnaireSubmissionMutation.data!.modelPrediction
                      .hasCervicalCancer
                      ? "Postive"
                      : "Negative"
                  }
                >
                  AI Prediction
                </Badge>
              </ModalHeader>
              <ModalBody>
                <ModelPredictionCard
                  modelPrediction={
                    questionnaireSubmissionMutation.data!.modelPrediction
                  }
                />
                <div className="mt-4 rounded bg-yellow-100 p-3 text-xs text-yellow-900">
                  <p>
                    <strong>Warning:</strong> The predictions made by this model
                    are not validated by a doctor. This questionnaire submission
                    will be passed on to your current case doctor for review.
                    Please wait until then for a final diagnosis.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-textPrimary"
                  color="primary"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default QuestionnairePatientPage;
