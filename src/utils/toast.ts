import { Slide, toast, ToastPosition, TypeOptions } from "react-toastify";

export const toastMessage = (type: TypeOptions, message: string) => {
  toast(message, {
    position: "top-center" as ToastPosition,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Slide,
    type: type,
  });
};
