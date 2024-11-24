import React from 'react';

type AlertBoxProps = {
  isVisible: boolean;
  onClose: () => void;
};

const AlertBox: React.FC<AlertBoxProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
        <h2 className="text-xl font-bold text-gray-800">Important Instructions</h2>
        <p className="mt-2 text-gray-600">
          Please use two fingers upwards and downwards for zooming in and out for the image manipulation tool. 
          <br />
          Note: This tool only supports DICOM images.
        </p>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertBox;