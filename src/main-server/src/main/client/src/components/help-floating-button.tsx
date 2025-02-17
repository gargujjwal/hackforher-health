import { IoMdHelpCircle } from "react-icons/io";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";
import { Tooltip } from "@heroui/tooltip";
import React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import {
  FaCalendar,
  FaChevronRight,
  FaClipboardList,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { FaBookOpenReader, FaCircleQuestion } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { RiMessage3Fill } from "react-icons/ri";

import { useAuth } from "@/contexts/auth-context";

const FeatureGuide: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <div className="mb-2 flex items-start gap-3 rounded-lg border border-borderColor p-4 transition-colors hover:bg-accent/10">
    <div className="mt-1 text-primary">{icon}</div>
    <div>
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-textSecondary">{description}</p>
    </div>
  </div>
);

function HelpFloatingButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = React.useState("features");
  const auth = useAuth();

  const renderPreLoginFeatures = () => (
    <div className="space-y-4">
      <FeatureGuide
        description="Start your journey here. Learn about our services and how we can help you."
        icon={<IoHome size={24} />}
        title="Home"
      />
      <FeatureGuide
        description="Take our comprehensive questionnaire to assess potential risks and get personalized recommendations."
        icon={<FaClipboardList size={24} />}
        title="Cancer Prediction"
      />
      <FeatureGuide
        description="Connect with others who understand your journey. Join support groups for emotional and practical guidance."
        icon={<FaUsers size={24} />}
        title="Support Groups"
      />
      <FeatureGuide
        description="Access valuable resources about cancer prevention, early detection, and healthy lifestyle choices."
        icon={<FaBookOpenReader size={24} />}
        title="Awareness & Prevention"
      />
    </div>
  );

  const renderPatientFeatures = () => (
    <div className="space-y-4">
      <FeatureGuide
        description="Your personalized hub for managing all aspects of your healthcare journey."
        icon={<FaUser size={24} />}
        title="Dashboard"
      />
      <FeatureGuide
        description="Track and manage your medical cases. Access reports, history, and updates all in one place."
        icon={<FaClipboardList size={24} />}
        title="My Cases"
      />
      <FeatureGuide
        description="Schedule, view, and manage your appointments with healthcare providers."
        icon={<FaCalendar size={24} />}
        title="Appointments"
      />
      <FeatureGuide
        description="Communicate directly with your healthcare providers through our secure messaging system."
        icon={<RiMessage3Fill size={24} />}
        title="Chat"
      />
    </div>
  );
  const renderDoctorFeatures = () => (
    <div className="space-y-4">
      <FeatureGuide
        description="Access your patient cases, appointments, and medical records efficiently."
        icon={<FaUser size={24} />}
        title="Dashboard"
      />
      <FeatureGuide
        description="Manage and participate in support groups to provide guidance to patients."
        icon={<FaUsers size={24} />}
        title="Support Groups"
      />
      <FeatureGuide
        description="Access and share educational resources with your patients."
        icon={<FaBookOpenReader size={24} />}
        title="Resources"
      />
    </div>
  );

  const renderInstructions = () => (
    <div className="space-y-4">
      <h3 className="mb-2 text-lg font-semibold">Quick Start Guide</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FaChevronRight className="text-primary" size={20} />
          <p>
            Click the help icon{" "}
            <FaCircleQuestion className="inline text-primary" size={20} /> in
            the bottom right corner anytime to open this guide
          </p>
        </div>
        {auth.status === "authenticated" && (
          <>
            <div className="flex items-center gap-2">
              <FaChevronRight className="text-primary" size={20} />
              <p>Create an account or log in to access personalized features</p>
            </div>
            {auth.user.role === "PATIENT" && (
              <>
                <div className="flex items-center gap-2">
                  <FaChevronRight className="text-primary" size={20} />
                  <p>
                    Complete the questionnaire to receive a preliminary
                    assessment
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaChevronRight className="text-primary" size={20} />
                  <p>
                    Schedule appointments with healthcare providers through the
                    Appointments tab
                  </p>
                </div>
              </>
            )}
            {auth.user.role === "DOCTOR" && (
              <div className="flex items-center gap-2">
                <FaChevronRight className="text-primary" size={20} />
                <p>
                  Check your dashboard regularly for new patient cases and
                  appointments
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Card
        className="fixed bottom-[12%] right-0 mr-8 xl:bottom-[14%]"
        shadow="lg"
      >
        <CardBody>
          <Tooltip content="Help">
            <Button
              isIconOnly
              className="md:hidden"
              color="primary"
              radius="full"
              size="sm"
              onPress={onOpen}
            >
              <AiFillQuestionCircle className="w-full text-accent" />
            </Button>
          </Tooltip>
          <Tooltip content="Help">
            <Button
              isIconOnly
              className="hidden md:flex"
              color="primary"
              radius="full"
              onPress={onOpen}
            >
              <AiFillQuestionCircle className="w-full text-accent" size="lg" />
            </Button>
          </Tooltip>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Website Guide
                <p className="text-sm font-normal text-textSecondary">
                  Learn how to make the most of our platform
                </p>
              </ModalHeader>
              <ModalBody>
                <Tabs
                  selectedKey={activeTab}
                  onSelectionChange={key => setActiveTab(key.toString())}
                >
                  <Tab
                    key="features"
                    title={
                      <div className="flex items-center gap-2">
                        <FaBookOpenReader size={18} />
                        <span>Features</span>
                      </div>
                    }
                  >
                    {auth.status !== "authenticated" ? (
                      <>
                        {renderPatientFeatures()}
                        {renderDoctorFeatures()}
                      </>
                    ) : (
                      renderPreLoginFeatures()
                    )}
                  </Tab>
                  <Tab
                    key="instructions"
                    title={
                      <div className="flex items-center gap-2">
                        <IoMdHelpCircle size={18} />
                        <span>How to Use</span>
                      </div>
                    }
                  >
                    {renderInstructions()}
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {auth.status !== "authenticated" && (
                  <Button
                    className="text-textPrimary"
                    color="primary"
                    href="/auth/login"
                  >
                    Log In
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default HelpFloatingButton;
