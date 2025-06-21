import { Modal, Button } from 'react-bootstrap';
import type { ConfirmModalProps } from '../../../../Interfaces/Shared.interface';



export default function ConfirmModal({
  show,
  btnText = "Delete",
  title = 'Confirm Message',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  onClose,
  onConfirm,
  isLoading = false,
  selectedId
}: ConfirmModalProps) {
  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-secondary text-white">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={()=>{onConfirm(selectedId)}} disabled={isLoading}>
          {isLoading ? `${btnText}...` : btnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
