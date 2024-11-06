import {TiTick} from "react-icons/ti";
import {Divider} from "@nextui-org/divider";
import {Avatar} from "@nextui-org/avatar";
import {Badge} from "@nextui-org/badge";
import {Button} from "@nextui-org/button";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {FaMapMarkerAlt, FaStar} from "react-icons/fa";

import {calculateAge, formatDistanceFromNow} from "@/utils/date";
import {DoctorProfileDto} from "@/types/backend-stubs";
import Link from "@/components/util/link";

type Props = Readonly<{
  doctorProfile: DoctorProfileDto;
  onSelect: (doctorId: number) => void;
  isSelected: boolean;
}>;

function DoctorCard({doctorProfile, isSelected, onSelect}: Props) {
  const {
    doctor: {firstName, lastName, dob, createdAt, avgRating},
    address,
    qualifications,
    publications,
  } = doctorProfile;

  const age = calculateAge(dob);
  const memberSince = formatDistanceFromNow(createdAt);

  return (
      <Card
          isHoverable
          className={`p-4 w-full max-w-sm border-2 ${isSelected ? "border-primary bg-accent" : ""}`}
      >
        <Badge
            className=""
            color="primary"
            content={
              <div className="flex items-center justify-center gap-0.5">
                {avgRating > 0 ? avgRating.toFixed(1) : "NR"}
                <FaStar/>
              </div>
            }
            shape="rectangle"
            variant="flat"
        >
          <CardHeader className="flex flex-col items-center lg:flex-row lg:justify-between">
            <div className="flex items-center space-x-3">
              <Avatar
                  isBordered
                  classNames={{name: "text-textPrimary", base: "hidden sm:flex"}}
                  color="primary"
                  name={`${firstName[0]}${lastName[0]}`}
                  size="lg"
              />
              <div>
                <h3 className="sm:text-lg font-bold">
                  Dr. {firstName} {lastName}, {age} yrs
                </h3>
                {address && (
                    <p className="text-sm text-gray-600 flex items-center space-x-1">
                      <FaMapMarkerAlt/> <span>{address}</span>
                    </p>
                )}
              </div>
            </div>
          </CardHeader>
        </Badge>

        <Divider/>

        <CardBody>
          <div className="mt-2 text-sm text-gray-500">
            <p>{qualifications.length} Qualifications</p>
            <p>{publications.length} Publications</p>
            <p className="text-xs text-gray-500">Member since {memberSince}</p>
          </div>

          <div className="flex justify-center gap-4">
            {isSelected ? (
                <>
                  <Button
                      className="text-textSecondary mt-4 sm:hidden"
                      color="secondary"
                      size="sm"
                      startContent={<TiTick className="text-textSecondary"/>}
                  >
                    Selected
                  </Button>
                  <Button
                      className="text-textSecondary mt-4 hidden sm:flex"
                      color="secondary"
                      startContent={<TiTick className="text-textSecondary"/>}
                  >
                    Selected
                  </Button>
                </>
            ) : (
                <>
                  <Button
                      className="text-textPrimary mt-4 sm:hidden"
                      color="primary"
                      size="sm"
                      startContent={<TiTick className="text-textPrimary"/>}
                      onClick={onSelect.bind(null, doctorProfile.doctor.id)}
                  >
                    Select
                  </Button>
                  <Button
                      className="text-textPrimary mt-4 hidden sm:flex"
                      color="primary"
                      startContent={<TiTick className="text-textPrimary"/>}
                      onClick={onSelect.bind(null, doctorProfile.doctor.id)}
                  >
                    See More
                  </Button>
                </>
            )}

            <Button
                as={Link}
                className="text-textPrimary mt-4 sm:hidden"
                color="primary"
                href={`/doctor-profile/${doctorProfile.doctor.id}`}
                size="sm"
            >
              See More
            </Button>
            <Button
                as={Link}
                className="text-textPrimary mt-4 hidden sm:flex"
                color="primary"
                href={`/doctor-profile/${doctorProfile.doctor.id}`}
            >
              See More
            </Button>
          </div>
        </CardBody>
      </Card>
  );
}

export default DoctorCard;
