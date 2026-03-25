import { toast } from "react-toastify";
export const toastNotify = (message, error) => {
  const options = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  if (error) {
    toast.error(message, options);
  } else {
    toast.success("Weather Success!", options);
  }
};
