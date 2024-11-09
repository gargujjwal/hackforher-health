import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaUserClock } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import AppointmentTable from "@/components/medical-case/appointment-table";
import DoctorShowCard from "@/components/medical-case/doctor-show-card";
import QuestionnaireTable from "@/components/questionnaire/questionnaire-table";
import FormError from "@/components/ui/form-error";
import Spinner from "@/components/ui/spinner";
import { markMedicalCaseAsResolvedMut } from "@/react-query/mutations";
import { getMedicalCaseById } from "@/react-query/queries";

function MedicalCaseDetailPage() {
  const navigate = useNavigate();
  const { medicalCaseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    activeTab: "questionnaire",
  });
  const queryClient = useQueryClient();
  const medicalCase = useQuery({
    ...getMedicalCaseById(parseInt(medicalCaseId!)),
  });
  const mutationObj = markMedicalCaseAsResolvedMut(parseInt(medicalCaseId!));
  const markCaseAsResolvedMutation = useMutation({
    ...mutationObj,
    onSuccess: () => {
      toast.success("Case resolved successfully");
      queryClient.invalidateQueries({ queryKey: mutationObj.invalidateKeys });
      navigate("/dashboard/patient/medical-case");
    },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold lg:text-3xl">
        Medical Case #{medicalCaseId}
      </h1>
      {medicalCase.isLoading && <Spinner />}
      {medicalCase.isError && <FormError message={medicalCase.error.message} />}
      {medicalCase.isSuccess && (
        <>
          <h2 className="text-lg">Case Description</h2>
          <p className="mb-4 text-sm">{medicalCase.data.caseDescription}</p>

          <h2 className="text-lg">
            Doctor{medicalCase.data.doctorAssignments.length > 1 ? "s" : null}{" "}
            Assigned To The Case
          </h2>
          <ul className="mt-2 flex justify-start gap-4">
            {medicalCase.data.doctorAssignments.map(doctorAssignment => (
              <li key={doctorAssignment.id}>
                <DoctorShowCard doctorAssignment={doctorAssignment} />
              </li>
            ))}
          </ul>
          {medicalCase.data.isResolved ? (
            <Card className="mt-4 flex-row bg-success font-bold text-textPrimary">
              <CardBody className="flex-row items-center justify-center gap-1">
                <p> Case is resolved </p>
                <TiTick className="size-6" />
              </CardBody>
            </Card>
          ) : (
            <Card className="mx-auto mt-8 bg-primary text-textPrimary md:w-max md:flex-row md:gap-4">
              <CardBody className="flex-grow md:justify-center">
                <p>
                  Do you think its time to resolve this case? If{" "}
                  <b className="font-bold">yes</b> click `Resolve Case` button
                </p>
              </CardBody>
              <CardFooter className="md:w-max">
                <Button
                  className="mx-auto md:hidden"
                  color="danger"
                  isLoading={markCaseAsResolvedMutation.isPending}
                  onClick={() => markCaseAsResolvedMutation.mutate()}
                >
                  Resolve Case
                </Button>
                <Button
                  className="ml-auto hidden px-12 md:flex"
                  color="danger"
                  isLoading={markCaseAsResolvedMutation.isPending}
                  size="lg"
                  onClick={() => markCaseAsResolvedMutation.mutate()}
                >
                  Resolve Case
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="mt-8 flex w-full flex-col">
            <Tabs
              className="text-textPrimary group-data-[selected=true]:text-textPrimary"
              color="primary"
              defaultSelectedKey={searchParams.get("activeTab")!}
              id="tabs"
              variant="bordered"
            >
              <Tab
                key="questionnaire"
                title={
                  <div className="flex items-center space-x-2 group-data-[selected=false]:text-secondary group-data-[selected=true]:text-textPrimary">
                    <FaClipboardQuestion className="size-5 group-data-[selected=false]:text-secondary group-data-[selected=true]:text-textPrimary" />
                    <span className="sm:hidden">Questionnaire</span>
                    <span className="hidden sm:block">
                      Questionnaire Submissions
                    </span>
                  </div>
                }
                onClick={() => setSearchParams({ activeTab: "questionnaire" })}
              >
                <QuestionnaireTable
                  doctorAssignments={medicalCase.data.doctorAssignments}
                  patient={medicalCase.data.patient}
                  strategy="patient"
                />
              </Tab>
              <Tab
                key="appointment"
                className="text-textPrimary"
                title={
                  <div className="flex items-center space-x-2 group-data-[selected=false]:text-secondary group-data-[selected=true]:text-textPrimary">
                    <FaUserClock className="size-5 group-data-[selected=false]:text-secondary group-data-[selected=true]:text-textPrimary" />
                    <span>Appointments</span>
                  </div>
                }
                onClick={() => setSearchParams({ activeTab: "appointment" })}
              >
                <AppointmentTable
                  medicalCase={medicalCase.data}
                  strategy="patient"
                />
              </Tab>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}

export default MedicalCaseDetailPage;
