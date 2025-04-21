import { ReactNode } from 'react';

export type AlertType = 'INFO' | 'ERROR' | 'WARNING' | 'SUCCESS';

export interface AlertProps {
    type: AlertType;
    message?: string;
    onClose: () => void;
}

export interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export interface InputProps {
    value: string;
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    helperText?: string;
}

export interface SelectOption {
    value: string | number;
    label: string;
}

export interface SelectProps {
    options: SelectOption[];
    onSelect: (value: string | number) => void;
    value?: string | number;
    label?: string;
} 