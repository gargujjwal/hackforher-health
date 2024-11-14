import {DateValue, getLocalTimeZone} from "@internationalized/date";
import {Button} from "@nextui-org/button";
import {Card, CardBody} from "@nextui-org/card";
import {DateInput, TimeInput, TimeInputValue} from "@nextui-org/date-input";
import {Input} from "@nextui-org/input";
import {Radio, RadioGroup} from "@nextui-org/radio";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {FaClock} from "react-icons/fa";
import {FaCalendarDays} from "react-icons/fa6";
import {IoWarning} from "react-icons/io5";
import {TiCancel} from "react-icons/ti";

import ShowDoctorCard from "../card/doctor-show-card";
import FormError from "../ui/form-error";

import {
  changeAppointmentStatusMut,
  createAppointmentMut,
  updateAppointmentMut,
} from "@/react-query/mutations";
import {AppointmentDto, MedicalCaseResponseDto} from "@/types/backend-stubs";
import {convertStartDateAndEndDate} from "@/utils/date";
import {ApiErrorCls, BaseError, ValidationError} from "@/utils/error";
import {capitalize} from "@/utils/string";

type Props =
    | {
  mode: "create";
  doctorAssignment: MedicalCaseResponseDto["doctorAssignments"][0];
  onAppointmentChange: () => void;
}
    | {
  mode: "update";
  appointment: AppointmentDto;
  doctorAssignment: MedicalCaseResponseDto["doctorAssignments"][0];
  onAppointmentChange: () => void;
};

type AppointmentInput = {
  date: DateValue | undefined;
  startTime: TimeInputValue | undefined;
  endTime: TimeInputValue | undefined;
};

const appointmentRules = [
  "Start and end time must be provided.",
  "Appointments must be scheduled in the future.",
  "Appointments must be scheduled at least 48 hours in advance.",
  "Appointment duration must be between 20 and 60 minutes.",
  "Appointments cannot be scheduled between 10 PM and 7 AM.",
  "For online appointments, a meet link is required and must be a valid URL.",
];

