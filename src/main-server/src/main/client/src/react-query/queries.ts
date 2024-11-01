import {
  AppointmentDto,
  AuthenticatedUserResponse,
  MedicalCaseResponseDto,
  PageResponse,
  QuestionnaireSubmissionResponseDto,
  SectionResponseDto,
} from "@/types/backend-stubs";
import { fetchWithAuth } from "@/utils/api";

export const authenticatedUser = {
  queryKey: ["auth", "user"],
  queryFn: () =>
    fetchWithAuth<AuthenticatedUserResponse>("/auth/me", { method: "GET" }),
  retry: 1,
} as const;

export const getAppointmentsByDoctorAssignmentId = (
  doctorAssignmentId: number,
  page: number = 0,
  size: number = 10,
) =>
  ({
    queryKey: [
      "appointments",
      "doctorAssignment",
      doctorAssignmentId,
      page,
      size,
    ],
    queryFn: () =>
      fetchWithAuth<PageResponse<AppointmentDto>>(
        `/appointment/doctor-assignment/${doctorAssignmentId}?page=${page}&size=${size}`,
        { method: "GET" },
      ),
  }) as const;

export const getAppointmentsByPatientId = (
  patientId: number,
  page: number = 0,
  size: number = 10,
) =>
  ({
    queryKey: ["appointments", "patient", patientId, page, size],
    queryFn: () =>
      fetchWithAuth<PageResponse<AppointmentDto>>(
        `/appointment/patient/${patientId}?page=${page}&size=${size}`,
        { method: "GET" },
      ),
  }) as const;

export const getAppointmentById = (appointmentId: number) =>
  ({
    queryKey: ["appointments", "appointment", appointmentId],
    queryFn: () =>
      fetchWithAuth<AppointmentDto>(`/appointment/${appointmentId}`, {
        method: "GET",
      }),
  }) as const;

export const getAppointmentsByDoctorId = (
  doctorId: number,
  page: number = 0,
  size: number = 10,
) =>
  ({
    queryKey: ["appointments", "doctor", doctorId, page, size],
    queryFn: () =>
      fetchWithAuth<PageResponse<AppointmentDto>>(
        `/appointment/doctor/${doctorId}?page=${page}&size=${size}`,
        { method: "GET" },
      ),
  }) as const;

export const getUnresolvedMedicalCaseByPatientId = (patientId: number) =>
  ({
    queryKey: ["medicalCase", "unresolved", patientId],
    queryFn: () =>
      fetchWithAuth<MedicalCaseResponseDto>(
        `/medical-case/unresolved/${patientId}`,
        { method: "GET" },
      ),
  }) as const;

export const getMedicalCaseById = (medicalCaseId: number) =>
  ({
    queryKey: ["medicalCase", medicalCaseId],
    queryFn: () =>
      fetchWithAuth<MedicalCaseResponseDto>(`/medical-case/${medicalCaseId}`, {
        method: "GET",
      }),
  }) as const;

export const getMedicalCasesByPatientId = (
  patientId: number,
  page: number = 0,
  size: number = 10,
  sortBy: string = "createdAt",
  direction: string = "desc",
) =>
  ({
    queryKey: [
      "medicalCase",
      "patient",
      patientId,
      page,
      size,
      sortBy,
      direction,
    ],
    queryFn: () =>
      fetchWithAuth<PageResponse<MedicalCaseResponseDto>>(
        `/medical-case/patient/${patientId}?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
        { method: "GET" },
      ),
  }) as const;

export const getMedicalCasesByDoctorId = (
  doctorId: number,
  page: number = 0,
  size: number = 10,
  sortBy: string = "createdAt",
  direction: string = "desc",
) =>
  ({
    queryKey: [
      "medicalCase",
      "doctor",
      doctorId,
      page,
      size,
      sortBy,
      direction,
    ],
    queryFn: () =>
      fetchWithAuth<PageResponse<MedicalCaseResponseDto>>(
        `/medical-case/doctor/${doctorId}?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`,
        { method: "GET" },
      ),
  }) as const;

export const getQuestionnaireSubmissionsOfMedicalCase = (
  medicalCaseId: number,
  doctorId: number,
) =>
  ({
    queryKey: [
      "medicalCase",
      "questionnaireSubmissions",
      medicalCaseId,
      doctorId,
    ],
    queryFn: () =>
      fetchWithAuth<QuestionnaireSubmissionResponseDto[]>(
        `/medical-case/${medicalCaseId}/questionnaire-submission/doctor/${doctorId}`,
        { method: "GET" },
      ),
  }) as const;

export const getQuestionnaireQuery = {
  queryKey: ["questionnaire"],
  queryFn: () =>
    fetchWithAuth<SectionResponseDto[]>("/questionnaire", { method: "GET" }),
  retry: 1,
} as const;

export const getQuestionnaireSubmissionById = (
  questionnaireSubmissionId: number,
) =>
  ({
    queryKey: ["questionnaire", "submission", questionnaireSubmissionId],
    queryFn: () =>
      fetchWithAuth<QuestionnaireSubmissionResponseDto>(
        `/questionnaire/${questionnaireSubmissionId}`,
        { method: "GET" },
      ),
  }) as const;
