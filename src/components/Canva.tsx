import { useState } from "react";
import InsightViewer, { useImage } from "@lunit/insight-viewer";
import { AnnotationOverlay } from "@lunit/insight-viewer/annotation";
import type { Annotation, AnnotationMode } from "@lunit/insight-viewer/annotation";

type CanvaProps = {
  file: any;
  theme: "light" | "dark";
};

export default function Canva({ file, theme }: CanvaProps) {
  const [annotationMode, setAnnotationMode] = useState<AnnotationMode>("polygon");
  const [annotations, setAnnotation] = useState<Annotation[]>([]);
  const { image } = useImage({ dicomfile: file });

  // Conditional classes based on theme
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textColor = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const buttonActiveColor = theme === "dark" ? "bg-blue-600 text-white" : "bg-blue-500 text-white";
  const buttonInactiveColor =
    theme === "dark" ? "bg-gray-700 text-gray-300 hover:bg-blue-500" : "bg-gray-200 text-gray-800 hover:bg-blue-400";

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col items-center py-10 px-4`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold ${textColor}`}>DICOM Image Measurement Tool</h1>
        <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-lg`}>
          Upload your DICOM file and start annotating with ease
        </p>
      </div>

      {/* Viewer and Controls */}
      <div className={`shadow-2xl rounded-lg w-full max-w-4xl p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        {/* Annotation Mode Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {["polygon", "ruler", "area"].map((mode) => (
            <button
              key={mode}
              onClick={() => setAnnotationMode(mode as AnnotationMode)}
              className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out transform ${
                annotationMode === mode ? buttonActiveColor : buttonInactiveColor
              } hover:scale-105`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
          <button
            onClick={() => {
              window.location.reload();
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ease-in-out transform ${buttonInactiveColor} hover:scale-105`}
          >
            Reset
          </button>
        </div>

        {/* Viewer */}
        <div className={`relative rounded-lg overflow-hidden ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
          <div className="h-[500px] w-full">
            <InsightViewer image={image}>
              <AnnotationOverlay
                isDrawing
                mode={annotationMode}
                annotations={annotations}
                onChange={(newAnnotations) => setAnnotation(newAnnotations)}
              />
            </InsightViewer>
          </div>
        </div>
      </div>
    </div>
  );
}