function AppointmentCreateUpdateForm(props: Props) {
  const queryClient = useQueryClient();
  const createAppointmentMutationObject = createAppointmentMut(
      props.doctorAssignment.id,
  );
  const {
    mutate: createAppointmentMutate,
    status: createAppointmentMutStatus,
  } = useMutation({
    ...createAppointmentMutationObject,
    onSuccess() {
      reset({});
      toast.success("Appointment created successfully");
      queryClient.invalidateQueries({
        queryKey: createAppointmentMutationObject.invalidateKeys,
        refetchType: "all",
      });
      props.onAppointmentChange();
    },
    onError(error) {
      if (error instanceof ApiErrorCls) {
        setError("root", {message: error.message});
      } else if (error instanceof ValidationError) {
        Object.entries(error.validationErrors).forEach(([field, errMsg]) => {
          setError(field as keyof AppointmentDto, {
            message: capitalize(errMsg),
          });
        });
      }
    },
  });
  const updateAppointmentMutateObject = updateAppointmentMut(
      props.mode === "update" ? props.appointment.id : 1,
  );
  const {
    mutate: updateAppointmentMutate,
    status: updateAppointmentMutStatus,
  } = useMutation({
    ...updateAppointmentMutateObject,
    onSuccess() {
      reset();
      toast.success("Appointment updated successfully");
      queryClient.invalidateQueries({
        queryKey: updateAppointmentMutateObject.invalidateKeys,
      });
      props.onAppointmentChange();
    },
    onError(error) {
      if (error instanceof ApiErrorCls) {
        setError("root", {message: error.message});
      } else if (error instanceof ValidationError) {
        Object.entries(error.validationErrors).forEach(([field, errMsg]) => {
          setError(field as keyof AppointmentDto, {
            message: capitalize(errMsg),
          });
        });
      }
    },
  });
  const changeAppointmentStatusMutateObject = changeAppointmentStatusMut(
      props.mode === "update" ? props.appointment.id : 1,
  );
  const {
    mutate: changeAppointmentStatusMutate,
    status: changeAppointmentStatusMutStatus,
  } = useMutation({
    ...changeAppointmentStatusMutateObject,
    onSuccess() {
      reset();
      toast.success("Appointment Status updated successfully");
      queryClient.invalidateQueries({
        queryKey: changeAppointmentStatusMutateObject.invalidateKeys,
      });
      props.onAppointmentChange();
    },

    onError(error) {
      if (error instanceof ApiErrorCls) {
        setError("root", {message: error.message});
      } else if (error instanceof ValidationError) {
        Object.entries(error.validationErrors).forEach(([field, errMsg]) => {
          setError(field as keyof AppointmentDto, {
            message: capitalize(errMsg),
          });
        });
      }
    },
  });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: {errors},
    reset,
  } = useForm<AppointmentDto>({
    defaultValues: props.mode === "update" ? props.appointment : undefined,
  });
  const [appointmentDatetime, setAppointmentDatetime] =
      useState<AppointmentInput | null>(() =>
          props.mode === "update"
              ? convertStartDateAndEndDate(
                  props.appointment.startTime,
                  props.appointment.endTime,
              )
              : null,
      );

  useEffect(() => {
    if (appointmentDatetime) {
      const {date, startTime, endTime} = appointmentDatetime;

      if (date) {
        const jsDate = date.toDate(getLocalTimeZone());

        if (startTime) {
          jsDate.setUTCHours(startTime.hour, startTime.minute);
          setValue("startTime", jsDate.toISOString());
        }
        if (endTime) {
          jsDate.setUTCHours(endTime.hour, endTime.minute);
          setValue("endTime", jsDate.toISOString());
        }
      }
    }
  }, [appointmentDatetime]);

  function handleAppointmentDateChange(date: DateValue) {
    setAppointmentDatetime(prev =>
        prev
            ? {...prev, date}
            : {date, startTime: undefined, endTime: undefined},
    );
  }

  function handleAppointmentTimeChange(attr: keyof AppointmentInput) {
    switch (attr) {
      case "endTime":
        return (endTime: TimeInputValue) =>
            setAppointmentDatetime(prev =>
                prev
                    ? {...prev, endTime}
                    : {endTime, startTime: undefined, date: undefined},
            );
      case "startTime":
        return (startTime: TimeInputValue) =>
            setAppointmentDatetime(prev =>
                prev
                    ? {...prev, startTime}
                    : {startTime, date: undefined, endTime: undefined},
            );
      default:
        throw new BaseError("Can't give date as input");
    }
  }

  return (
      <Card>
        <CardBody className="md:flex md:flex-row md:gap-4">
          <div className="md:flex-1">
            <div className="my-4 space-y-1.5 rounded bg-yellow-100 p-3 text-xs text-yellow-900">
              <h6 className="flex items-center gap-2 text-lg font-bold">
                <IoWarning className="size-6"/>
                <span>Warning:</span>
              </h6>
              <ol className="flex-grow list-inside list-decimal">
                {appointmentRules.map(rule => (
                    <li key={rule}>{rule}</li>
                ))}
              </ol>
            </div>

            <div className="mb-4 md:hidden">
              <ShowDoctorCard doctorAssignment={props.doctorAssignment}/>
            </div>

            {errors.root && <FormError message={errors.root.message}/>}
            <form
                onSubmit={handleSubmit(data =>
                    props.mode === "create"
                        ? createAppointmentMutate(data)
                        : updateAppointmentMutate(data),
                )}
            >
              <Controller
                  control={control}
                  name="appointmentType"
                  render={({fieldState, field: {value, onChange}}) => (
                      <RadioGroup
                          classNames={{
                            wrapper: "flex flex-row gap-4",
                          }}
                          color="primary"
                          errorMessage={fieldState.error?.message}
                          isInvalid={fieldState.invalid}
                          label="Appointment Type"
                          value={value}
                          onValueChange={onChange}
                      >
                        <Radio
                            key="ONLINE"
                            classNames={{
                              base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse min-w-[100px] max-w-[300px] cursor-pointer rounded-lg gap-4 p-2 md:p-3 border-2 border-default data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[invalid=true]:border-rose-600",
                              label:
                                  "capitalize group-data-[selected=true]:text-white group-data-[selected=true]:font-bold",
                              wrapper:
                                  "group-data-[selected=true]:bg-white group-data-[selected=true]:border-slate-400",
                            }}
                            value="ONLINE"
                        >
                          Online
                        </Radio>
                        <Radio
                            key="OFFLINE"
                            classNames={{
                              base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse min-w-[100px] max-w-[300px] cursor-pointer rounded-lg gap-4 p-2 md:p-3 border-2 border-default data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[invalid=true]:border-rose-600",
                              label:
                                  "capitalize group-data-[selected=true]:text-white group-data-[selected=true]:font-bold",
                              wrapper:
                                  "group-data-[selected=true]:bg-white group-data-[selected=true]:border-slate-400",
                            }}
                            value="OFFLINE"
                        >
                          Offline
                        </Radio>
                      </RadioGroup>
                  )}
              />

              {watch("appointmentType") === "ONLINE" && (
                  <Controller
                      control={control}
                      name="meetLink"
                      render={({fieldState, field: {value, onChange}}) => (
                          <>
                            <Input
                                className="pt-4 md:hidden"
                                errorMessage={fieldState.error?.message}
                                isInvalid={fieldState.invalid}
                                label="Meet Link"
                                labelPlacement="outside"
                                placeholder="Ex: https://meet.google.com/xfed3"
                                size="sm"
                                type="url"
                                value={value}
                                onValueChange={onChange}
                            />
                            <Input
                                className="hidden pt-4 md:flex"
                                errorMessage={fieldState.error?.message}
                                isInvalid={fieldState.invalid}
                                label="Meet Link"
                                labelPlacement="outside"
                                placeholder="Ex: https://meet.google.com/xfed3"
                                type="url"
                                value={value}
                                onValueChange={onChange}
                            />
                          </>
                      )}
                  />
              )}

              <fieldset className="my-6 space-y-3">
                <legend>Timings of the Meet</legend>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <DateInput
                      className="md:hidden"
                      endContent={<FaCalendarDays className="text-secondary"/>}
                      label="Date of Appointment"
                      labelPlacement="outside"
                      size="sm"
                      value={appointmentDatetime?.date}
                      onChange={handleAppointmentDateChange}
                  />
                  <DateInput
                      className="hidden md:flex"
                      endContent={<FaCalendarDays className="text-secondary"/>}
                      label="Date of Appointment"
                      labelPlacement="outside"
                      value={appointmentDatetime?.date}
                      onChange={handleAppointmentDateChange}
                  />
                  <TimeInput
                      className="md:hidden"
                      endContent={<FaClock className="text-secondary"/>}
                      errorMessage={errors.startTime?.message}
                      isInvalid={!!errors.startTime}
                      label="Start Time"
                      labelPlacement="outside"
                      size="sm"
                      value={appointmentDatetime?.startTime}
                      onChange={handleAppointmentTimeChange("startTime")}
                  />
                  <TimeInput
                      className="hidden md:flex"
                      endContent={<FaClock className="text-secondary"/>}
                      errorMessage={errors.startTime?.message}
                      isInvalid={!!errors.startTime}
                      label="Start Time"
                      labelPlacement="outside"
                      value={appointmentDatetime?.startTime}
                      onChange={handleAppointmentTimeChange("startTime")}
                  />
                  <TimeInput
                      className="md:hidden"
                      endContent={<FaClock className="text-secondary"/>}
                      errorMessage={errors.endTime?.message}
                      isInvalid={!!errors.endTime}
                      label="End Time"
                      labelPlacement="outside"
                      size="sm"
                      value={appointmentDatetime?.endTime}
                      onChange={handleAppointmentTimeChange("endTime")}
                  />
                  <TimeInput
                      className="hidden md:flex"
                      endContent={<FaClock className="text-secondary"/>}
                      errorMessage={errors.endTime?.message}
                      isInvalid={!!errors.endTime}
                      label="End Time"
                      labelPlacement="outside"
                      value={appointmentDatetime?.endTime}
                      onChange={handleAppointmentTimeChange("endTime")}
                  />
                </div>
              </fieldset>

              {props.mode === "create" ? (
                  <>
                    <Button
                        fullWidth
                        className="text-textPrimary md:hidden"
                        color="primary"
                        isLoading={createAppointmentMutStatus === "pending"}
                        size="sm"
                        type="submit"
                        onClick={() => clearErrors()}
                    >
                      Schedule Appointment
                    </Button>
                    <Button
                        fullWidth
                        className="hidden text-textPrimary md:flex"
                        color="primary"
                        isLoading={createAppointmentMutStatus === "pending"}
                        type="submit"
                        onClick={() => clearErrors()}
                    >
                      Schedule Appointment
                    </Button>
                  </>
              ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                        fullWidth
                        className="text-textPrimary md:hidden"
                        color="primary"
                        isLoading={updateAppointmentMutStatus === "pending"}
                        size="sm"
                        type="submit"
                        onClick={() => clearErrors()}
                    >
                      Update Appointment
                    </Button>
                    <Button
                        fullWidth
                        className="hidden text-textPrimary md:flex"
                        color="primary"
                        isLoading={updateAppointmentMutStatus === "pending"}
                        type="submit"
                        onClick={() => clearErrors()}
                    >
                      Update Appointment
                    </Button>
                    <Button
                        className="text-textPrimary md:hidden"
                        color="danger"
                        isLoading={changeAppointmentStatusMutStatus === "pending"}
                        size="sm"
                        startContent={<TiCancel/>}
                        onClick={() =>
                            changeAppointmentStatusMutate({
                              appointmentStatus: "CANCELLED",
                            })
                        }
                    >
                      Cancel Appointment
                    </Button>
                    <Button
                        className="hidden text-textPrimary md:flex"
                        color="danger"
                        isLoading={changeAppointmentStatusMutStatus === "pending"}
                        startContent={<TiCancel/>}
                        onClick={() =>
                            changeAppointmentStatusMutate({
                              appointmentStatus: "CANCELLED",
                            })
                        }
                    >
                      Cancel Appointment
                    </Button>
                  </div>
              )}
            </form>
          </div>

          <div className="hidden place-content-center md:grid">
            <ShowDoctorCard doctorAssignment={props.doctorAssignment}/>
          </div>
        </CardBody>
      </Card>
  );
}

export default AppointmentCreateUpdateForm;
