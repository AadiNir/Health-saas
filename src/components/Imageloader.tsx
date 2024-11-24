import InsightViewer, { useImage, useDicomFile, useInteraction } from "@lunit/insight-viewer";
import { useViewport } from "@lunit/insight-viewer/viewport";
import Canva from "./Canva";
import { useEffect, useRef, useState } from "react";
import { FaUpload, FaArrowsAlt, FaAdjust, FaRedo } from "react-icons/fa";
import AlertBox from "./ui/Alertbox";
type Controllers = {
  pan: () => void;
  reset: () => void;
  adjust: () => void;
};

export default function Imageloader() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme")=="light"?false:true);
  console.log(localStorage.getItem("theme"));
  const { imageId, file, setImageIdByFile } = useDicomFile();
  const [showAlert, setShowAlert] = useState(true); 
  const { image } = useImage({ dicomfile: imageId });
  const viewerRef = useRef<HTMLDivElement | null>(null);
    
  const { interaction, setInteraction } = useInteraction({
    mouseWheel: "scale",
    primaryDrag: "pan",
  });

  const { viewport, setViewport, resetViewport } = useViewport({ image, viewerRef });

  const controllers: Controllers = {
    pan: () => setInteraction((prev) => ({ ...prev, primaryDrag: "pan" })),
    reset: resetViewport,
    adjust: () => setInteraction((prev) => ({ ...prev, primaryDrag: "adjust" })),
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    setImageIdByFile(event.target.files[0]);
  }

  const viewerProps = {
    image,
    viewerRef,
    viewport,
    interaction,
    onViewportChange: setViewport,
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
            <AlertBox isVisible={showAlert} onClose={() => setShowAlert(false)} />

      {/* Header */}
      <div className="flex justify-between items-center mb-8 w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold">DICOM Image Loader</h1>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300">
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      {/* Main Content */}
      <div className={`shadow-lg rounded-lg p-6 w-full max-w-4xl ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white"}`}>
        {/* File Upload */}
        <div className="flex flex-col items-center justify-center mb-6">
          <label className="block font-medium mb-2 text-3xl">DICOM Image Manipulation Tool</label>
          <input
            type="file"
            accept="application/dicom"
            onChange={handleChange}
            className={`block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
            file:font-semibold ${darkMode ? "file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600" : "file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"}`}
          />
          {file?.name && (
            <p className="text-sm mt-2">
              <strong>Loaded File:</strong> {file.name}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <button
            onClick={controllers.pan}
            className={`flex items-center px-4 py-2 rounded-lg shadow-md transition duration-300 ${
              darkMode ? "bg-blue-700 hover:bg-blue-600 text-gray-100" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}>
            <FaArrowsAlt className="mr-2" /> Pan
          </button>
          <button
            onClick={controllers.adjust}
            className={`flex items-center px-4 py-2 rounded-lg shadow-md transition duration-300 ${
              darkMode ? "bg-green-700 hover:bg-green-600 text-gray-100" : "bg-green-600 hover:bg-green-700 text-white"
            }`}>
            <FaAdjust className="mr-2" /> Adjust
          </button>
          <button
            onClick={controllers.reset}
            className={`flex items-center px-4 py-2 rounded-lg shadow-md transition duration-300 ${
              darkMode ? "bg-red-700 hover:bg-red-600 text-gray-100" : "bg-red-600 hover:bg-red-700 text-white"
            }`}>
            <FaRedo className="mr-2" /> Reset
          </button>
        </div>

        {/* Viewer */}
        <div className={`relative rounded-lg overflow-hidden shadow-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
          <div className="h-[500px] w-full" ref={viewerRef}>
            <InsightViewer {...viewerProps} />
          </div>
        </div>

        {/* Canva Component */}
        <Canva file={imageId} theme={darkMode ? "dark" : "light"} />
      </div>
    </div>
  );
}