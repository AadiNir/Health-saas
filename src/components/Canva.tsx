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
  const bgColor = theme === "dark" ? "bg-gray-800" : "bg-gray-50";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const buttonActiveColor = theme === "dark" ? "bg-blue-500 text-white" : "bg-blue-600 text-white";
  const buttonInactiveColor =
    theme === "dark" ? "bg-gray-600 text-gray-200 hover:bg-blue-400" : "bg-gray-200 text-gray-800 hover:bg-blue-500";

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col items-center py-10 px-4`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className={`text-3xl font-bold ${textColor}`}>DICOM Image Annotation Tool</h1>
        <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          Upload your DICOM file and start annotating with ease
        </p>
      </div>

      {/* Viewer and Controls */}
      <div className={`shadow-lg rounded-lg w-full max-w-4xl p-6 ${theme === "dark" ? "bg-gray-700" : "bg-white"}`}>
        {/* Annotation Mode Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setAnnotationMode("polygon")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              annotationMode === "polygon" ? buttonActiveColor : buttonInactiveColor
            }`}
          >
            Polygon
          </button>
          <button
            onClick={() => setAnnotationMode("ruler")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              annotationMode === "ruler" ? buttonActiveColor : buttonInactiveColor
            }`}
          >
            Ruler
          </button>
          <button
            onClick={() => setAnnotationMode("area")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              annotationMode === "area" ? buttonActiveColor : buttonInactiveColor
            }`}
          >
            Area
          </button>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className={`px-4 py-2 rounded-lg font-semibold ${buttonInactiveColor}`}
          >
            Reset
          </button>
        </div>

        {/* Viewer */}
        <div className={`relative rounded-lg overflow-hidden ${theme === "dark" ? "bg-gray-600" : "bg-gray-100"}`}>
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
