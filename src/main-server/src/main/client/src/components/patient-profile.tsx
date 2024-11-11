import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaHeart,
  FaHistory,
  FaHome,
  FaIdCard,
  FaPhone,
  FaPills,
  FaSmoking,
  FaUser,
  FaUsers,
  FaWineGlass,
} from "react-icons/fa";

import { PatientProfileDto } from "@/types/backend-stubs";
import { getInitials } from "@/utils/string";

type Props = {
  patientProfile: PatientProfileDto;
};

function PatientProfile({ patientProfile }: Props) {
  const patient = patientProfile.patient;

  return (
    <div className="bg-layout-background min-h-screen w-full p-2 sm:p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        {/* Header Section */}
        <Card className="w-full bg-white/90 shadow-lg">
          <CardBody className="p-4 sm:p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <Avatar
                showFallback
                className="h-20 w-20 sm:h-24 sm:w-24"
                fallback={
                  <span className="text-xl">
                    {getInitials(patient.firstName, patient.lastName)}
                  </span>
                }
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                      {patient.firstName} {patient.lastName}
                    </h1>
                    <div className="mt-1 flex items-center justify-center gap-2 sm:justify-start">
                      <FaEnvelope className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 sm:text-base">
                        {patient.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 sm:items-end">
                    <Badge className="flex items-center bg-primary text-textPrimary">
                      <FaIdCard className="mr-1 size-6" />
                      <span>ID: {patient.id}</span>
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-1 h-3 w-3" />
                      <span>
                        Member since{" "}
                        {new Date(patient.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <Card className="bg-white/90 shadow-lg">
            <CardHeader className="flex items-center gap-2 p-4">
              <FaUser className="h-5 w-5" />
              <h2 className="text-lg font-semibold sm:text-xl">
                Personal Information
              </h2>
            </CardHeader>
            <CardBody className="space-y-4 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <span className="text-sm text-gray-500">Gender</span>
                  <p className="font-medium">
                    {patientProfile.gender || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Date of Birth</span>
                  <p className="font-medium">
                    {new Date(patient.dob).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Blood Type</span>
                  <p className="font-medium">
                    {patientProfile.bloodType || "Not specified"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <FaSmoking className="h-4 w-4" />
                    <span
                      className={
                        patientProfile.isSmoker
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {patientProfile.isSmoker ? "Smoker" : "Non-smoker"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaWineGlass className="h-4 w-4" />
                    <span
                      className={
                        patientProfile.drinksAlcohol
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {patientProfile.drinksAlcohol ? "Drinks" : "Non-drinker"}
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white/90 shadow-lg">
            <CardHeader className="flex items-center gap-2 p-4">
              <FaPhone className="h-5 w-5" />
              <h2 className="text-lg font-semibold sm:text-xl">
                Contact Information
              </h2>
            </CardHeader>
            <CardBody className="space-y-4 p-4">
              <div className="space-y-3">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                  <FaPhone className="h-4 w-4 text-gray-500" />
                  <div className="flex flex-wrap gap-2">
                    {patientProfile.phoneNumber.length === 0 && (
                      <p className="w-full text-gray-400">
                        Phone-Numbers added by you in the profile would appear
                        here and to your doctor
                      </p>
                    )}
                    {patientProfile.phoneNumber.map((phone, index) => (
                      <Chip key={index} color="primary" variant="flat">
                        {phone}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FaHome className="mt-1 h-4 w-4 text-gray-500" />
                  <span className="flex-1">
                    {patientProfile.address || "No address provided"}
                  </span>
                </div>
                <Divider />
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 font-medium">
                    <FaExclamationCircle className="h-4 w-4" />
                    <span>Emergency Contact</span>
                  </h3>
                  <div className="ml-6 space-y-1 text-sm sm:text-base">
                    <p>
                      {patientProfile.emergencyContactName ||
                        "Contact Name Not specified"}
                    </p>
                    <p>
                      {patientProfile.emergencyContactNumber ||
                        "Contact Number Not specified"}
                    </p>
                    <p>
                      {patientProfile.emergencyContactEmail ||
                        "Contact Email Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Medical Information */}
          <Card className="bg-white/90 shadow-lg lg:col-span-2">
            <CardHeader className="flex items-center gap-2 p-4">
              <FaHeart className="h-5 w-5" />
              <h2 className="text-lg font-semibold sm:text-xl">
                Medical Information
              </h2>
            </CardHeader>
            <CardBody className="space-y-6 p-4">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 flex items-center gap-2 font-medium">
                      <FaPills className="h-4 w-4" />
                      <span>Current Medications</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {patientProfile.currentMedications.length === 0 && (
                        <p className="w-full text-gray-400">
                          Medications added by you in the profile would appear
                          here and to your doctor
                        </p>
                      )}
                      {patientProfile.currentMedications.map((med, index) => (
                        <Chip key={index} color="secondary" variant="flat">
                          {med}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 flex items-center gap-2 font-medium">
                      <FaExclamationTriangle className="h-4 w-4" />
                      <span>Allergies</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {patientProfile.allergies.length === 0 && (
                        <p className="w-full text-gray-400">
                          Allergies added by you in the profile would appear
                          here and to your doctor
                        </p>
                      )}
                      {patientProfile.allergies.map((allergy, index) => (
                        <Chip key={index} color="danger" variant="flat">
                          {allergy}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 flex items-center gap-2 font-medium">
                      <FaHistory className="h-4 w-4" />
                      <span>Medical History</span>
                    </h3>
                    <p className="text-sm text-gray-600 sm:text-base">
                      {patientProfile.medicalHistory ||
                        "No medical history provided"}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 flex items-center gap-2 font-medium">
                      <FaUsers className="h-4 w-4" />
                      <span>Family Medical History</span>
                    </h3>
                    <p className="text-sm text-gray-600 sm:text-base">
                      {patientProfile.familyMedicalHistory ||
                        "No family medical history provided"}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Insurance Information */}
          <Card className="bg-white/90 shadow-lg lg:col-span-2">
            <CardHeader className="flex items-center gap-2 p-4">
              <FaFileAlt className="h-5 w-5" />
              <h2 className="text-lg font-semibold sm:text-xl">
                Insurance Information
              </h2>
            </CardHeader>
            <CardBody className="p-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {patientProfile.insuranceDetails.length === 0 && (
                  <p className="w-full text-gray-400">
                    --Add some insurance details, which then will appear here--
                  </p>
                )}
                {patientProfile.insuranceDetails.map((insurance, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-white/50 p-4"
                  >
                    <h3 className="mb-2 font-medium">
                      {insurance.insuranceProvider}
                    </h3>
                    <div className="space-y-2 text-sm sm:text-base">
                      <p>
                        <span className="text-gray-500">Policy Number:</span>{" "}
                        {insurance.policyNumber}
                      </p>
                      <p>
                        <span className="text-gray-500">Coverage:</span>{" "}
                        {insurance.coverageDetail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
