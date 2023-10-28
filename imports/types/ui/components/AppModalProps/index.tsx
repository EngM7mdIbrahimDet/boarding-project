export interface AppModalProps {
    opened: boolean;
    onClose: () => void;
    modalText: string;
    onYes: () => void;
    loading: boolean;
}