import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";
import { Badge } from "@nextui-org/badge";
import { Chip } from "@nextui-org/chip";

import FormError from "../ui/form-error";
import Link from "../util/link";

import QuestionnaireForm from "./questionnaire-form";

import { useAuth } from "@/contexts/auth-context";
import { predictQuestionnaireMut } from "@/react-query/mutations";
import { formatDistanceFromNow } from "@/utils/date";
import { ApiErrorCls } from "@/utils/error";

function QuestionnaireIndexPage() {
  const {
    isOpen: isOpenWarningModal,
    onOpen: onOpenWarningModal,
    onOpenChange: onOpenChangeWarningModal,
  } = useDisclosure();
  const {
    isOpen: isOpenResultModal,
    onOpen: onOpenResultModal,
    onOpenChange: onOpenChangeResultModal,
  } = useDisclosure();
  const predictQuestionnaireMutation = useMutation({
    ...predictQuestionnaireMut,
    onSuccess() {
      onOpenResultModal();
    },
  });
  const { status } = useAuth();

  useEffect(() => {
    // remind authenticated user that they need to submit the questionnaire elsewhere
    // to be counted
    if (status === "authenticated") {
      onOpenWarningModal();
    }
  }, [status]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">
        Cervical Cancer Prediction Questionnaire
      </h1>
      <p className="mb-2 text-xs md:text-sm lg:text-base">
        This questionnaire is designed to help predict the likelihood of a
        patient having cervical cancer.
      </p>
      {predictQuestionnaireMutation.isError && (
        <FormError
          message={
            (predictQuestionnaireMutation.error as ApiErrorCls).description
          }
        />
      )}
      <QuestionnaireForm
        isPending={predictQuestionnaireMutation.isPending}
        onSubmit={data =>
          predictQuestionnaireMutation.mutate({ questionResponses: data })
        }
      />
      <Modal
        isOpen={isOpenWarningModal}
        onOpenChange={onOpenChangeWarningModal}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Notice for authenticated users
              </ModalHeader>
              <ModalBody>
                <p>
                  This questionnaire submission will{" "}
                  <b className="font-bold underline">
                    only generate a model prediction
                  </b>{" "}
                  and <i className="text-primary">will not be saved</i> on the
                  server. It won&apos;t be linked to any medical case. To submit
                  and attach the questionnaire to a medical case, please visit
                  this{" "}
                  <Link
                    className="font-bold"
                    href="/dashboard/patient/questionnaire"
                    underline="always"
                  >
                    Link
                  </Link>
                </p>
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
      <Modal isOpen={isOpenResultModal} onOpenChange={onOpenChangeResultModal}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Badge
                  color={
                    predictQuestionnaireMutation.data!.modelPrediction
                      .hasCervicalCancer
                      ? "danger"
                      : "success"
                  }
                  content={
                    predictQuestionnaireMutation.data!.modelPrediction
                      .hasCervicalCancer
                      ? "Postive"
                      : "Negative"
                  }
                >
                  AI Prediction
                </Badge>
              </ModalHeader>
              <ModalBody>
                <div className="mb-4 mt-2">
                  <p>
                    <Chip
                      color={
                        predictQuestionnaireMutation.data!.modelPrediction
                          .hasCervicalCancer
                          ? "danger"
                          : "success"
                      }
                    >
                      {predictQuestionnaireMutation.data!.modelPrediction
                        .hasCervicalCancer
                        ? "Postive"
                        : "Negative"}
                    </Chip>
                    : You{" "}
                    <b className="font-bold underline">
                      {predictQuestionnaireMutation.data?.modelPrediction
                        .hasCervicalCancer
                        ? "have"
                        : "don't have"}
                    </b>{" "}
                    Cervical Cancer
                  </p>
                  <p className="pl-1 text-sm text-gray-700">
                    Prediction Accuracy:{" "}
                    {predictQuestionnaireMutation.data!.modelPrediction
                      .accuracy * 100}
                    %
                  </p>
                  {predictQuestionnaireMutation.data?.modelPrediction
                    .predictedAt && (
                    <p className="text-sm text-gray-500">
                      Predicted At:{" "}
                      {formatDistanceFromNow(
                        predictQuestionnaireMutation.data.modelPrediction
                          .predictedAt,
                      )}
                    </p>
                  )}
                </div>

                <div className="mt-4 rounded bg-yellow-100 p-3 text-xs text-yellow-900">
                  <p>
                    <strong>Warning:</strong> The predictions made by this model
                    are not validated by a doctor. We recommend consulting with
                    a qualified doctor before interpreting the results.
                  </p>
                  <p className="mt-2">
                    This platform can help connect you with the necessary
                    healthcare providers.{" "}
                    <span className="font-semibold">
                      Consider creating an account
                    </span>{" "}
                    for full access.
                  </p>
                </div>

                <Button
                  as={Link}
                  className="mt-4"
                  color="warning"
                  href="/auth/login"
                >
                  Log in / Sign up
                </Button>
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
    </div>
  );
}

export default QuestionnaireIndexPage;
