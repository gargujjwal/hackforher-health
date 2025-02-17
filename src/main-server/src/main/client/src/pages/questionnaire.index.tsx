import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import ModelPredictionCard from "@/components/questionnaire/model-prediction-card";
import QuestionnaireForm from "@/components/questionnaire/questionnaire-form";
import FormError from "@/components/ui/form-error";
import Link from "@/components/util/link";
import { useAuth } from "@/contexts/auth-context";
import { predictQuestionnaireMut } from "@/react-query/mutations";
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
        strategy="create"
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
              <ModalBody>
                <ModelPredictionCard
                  modelPrediction={
                    predictQuestionnaireMutation.data!.modelPrediction
                  }
                  shadow="none"
                />

                <div className="rounded bg-yellow-100 p-3 text-xs text-yellow-900">
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
