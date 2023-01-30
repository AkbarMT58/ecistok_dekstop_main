import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

export default function Confirm({
  title,
  message,
  labelYes,
  labelNo,
  handleOk,
}) {
  return confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-body" style={{ width: "300px" }}>
          <h1 className="text-gray-500 text-md font-bold">{title}</h1>
          <p className="text-sm">{message ?? ""}</p>
          <div className="flex justify-between mt-5">
            <button
              className="bg-gray-800 text-white text-sm px-3 py-1 rounded-sm"
              onClick={onClose}
            >
              {labelNo}
            </button>
            <button
              className="bg-gray-800 text-white text-sm px-3 py-1 rounded-sm"
              onClick={() => {
                handleOk();
                onClose();
              }}
            >
              {labelYes}
            </button>
          </div>
        </div>
      );
    },
  });
}
