 export interface ConfirmModalProps {
  show: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: (projectId:number) => void;
  isLoading?: boolean;
  selectedId:number;
  btnText?:string;
}