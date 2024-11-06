import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Navigate } from "react-router-dom";

import Link from "@/components/util/link";
import LoadingScreen from "@/components/ui/loading-screen";
import { useAuth } from "@/contexts/auth-context";
import { LoginRequest } from "@/types/backend-stubs";
import { ApiErrorCls, ValidationError } from "@/utils/error";
import { capitalize } from "@/utils/string";
import FormError from "@/components/ui/form-error";

function LoginPage() {
  const auth = useAuth();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>({ defaultValues: { email: "", password: "" } });

  if (auth.status === "authenticated") {
    return (
      <Navigate replace to={`/dashboard/${auth.user.role.toLowerCase()}`} />
    );
  } else if (auth.status === "loading") {
    return <LoadingScreen />;
  }

  const onSubmit: SubmitHandler<LoginRequest> = async data => {
    try {
      await auth.login.mutateAsync(data);
    } catch (error) {
      if (error instanceof ApiErrorCls) {
        setError("root", { message: error.message });
      } else if (error instanceof ValidationError) {
        Object.entries(error.validationErrors).forEach(([field, errMsg]) => {
          setError(field as keyof LoginRequest, {
            message: capitalize(errMsg),
          });
        });
      }
    }
  };

  return (
    <div className="md:grid md:place-content-center">
      <Card className="mx-auto gap-4 p-4 md:min-w-[44rem]" shadow="lg">
        <CardHeader>
          <h1 className="flex-1 text-center text-3xl font-semibold lg:text-4xl">
            Login
          </h1>
        </CardHeader>
        <CardBody className="gap-8">
          {errors.root && <FormError message={errors.root.message} />}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
              <Controller
                control={control}
                name="email"
                render={({ fieldState, field: { value, onChange } }) => (
                  <Input
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
            </div>
            <Button
              fullWidth
              className="text-textPrimary"
              color="primary"
              isLoading={auth.login.isPending}
              type="submit"
            >
              Submit
            </Button>
          </form>
          <div className="text-center">
            <Link href="/auth/signup" underline="hover">
              Not a user yet? Signup Now!
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default LoginPage;
