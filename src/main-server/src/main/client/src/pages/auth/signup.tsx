import { DateInput } from "@nextui-org/date-input";
import { FaCalendarDays } from "react-icons/fa6";
import { Button } from "@nextui-org/button";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Controller, useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Link from "@/components/util/link";
import { useAuth } from "@/contexts/auth-context";
import { LoginRequest, Role, SignupRequest } from "@/types/backend-stubs";
import { ApiErrorCls, ValidationError } from "@/utils/error";
import { capitalize } from "@/utils/string";
import { calendarDateToJSDate, jsDateToCalendarDate } from "@/utils/date";
import FormError from "@/components/ui/form-error";
import { signupMut } from "@/react-query/mutations";

function SignupPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignupRequest & { role: Role }>({
    defaultValues: {
      dob: new Date(),
      role: "PATIENT",
      email: "",
      lastName: "",
      password: "",
      firstName: "",
    },
  });
  const selectedRole = watch("role");
  const signupMutation = useMutation({
    ...signupMut(selectedRole),
    onSuccess() {
      toast.success("Signup successful, now you can login to your account");
      navigate("/auth/login");
    },
    onError(error) {
      if (error instanceof ApiErrorCls) {
        setError("root", { message: error.message });
      } else if (error instanceof ValidationError) {
        Object.entries(error.validationErrors).forEach(([field, errMsg]) => {
          setError(field as keyof LoginRequest, {
            message: capitalize(errMsg),
          });
        });
      }
    },
  });

  if (auth.status === "authenticated") {
    return (
      <Navigate replace to={`/dashboard/${auth.user.role.toLowerCase()}`} />
    );
  }

  return (
    <div className="md:grid md:place-content-center">
      <Card className="mx-auto gap-4 p-4 md:min-w-[44rem]" shadow="lg">
        <CardHeader>
          <h1 className="flex-1 text-center text-3xl font-semibold lg:text-4xl">
            Signup
          </h1>
        </CardHeader>
        <CardBody className="gap-8">
          {errors.root && <FormError message={errors.root.message} />}
          <form onSubmit={handleSubmit(data => signupMutation.mutate(data))}>
            <Controller
              control={control}
              name="role"
              render={({ fieldState, field: { value, onChange } }) => (
                <RadioGroup
                  classNames={{
                    wrapper:
                      "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 mb-6",
                  }}
                  color="primary"
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="I am a"
                  value={value}
                  onValueChange={onChange}
                >
                  <Radio
                    key="PATIENT"
                    classNames={{
                      base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-3 border-2 border-default data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[invalid=true]:border-rose-600",
                      label:
                        "capitalize group-data-[selected=true]:text-white group-data-[selected=true]:font-bold",
                      wrapper:
                        "group-data-[selected=true]:bg-white group-data-[selected=true]:border-slate-400",
                    }}
                    value="PATIENT"
                  >
                    Patient
                  </Radio>
                  <Radio
                    key="DOCTOR"
                    classNames={{
                      base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-3 border-2 border-default data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[invalid=true]:border-rose-600",
                      label:
                        "capitalize group-data-[selected=true]:text-white group-data-[selected=true]:font-bold",
                      wrapper:
                        "group-data-[selected=true]:bg-white group-data-[selected=true]:border-slate-400",
                    }}
                    value="DOCTOR"
                  >
                    Doctor
                  </Radio>
                </RadioGroup>
              )}
            />

            <div className="mb-12 flex flex-row gap-4">
              <Controller
                control={control}
                name="firstName"
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
                name="lastName"
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
            </div>

            <Controller
              control={control}
              name="email"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  className="mb-12"
                  endContent={<MdEmail className="text-secondary" />}
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Ex: johndoe@gmail.com"
                  type="email"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ fieldState, field: { value, onChange } }) => (
                <Input
                  className="mb-4"
                  endContent={<FaLock className="text-secondary" />}
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Enter your password"
                  type="password"
                  value={value}
                  onValueChange={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="dob"
              render={({ fieldState, field: { value, onChange } }) => (
                <DateInput
                  className="mb-10"
                  endContent={<FaCalendarDays className="text-secondary" />}
                  errorMessage={fieldState.error?.message}
                  isInvalid={fieldState.invalid}
                  label="Date of Birth"
                  labelPlacement="outside"
                  value={jsDateToCalendarDate(value)}
                  onChange={date => onChange(calendarDateToJSDate(date))}
                />
              )}
            />
            <Button
              fullWidth
              className="text-textPrimary"
              color="primary"
              isLoading={signupMutation.isPending}
              type="submit"
            >
              Submit
            </Button>
          </form>
          <div className="text-center">
            <Link href="/auth/login" underline="hover">
              Already a user? Login Now!
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignupPage;
