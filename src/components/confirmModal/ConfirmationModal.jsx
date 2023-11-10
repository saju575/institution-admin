// ConfirmationModal.js

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, isLoading }) => {
  return (
    <div
      className={`z-[1001] fixed inset-0 flex items-center justify-center ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      <div className="bg-white w-96 p-8 rounded shadow-lg">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onCancel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-10 w-10 text-blue-500 mr-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4 1.41-1.41L12 14.17l6.59-6.59L18 8z"
            />
          </svg>
          <p className="text-lg font-semibold text-gray-800">
            আপনি কি নিশ্চিত আপনি সামনে এগুতে চান?
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {!isLoading ? "নিশ্চিত করুন" : "Loading..."}
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            বাতিল করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
