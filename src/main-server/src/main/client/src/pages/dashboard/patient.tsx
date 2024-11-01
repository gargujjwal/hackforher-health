import { FaBriefcaseMedical, FaUserClock } from "react-icons/fa6";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaClipboardQuestion } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import { useAuth } from "@/contexts/auth-context";
import Link from "@/components/util/link";

function PatientDashboard() {
  const auth = useAuth();

  if (auth.status !== "authenticated") {
    return null;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-6 lg:text-3xl">
        Welcome {auth.user.firstName},
      </h1>
      <p className="text-xs mb-2 md:text-sm lg:text-base">
        What what would you like to do today,
      </p>

      <ul className="grid grid-cols-2 gap-1.5 md:gap-3 lg:grid-cols-4 xl:gap-4">
        <li>
          <Card
            as={Link}
            className="bg-cardAccent1 text-white h-full w-full text-center"
            href="/dashboard/patient/medical-case"
          >
            <CardHeader className="text-xl font-bold text-buttonText justify-center">
              Medical Case
            </CardHeader>
            <CardBody className="items-center">
              <FaBriefcaseMedical className="text-buttonText size-8" />
            </CardBody>
            <CardFooter className="text-xs md:text-sm text-buttonText flex items-center justify-center space-x-0.5">
              <p>View</p>
              <LuDot />
              <p>Create</p>
            </CardFooter>
          </Card>
        </li>
        <li>
          <Card
            as={Link}
            className="bg-cardAccent2 text-white h-full w-full"
            href="/dashboard/patient/questionnaire"
          >
            <CardHeader className="text-xl font-bold text-headline justify-center">
              Questionnaire
            </CardHeader>
            <CardBody className="items-center">
              <FaClipboardQuestion className="text-headline size-8" />
            </CardBody>
            <CardFooter className="text-xs md:text-sm text-textSecondary justify-center">
              <p>Check for Cervical Cancer with AI</p>
            </CardFooter>
          </Card>
        </li>
        <li>
          <Card
            as={Link}
            className="bg-cardAccent3 text-white h-full w-full justify-between"
            href="/dashboard/patient/appointment"
          >
            <CardHeader className="text-xl justify-center font-extrabold text-white drop-shadow-md">
              Appointment
            </CardHeader>
            <CardBody className="items-center">
              <FaUserClock className="text-white size-8" />
            </CardBody>
            <CardFooter className="text-xs md:text-sm text-buttonText flex items-center flex-wrap justify-center space-x-0.5">
              <p>View</p>
              <LuDot />
              <p>Create</p>
              <LuDot />
              <p>Update</p>
              <LuDot />
              <p>Cancel</p>
            </CardFooter>
          </Card>
        </li>
        <li>
          <Card
            as={Link}
            className="bg-cardAccent4 text-white"
            href="/dashboard/patient/chat"
          >
            <CardHeader className="text-xl font-extrabold text-primary justify-center text-center drop-shadow-md">
              Chat with Doctor
            </CardHeader>
            <CardBody className="items-center">
              <HiChatBubbleLeftRight className="text-primary size-8" />
            </CardBody>
            <CardFooter className="text-xs md:text-sm text-primary justify-center">
              <p>Chat with doctor handling your current case</p>
            </CardFooter>
          </Card>
        </li>
      </ul>

      <BsThreeDots className="mx-auto my-6 size-6" />

      <h3 className="font-bold text-xl mb-3">How it works</h3>
      <ol className="list-decimal list-inside">
        <li>
          To consult with doctors available on the website, you have to create a
          medical case
        </li>
      </ol>
    </div>
  );
}

export default PatientDashboard;
