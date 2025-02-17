import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import ArrayInput from "./ui/array-input";
import FormError from "./ui/form-error";
import H1 from "./ui/h1";

import useArrayInput from "@/hooks/use-array-input";
import error from "@/pages/error";
import { updatePatientProfileMut } from "@/react-query/mutations";
import { PatientProfileDto } from "@/types/backend-stubs";
import { ApiErrorCls, ValidationError } from "@/utils/error";
import { capitalize } from "@/utils/string";

type Props = { profile: PatientProfileDto };

function PatientProfileEditForm({ profile }: Props) {
  const navigate = useNavigate();
  const updatePatientProfileMutationObject = updatePatientProfileMut(
    profile.patient.id,
  );
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    ...updatePatientProfileMutationObject,
    onSuccess() {
      toast.success("Patient profile updated successfully");
      queryClient.invalidateQueries({
        queryKey: updatePatientProfileMutationObject.invalidateKeys,
      });
      navigate("/dashboard/patient/profile");
    },
    onError() {
      if (error instanceof ApiErrorCls) {
        setError("root", { message: error.message });
      } else if (error instanceof ValidationError) {
        Object.entries(error.validationErrors).forEach(([field, errMsg]) => {
          setError(field as keyof PatientProfileDto, {
            message: capitalize(errMsg),
          });
        });
      }
    },
  });
  const {
    setError,
    formState: { errors },
    control,
    watch,
    handleSubmit,
    setValue,
  } = useForm<PatientProfileDto>({ defaultValues: profile });
  const {
    append: appendInsuranceDetail,
    remove: removeInsuranceDetail,
    fields: insuranceDetails,
  } = useFieldArray({ control, name: "insuranceDetails" });
  const {
    fields: phoneNumbers,
    append: appendPhoneNumber,
    remove: removePhoneNumber,
    update: updatePhoneNumber,
  } = useArrayInput<string>({ initialValues: profile?.phoneNumber });
  const {
    fields: currentMedications,
    append: appendCurrentMedication,
    remove: removeCurrentMedication,
    update: updateCurrentMedication,
  } = useArrayInput<string>({
    initialValues: profile?.currentMedications,
  });
  const {
    fields: allergies,
    append: appendAllergy,
    remove: removeAllergy,
    update: updateAllergy,
  } = useArrayInput<string>({
    initialValues: profile?.currentMedications,
  });

  useEffect(() => {
    setValue("phoneNumber", phoneNumbers);
  }, [phoneNumbers]);

  useEffect(() => {
    setValue("currentMedications", currentMedications);
  }, [currentMedications]);

  useEffect(() => {
    setValue("allergies", allergies);
  }, [allergies]);

  return (
    <>
      <H1>Edit Your Profile</H1>
      <form className="space-y-8" onSubmit={handleSubmit(data => mutate(data))}>
        {errors.root && <FormError message={errors.root.message} />}
        <fieldset className="rounded-md border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold">
            Personal Details
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name="patient.firstName"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="First Name"
                  labelPlacement="outside"
                  placeholder="Ex: John"
                  type="text"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="patient.lastName"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Last Name"
                  labelPlacement="outside"
                  placeholder="Ex: Doe"
                  type="text"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            <ArrayInput
              append={appendPhoneNumber}
              classNames={{ container: "md:col-span-2" }}
              fields={phoneNumbers}
              label="Phone Number"
              placeholder="Enter phone number"
              remove={removePhoneNumber}
              update={updatePhoneNumber}
            />
          </div>
        </fieldset>
        <fieldset className="rounded-md border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold">
            Medical Information
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Controller
              control={control}
              name="bloodType"
              render={({ fieldState, field: { value, onChange } }) => (
                <Select
                  defaultSelectedKeys={[watch("bloodType") ?? ""]}
                  description="Select your blood type"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Blood Type"
                  placeholder="Select blood type"
                  value={value}
                  onSelectionChange={keys => onChange(keys.currentKey)}
                >
                  <SelectItem key="A+" value="A+">
                    A+
                  </SelectItem>
                  <SelectItem key="B+" value="B+">
                    B+
                  </SelectItem>
                  <SelectItem key="B-" value="B-">
                    B-
                  </SelectItem>
                  <SelectItem key="O+" value="O+">
                    O+
                  </SelectItem>
                  <SelectItem key="O-" value="O-">
                    O-
                  </SelectItem>
                  <SelectItem key="AB+" value="AB+">
                    A+
                  </SelectItem>
                  <SelectItem key="AB-" value="AB-">
                    A-
                  </SelectItem>
                  <SelectItem key="1" value="1">
                    Yes
                  </SelectItem>
                  <SelectItem key="0" value="0">
                    No
                  </SelectItem>
                </Select>
              )}
            />
            <Controller
              control={control}
              name="isSmoker"
              render={({ fieldState, field: { value, onChange } }) => (
                <Select
                  defaultSelectedKeys={[profile.isSmoker ? "true" : "0"]}
                  description="Do you currently smoke?"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Are you a smoker?"
                  placeholder="Choose Yes or No"
                  selectedKeys={[value ? "true" : "false"]}
                  value={value ? "true" : "false"}
                  onSelectionChange={keys =>
                    onChange(
                      keys.currentKey === "true"
                        ? true
                        : keys.currentKey === "false"
                          ? false
                          : undefined,
                    )
                  }
                >
                  <SelectItem key="true" value="true">
                    Yes
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    No
                  </SelectItem>
                </Select>
              )}
            />
            <Controller
              control={control}
              name="drinksAlcohol"
              render={({ fieldState, field: { value, onChange } }) => (
                <Select
                  defaultSelectedKeys={[profile.isSmoker ? "1" : "0"]}
                  description="Do you drink alcohol?"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Alcohol Consumption"
                  placeholder="Choose Yes or No"
                  value={value ? "true" : "false"}
                  onSelectionChange={keys =>
                    onChange(
                      keys.currentKey === "true"
                        ? true
                        : keys.currentKey === "false"
                          ? false
                          : undefined,
                    )
                  }
                >
                  <SelectItem key="true" value="true">
                    Yes
                  </SelectItem>
                  <SelectItem key="false" value="false">
                    No
                  </SelectItem>
                </Select>
              )}
            />
            <ArrayInput
              append={appendCurrentMedication}
              classNames={{ container: "md:col-span-2" }}
              fields={currentMedications}
              label="Current Medications"
              placeholder="Enter medication name with frequency"
              remove={removeCurrentMedication}
              update={updateCurrentMedication}
            />
            <ArrayInput
              append={appendAllergy}
              classNames={{ container: "md:col-span-1" }}
              fields={allergies}
              label="Allergies"
              placeholder="Enter allergy name"
              remove={removeAllergy}
              update={updateAllergy}
            />
            <Controller
              control={control}
              name="medicalHistory"
              render={({ fieldState, field: { value, onChange } }) => (
                <Textarea
                  className="md:col-span-4"
                  description="Write any relevant information that your doctor might benefit from"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Medical History"
                  labelPlacement="outside"
                  placeholder="Ex: I have been sufferring from asthma since childhood"
                  type="text"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
          </div>
        </fieldset>
        <fieldset className="rounded-md border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold">
            Emergency Contact
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name="emergencyContactName"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Contact Name"
                  labelPlacement="outside"
                  placeholder="Ex: John Doe"
                  type="text"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="emergencyContactEmail"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Ex: johndoe@gmail.com"
                  type="text"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="emergencyContactNumber"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Phone Number"
                  labelPlacement="outside"
                  placeholder="Ex: +91 xxxxxxxxxx "
                  type="text"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
          </div>
        </fieldset>
        <fieldset className="rounded-md border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold">
            Insurance Details
          </legend>
          <div>
            {insuranceDetails.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col items-end gap-4 md:flex-row md:items-start"
              >
                <Controller
                  control={control}
                  name={`insuranceDetails.${index}.policyNumber`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Input
                      description="Enter your policy number"
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Policy Number"
                      labelPlacement="outside"
                      placeholder="Ex: xxxxxxxxxx"
                      type="text"
                      value={value}
                      onValueChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`insuranceDetails.${index}.insuranceProvider`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Input
                      description="Enter your insurance provider"
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Insurance Provider"
                      labelPlacement="outside"
                      placeholder="Ex: Bajaj"
                      type="text"
                      value={value}
                      onValueChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`insuranceDetails.${index}.coverageDetail`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Textarea
                      description="Enter your coverage details"
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Coverage Detail"
                      labelPlacement="outside"
                      placeholder="Ex: Full coverage for all medical expenses"
                      type="text"
                      value={value}
                      onValueChange={onChange}
                    />
                  )}
                />
                <Button isIconOnly onClick={() => removeInsuranceDetail(index)}>
                  <IoIosRemoveCircle />
                </Button>
              </div>
            ))}
          </div>
          <div className="grid place-content-center">
            <Button
              className="text-textPrimary"
              color="primary"
              startContent={<IoAdd />}
              onClick={() =>
                appendInsuranceDetail({
                  coverageDetail: "",
                  policyNumber: "",
                  insuranceProvider: "",
                })
              }
            >
              Add Insurance
            </Button>
          </div>
        </fieldset>
        <Button
          fullWidth
          className="text-textPrimary"
          color="primary"
          isLoading={status === "pending"}
          type="submit"
        >
          Update Profile
        </Button>
      </form>
    </>
  );
}

export default PatientProfileEditForm;
