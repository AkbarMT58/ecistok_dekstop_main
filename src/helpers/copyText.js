import { toast } from "react-toastify";

const copyText = (text) => {
  const textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(textField.value)
      .then(() => {
        toast.success("copy to clipboard", {
          position: "top-center",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand("copy") ? res() : rej();
      toast.success("copy to clipboard", {
        position: "top-center",
      });
      textField.remove();
    });
  }
  textField.remove();
};

export default copyText;
