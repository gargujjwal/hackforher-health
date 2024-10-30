export interface ApiError {
  code: string;
  description: string;
  message: string;
  validationErrors?: Readonly<Record<string, string>>;
}

export type ApiResponse<T> =
    | { data: T; error: null; timestamp: string }
    | { data: null; error: ApiError; timestamp: string };

export interface AppointmentDto {
  startTime: string;
  endTime: string;
  appointmentType: AppointmentType;
  meetLink: string;
  id: number;
  appointmentStatus: AppointmentStatus;
}

export type AppointmentType = "ONLINE" | "OFFLINE";

export type AppointmentStatus =
    | "PENDING"
    | "ACCEPTED"
    | "REJECTED"
    | "CANCELLED"
    | "COMPLETED";

export interface DoctorAssignmentCreationDto {
  doctorId: number;
}

export interface PatientDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  createdAt: string;
  role: Role;
}

export interface DoctorDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  createdAt: string;
  role: Role;
  avgRating: number | null;
  noAppointmentsFailed: number;
}

export type AuthenticatedUserResponse = PatientDto | DoctorDto;

export interface DoctorProfileDto {
  medicalCertificatePath?: string;
  medicalLicenseNumber: string;
  address: string;
  phoneNumber: string;
  secondaryEmail: string;
  qualifications: MedicalQualification[];
  publications: MedicalPublication[];
  avgRating?: number;
  noAppointmentsFailed?: number;
  consultationTimings?: ConsultationTiming[];
}

export interface MedicalQualification {
  qualificationName: string;
  institutionName: string;
  year: number;
  certificateUrl: string;
}

export interface MedicalPublication {
  publicationName?: string;
  publicationYear?: number;
  publicationUrl?: string;
}

export interface ConsultationTiming {
  day: DayOfWeek;
  startTime: string;
  endTime: string;
}

export type DayOfWeek =
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  role: Role;
  accessToken: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  dob: string;
}

export interface RefreshAuthResponse {
  accessToken: string;
}

export type Role = "PATIENT" | "DOCTOR" | "ADMIN";
