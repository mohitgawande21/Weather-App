import { toast } from "react-toastify";
import "./toast.css"; // Import the custom CSS

export const toastNotify = (message, isError = false) => {
  const options = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true, // Cleaner/More Professional
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // This removes the default "bouncy" icons for a minimal look
    icon: false,
  };

  if (isError) {
    toast.error(message, options);
  } else {
    toast.success(message, options);
  }
};
