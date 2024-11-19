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
  createdAt: string;
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
  avgRating: number;
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
  doctor: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    dob: string;
    createdAt: string;
    role: Role;
    avgRating: number;
    noAppointmentsFailed: number;
    consultationTimings: ConsultationTiming[];
  };
}

export interface MedicalPublication {
  publicationName: string;
  publicationYear: number;
  publicationUrl: string;
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

export interface SignupRequest {
  email: string;
  firstName: string;
  lastName: string;
  dob: Date;
  password: string;
}

export type Role = "PATIENT" | "DOCTOR" | "ADMIN";

export type QuestionType = "MCQ" | "BOOLEAN" | "OPEN_ENDED";

export type ReviewStatus = "CORRECT" | "WRONG" | "NEEDS_DISCUSSION" | "PENDING";

export interface MedicalCaseCreationDto {
  caseDescription: string;
  doctorAssignments: {
    doctor: {
      id: number;
    };
  }[];
}

export interface MedicalCaseResponseDto {
  id: number;
  caseDescription: string;
  isResolved: boolean;
  patient: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    dob: string;
    createdAt: string;
    role: Role;
  };
  doctorAssignments: {
    id: number;
    assignedAt: string;
    unassignedAt: string | null;
    doctor: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      dob: string;
      createdAt: string;
      role: Role;
      avgRating: number;
      consultationTimings: ConsultationTiming[];
    };
    appointments: {
      id: number;
      startTime: string;
      endTime: string;
      appointmentType: AppointmentType;
      appointmentStatus: AppointmentStatus;
      createdAt: string;
      meetLink: string;
    }[];
    questionnaireSubmissions: {
      id: number;
      submittedAt: string;
      questionResponses: Record<number, string>;
      modelPrediction: ModelPrediction;
      reviewStatus: ReviewStatus;
      doctorNotes: string;
    }[];
  }[];
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PatientProfileDto {
  gender?: string;
  isSmoker: boolean;
  drinksAlcohol: boolean;
  bloodType?: string;
  medicalHistory?: string;
  foodPreference?: string;
  familyMedicalHistory?: string;
  address?: string;
  phoneNumber: string[];
  secondaryEmail?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  emergencyContactEmail?: string;
  insuranceDetails: Array<Insurance>;
  currentMedications: Array<string>;
  allergies: Array<string>;
  patient: PatientDto;
}

export interface QuestionnaireReviewDto {
  reviewStatus: ReviewStatus;
  doctorNotes?: string;
}

export interface QuestionnaireSubmissionCreationDto {
  questionResponses: Record<number, string>;
}

export interface QuestionnaireSubmissionResponseDto {
  id: number;
  submittedAt: string;
  questionResponses: Record<number, string>;
  modelPrediction: ModelPrediction;
  reviewStatus: ReviewStatus;
  doctorNotes: string;
}

export interface SectionCreationDto {
  title: string;
  questions: {
    text: string;
    placeholderText: string;
    descriptionText: string;
    type: QuestionType;
    options?: string[];
  }[];
}

export interface SectionResponseDto {
  id: number;
  title: string;
  questions: {
    id: number;
    text: string;
    placeholderText: string;
    descriptionText: string;
    type: QuestionType;
    options?: string[];
  }[];
}

export interface ModelPrediction {
  hasCervicalCancer: boolean;
  accuracy: number;
  predictedAt: string;
}

export interface Insurance {
  policyNumber: string;
  insuranceProvider: string;
  coverageDetail: string;
}

export interface MedicalQualification {
  qualificationName: string;
  institutionName: string;
  year: number;
  certificateUrl: string;
}

export interface ChatMessasgeResponseDto {
  id: number;
  senderRole: Role;
  message: string;
  sentAt: string;
}

export interface ChatMessageCreationDto {
  senderRole: Role;
  message: string;
}
