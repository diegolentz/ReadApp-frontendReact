import { ReactNode } from 'react';
import './Toast.css'

export const Toast = ({ message, type }: { message: ReactNode; type: ToastType }) => {

    return (
        <div className={`toast ${type} show`} id="toast">
            <span>{message}</span>
        </div>
    )

}

export type ToastType = 'success' | 'error' | 'info' | 'warning'