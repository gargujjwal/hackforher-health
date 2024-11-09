import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { AiFillQuestionCircle } from "react-icons/ai";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";

function HelpFloatingButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="absolute bottom-1/4 right-0 mr-12">
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
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {/* FIXME: Add real content here */}
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default HelpFloatingButton;
