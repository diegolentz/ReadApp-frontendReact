import { ReactNode, useState } from "react"
import { Toast } from "../../componentes/Toaster/Toast"

export const useToast = () =>{
    const [toastList, setToasts] = useState<ReactNode[]>([])

    const showToast = (text: string) => {
        setToasts([...toastList, text])
        setTimeout(()=>{
            setToasts(l=>l.slice(1))
        }, 2700)
    }

    const toast = (
        <>
        {toastList.map(text =>{
            return <Toast type="success" message={`${text}`}/>
        })}
        </>
    )


    return [toast, showToast]
}