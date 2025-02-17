import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import FormError from "./ui/form-error";
import H1 from "./ui/h1";

import { updateDoctorProfileMut } from "@/react-query/mutations";
import { DayOfWeek, DoctorProfileDto } from "@/types/backend-stubs";
import { ApiErrorCls, ValidationError } from "@/utils/error";
import { capitalize } from "@/utils/string";

type Props = {
  profile: DoctorProfileDto;
};

const weekDays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as DayOfWeek[];

function DoctorProfileEditForm({ profile }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateDoctorProfileMutationObject = updateDoctorProfileMut(
    profile.doctor.id,
  );
  const { mutate, status } = useMutation({
    ...updateDoctorProfileMutationObject,
    onSuccess() {
      toast.success("Doctor profile updated successfully");
      queryClient.invalidateQueries({
        queryKey: updateDoctorProfileMutationObject.invalidateKeys,
      });
      navigate("/dashboard/doctor/profile");
    },
    onError(error) {
      if (error instanceof ApiErrorCls) {
        setError("root", { message: error.message });
      } else if (error instanceof ValidationError) {
        Object.entries(error.validationErrors).forEach(([field, errMsg]) => {
          setError(field as keyof DoctorProfileDto, {
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
    handleSubmit,
  } = useForm<DoctorProfileDto>({ defaultValues: profile });
  const {
    fields: qualifications,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({ control, name: "qualifications" });
  const {
    fields: publications,
    append: appendPublication,
    remove: removePublication,
  } = useFieldArray({ control, name: "publications" });
  const {
    fields: consultationTimings,
    append: appendTiming,
    remove: removeTiming,
  } = useFieldArray({ control, name: "doctor.consultationTimings" });

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
              name="doctor.firstName"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="First Name"
                  labelPlacement="outside"
                  placeholder="Ex: John"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="doctor.lastName"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Last Name"
                  labelPlacement="outside"
                  placeholder="Ex: Doe"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Phone Number"
                  labelPlacement="outside"
                  placeholder="Ex: +91 xxxxxxxxxx"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="secondaryEmail"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Secondary Email"
                  labelPlacement="outside"
                  placeholder="Ex: john.doe@gmail.com"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
          </div>
        </fieldset>

        <fieldset className="rounded-md border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold">
            Professional Details
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              control={control}
              name="medicalLicenseNumber"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Medical License Number"
                  labelPlacement="outside"
                  placeholder="Ex: ML123456"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="address"
              render={({ fieldState, field: { value, onChange } }) => (
                <Textarea
                  className="md:col-span-2"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Clinic/Hospital Address"
                  labelPlacement="outside"
                  placeholder="Enter your practice address"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
          </div>
        </fieldset>

        <fieldset className="rounded-md border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold">Qualifications</legend>
          <div className="space-y-4">
            {qualifications.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col items-end gap-4 md:flex-row md:items-start"
              >
                <Controller
                  control={control}
                  name={`qualifications.${index}.qualificationName`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Input
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Qualification"
                      labelPlacement="outside"
                      placeholder="Ex: MBBS"
                      value={value}
                      onValueChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`qualifications.${index}.institutionName`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Input
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Institution"
                      labelPlacement="outside"
                      placeholder="Ex: AIIMS Delhi"
                      value={value}
                      onValueChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`qualifications.${index}.year`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Input
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Year"
                      labelPlacement="outside"
                      placeholder="Ex: 2020"
                      type="number"
                      value={value?.toString()}
                      onValueChange={val => onChange(parseInt(val))}
                    />
                  )}
                />
                <Button isIconOnly onClick={() => removeQualification(index)}>
                  <IoIosRemoveCircle />
                </Button>
              </div>
            ))}
            <div className="grid place-content-center">
              <Button
                className="text-textPrimary"
                color="primary"
                startContent={<IoAdd />}
                onClick={() =>
                  appendQualification({
                    qualificationName: "",
                    institutionName: "",
                    year: new Date().getFullYear(),
                    certificateUrl: "",
                  })
                }
              >
                Add Qualification
              </Button>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-md border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold">Publications</legend>
          <div className="space-y-4">
            {publications.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col items-end gap-4 md:flex-row md:items-start"
              >
                <Controller
                  control={control}
                  name={`publications.${index}.publicationName`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Input
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Publication Title"
                      labelPlacement="outside"
                      placeholder="Enter publication title"
                      value={value}
                      onValueChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`publications.${index}.publicationYear`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Input
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Year"
                      labelPlacement="outside"
                      placeholder="Ex: 2020"
                      type="number"
                      value={value?.toString()}
                      onValueChange={val => onChange(parseInt(val))}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`publications.${index}.publicationUrl`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Input
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Publication URL"
                      labelPlacement="outside"
                      placeholder="Enter publication URL"
                      value={value}
                      onValueChange={onChange}
                    />
                  )}
                />
                <Button isIconOnly onClick={() => removePublication(index)}>
                  <IoIosRemoveCircle />
                </Button>
              </div>
            ))}
            <div className="grid place-content-center">
              <Button
                className="text-textPrimary"
                color="primary"
                startContent={<IoAdd />}
                onClick={() =>
                  appendPublication({
                    publicationName: "",
                    publicationYear: new Date().getFullYear(),
                    publicationUrl: "",
                  })
                }
              >
                Add Publication
              </Button>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-md border border-gray-300 p-4">
          <legend className="px-2 text-lg font-semibold">
            Consultation Hours
          </legend>
          <div className="space-y-4">
            {consultationTimings.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col items-end gap-4 md:flex-row md:items-start"
              >
                <Controller
                  control={control}
                  name={`doctor.consultationTimings.${index}.day`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Select
                      defaultSelectedKeys={[
                        profile.doctor.consultationTimings[index].day,
                      ]}
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Day"
                      placeholder="Select day"
                      selectedKeys={[value]}
                      value={value}
                      onSelectionChange={keys => onChange(keys.currentKey)}
                    >
                      {weekDays.map(day => (
                        <SelectItem key={day} value={day}>
                          {capitalize(day)}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name={`doctor.consultationTimings.${index}.startTime`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Input
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="Start Time"
                      labelPlacement="outside"
                      type="time"
                      value={value}
                      onValueChange={onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name={`doctor.consultationTimings.${index}.endTime`}
                  render={({ fieldState, field: { value, onChange } }) => (
                    <Input
                      errorMessage={fieldState.error?.message}
                      isInvalid={fieldState.invalid}
                      label="End Time"
                      labelPlacement="outside"
                      type="time"
                      value={value}
                      onValueChange={onChange}
                    />
                  )}
                />
                <Button isIconOnly onClick={() => removeTiming(index)}>
                  <IoIosRemoveCircle />
                </Button>
              </div>
            ))}
            <div className="grid place-content-center">
              <Button
                className="text-textPrimary"
                color="primary"
                startContent={<IoAdd />}
                onClick={() =>
                  appendTiming({
                    day: "MONDAY",
                    startTime: "09:00",
                    endTime: "17:00",
                  })
                }
              >
                Add Consultation Hours
              </Button>
            </div>
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

export default DoctorProfileEditForm;
