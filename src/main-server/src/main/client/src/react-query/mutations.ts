import {
  AppointmentDto,
  DoctorAssignmentCreationDto,
  LoginRequest,
  LoginResponse,
  MedicalCaseCreationDto,
  QuestionnaireReviewDto,
  QuestionnaireSubmissionCreationDto,
  QuestionnaireSubmissionResponseDto,
  Role,
  SectionCreationDto,
  SignupRequest,
} from "@/types/backend-stubs";
import { fetchWithAuth, fetchWithoutAuth } from "@/utils/api";

export const loginUserMut = {
  mutationKey: ["auth", "login"],
  mutationFn: (credentials: LoginRequest) =>
    fetchWithoutAuth<LoginResponse>("/auth/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(credentials),
    }),
  invalidateKeys: ["auth", "user"],
} as const;

export const logoutUserMut = {
  mutationKey: ["auth", "logout"],
  mutationFn: () => fetchWithoutAuth<null>("/auth/logout", { method: "POST" }),
  invalidateKeys: ["auth", "user"],
} as const;

export const signupMut = (role: Role) =>
  ({
    mutationKey: ["auth", "signup"],
    mutationFn: (data: SignupRequest) =>
      fetchWithoutAuth<null>(`/auth/signup/${role}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  }) as const;

export const createAppointmentMut = (doctorAssignmentId: number) =>
  ({
    mutationKey: ["appointments", "create", doctorAssignmentId],
    mutationFn: (data: AppointmentDto) =>
      fetchWithAuth<null>(`/appointment/create/${doctorAssignmentId}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    invalidateKeys: ["appointments"],
  }) as const;

export const updateAppointmentMut = (appointmentId: number) =>
  ({
    mutationKey: ["appointments", "update", appointmentId],
    mutationFn: (data: AppointmentDto) =>
      fetchWithAuth<null>(`/appointment/update/${appointmentId}`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    invalidateKeys: ["appointments", "appointment", appointmentId],
  }) as const;

export const changeAppointmentStatusMut = (appointmentId: number) =>
  ({
    mutationKey: ["appointments", "changeStatus", appointmentId],
    mutationFn: (payload: { appointmentStatus: string }) =>
      fetchWithAuth<null>(`/appointment/change-status/${appointmentId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    invalidateKeys: ["appointments", "appointment", appointmentId],
  }) as const;

export const createMedicalCaseMut = {
  mutationKey: ["medicalCase", "create"],
  mutationFn: (data: MedicalCaseCreationDto) =>
    fetchWithAuth<null>("/medical-case", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  invalidateKeys: ["medicalCase"],
} as const;

export const markMedicalCaseAsResolvedMut = (medicalCaseId: number) =>
  ({
    mutationKey: ["medicalCase", "resolve", medicalCaseId],
    mutationFn: () =>
      fetchWithAuth<null>(`/medical-case/${medicalCaseId}/resolve`, {
        method: "PATCH",
      }),
    invalidateKeys: ["medicalCase"],
  }) as const;

export const assignDoctorToMedicalCaseMut = (medicalCaseId: number) =>
  ({
    mutationKey: ["medicalCase", "assignDoctor", medicalCaseId],
    mutationFn: (data: DoctorAssignmentCreationDto) =>
      fetchWithAuth<null>(`/medical-case/${medicalCaseId}/assign-doctor`, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    invalidateKeys: ["medicalCase", medicalCaseId],
  }) as const;

export const createQuestionnaireMut = {
  mutationKey: ["questionnaire", "create"],
  mutationFn: (data: SectionCreationDto[]) =>
    fetchWithAuth<null>("/questionnaire", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  invalidateKeys: ["questionnaire"],
} as const;

export const submitQuestionnaireResponseMut = (doctorAssignmentId: number) =>
  ({
    mutationKey: ["questionnaire", "submit", doctorAssignmentId],
    mutationFn: (data: QuestionnaireSubmissionCreationDto) =>
      fetchWithAuth<QuestionnaireSubmissionResponseDto>(
        `/questionnaire/submit?doctorAssignmentId=${doctorAssignmentId}`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      ),
    invalidateKeys: ["questionnaire"],
  }) as const;

export const predictQuestionnaireMut = {
  mutationFn: (data: QuestionnaireSubmissionCreationDto) =>
    fetchWithoutAuth<QuestionnaireSubmissionResponseDto>(
      "/questionnaire/predict",
      { method: "POST", body: JSON.stringify(data) },
    ),
};

export const reviewQuestionnaireSubmissionMut = (
  questionnaireSubmissionId: number,
) =>
  ({
    mutationKey: ["questionnaire", "review", questionnaireSubmissionId],
    mutationFn: (data: QuestionnaireReviewDto) =>
      fetchWithAuth<null>(
        `/questionnaire/${questionnaireSubmissionId}/review`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      ),
    invalidateKeys: ["questionnaire", questionnaireSubmissionId],
  }) as const;
