import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";

const ModalAndContent = ({ onClose, isOpen,children,title=" Title",actionButton,...props }) => {
  return (
    <div>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        {...props}
        
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter >
            {actionButton}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalAndContent;
