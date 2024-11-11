import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  FaAward,
  FaBook,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
} from "react-icons/fa";

import CardTitle from "./card/card-title";
import Link from "./util/link";

import { DayOfWeek, DoctorProfileDto } from "@/types/backend-stubs";
import { formatTime } from "@/utils/date";

type Props = { doctorProfile: DoctorProfileDto };
function DoctorProfile({ doctorProfile }: Props) {
  const {
    doctor,
    medicalLicenseNumber,
    address,
    phoneNumber,
    secondaryEmail,
    qualifications = [],
    publications = [],
  } = doctorProfile;

  const weekDays = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ] as DayOfWeek[];

  const getConsultationTimings = (day: DayOfWeek) => {
    return doctor.consultationTimings
      .filter(timing => timing.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-4">
      {/* Header Section */}
      <Card className="w-full">
        <CardBody className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
            <Avatar
              showFallback
              className="h-20 w-20 sm:h-24 sm:w-24"
              fallback={
                <span className="text-xl">
                  {getInitials(doctor.firstName, doctor.lastName)}
                </span>
              }
            />

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                Dr. {doctor.firstName} {doctor.lastName}
              </h1>

              <div className="flex items-center gap-2">
                <FaStar className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">
                  {doctor.avgRating.toFixed(1)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <p>License: {medicalLicenseNumber || "Not Provided"}</p>
                {doctor.noAppointmentsFailed === 0 && <p>Perfect Attendance</p>}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="h-5 w-5 text-gray-500" />
              <span>{address || "Address not provided"}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="h-5 w-5 text-gray-500" />
              <span>{phoneNumber || "Phone number not provided"}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="h-5 w-5 text-gray-500" />
              <span>{doctor.email || "Email not provided"}</span>
            </div>
            {secondaryEmail && (
              <div className="flex items-center gap-3">
                <FaEnvelope className="h-5 w-5 text-gray-500" />
                <span>{secondaryEmail}</span>
              </div>
            )}
          </CardBody>
        </Card>
        {/* Publications */}
        <Card>
          <CardHeader>
            <CardTitle>Publications</CardTitle>
          </CardHeader>
          <CardBody>
            {publications.length > 0 ? (
              <div className="space-y-4">
                {publications.map((pub, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaBook className="mt-1 h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium">{pub.publicationName}</div>
                      <div className="text-sm text-gray-600">
                        Published in {pub.publicationYear}
                      </div>
                      {pub.publicationUrl && (
                        <Link
                          isExternal
                          showAnchorIcon
                          href={pub.publicationUrl}
                          target="_blank"
                          underline="hover"
                        >
                          View Publication
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No publications provided</div>
            )}
          </CardBody>
        </Card>
        {/* Qualifications */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Qualifications</CardTitle>
          </CardHeader>
          <CardBody>
            {qualifications.length > 0 ? (
              <div className="space-y-4">
                {qualifications.map((qual, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaAward className="mt-1 h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium">
                        {qual.qualificationName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {qual.institutionName} • {qual.year}
                      </div>
                      {qual.certificateUrl && (
                        <Link
                          isExternal
                          showAnchorIcon
                          href={qual.certificateUrl}
                          target="_blank"
                          underline="hover"
                        >
                          View Certificate
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No qualifications provided</div>
            )}
          </CardBody>
        </Card>
        {/* Consultation Schedule */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Consultation Hours</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {weekDays.map(day => {
                const timings = getConsultationTimings(day);

                return (
                  <div key={day} className="rounded-lg border p-3">
                    <div className="mb-2 text-base font-medium">{day}</div>
                    {timings.length > 0 ? (
                      <div className="space-y-2">
                        {timings.map((timing, index) => (
                          <div
                            key={`${day}-${index}`}
                            className="rounded bg-gray-50 p-2 text-sm"
                          >
                            {formatTime(timing.startTime)} -{" "}
                            {formatTime(timing.endTime)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">
                        No consultation
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>{" "}
      </div>
    </div>
  );
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0] || ""}${lastName[0] || ""}`;
};

export default DoctorProfile;
