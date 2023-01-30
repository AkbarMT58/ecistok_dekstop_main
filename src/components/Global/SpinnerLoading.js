export default function SpinnerDialog({ label }) {
  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-1/3 p-5 border w-9/12 shadow-lg rounded-md bg-white mx-auto">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full">
            <svg
              className="animate-spin h-10 w-10 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="#ffa83d"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="#ff8c00"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <h3 className="text-md leading-6 font-medium text-gray-700 mt-3">
            {label}
          </h3>
        </div>
      </div>
    </div>
  );
}
