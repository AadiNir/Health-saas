import InsightViewer, { useImage, useDicomFile, useInteraction } from "@lunit/insight-viewer";
import { useViewport } from '@lunit/insight-viewer/viewport';

import { useRef, useState } from "react";

type Controllers = {
  pan: () => void;
  reset: () => void;
  adjust: () => void;
};

export default function Imageloader() {
  const { imageId, file, setImageIdByFile } = useDicomFile();
  const { image } = useImage({ dicomfile: imageId });
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const { interaction, setInteraction } = useInteraction({
    mouseWheel: 'scale',
    primaryDrag: 'pan',
  });

  const { viewport, setViewport, resetViewport } = useViewport({ image, viewerRef });

  const controllers: Controllers = {
    pan: () => setInteraction((prev) => ({ ...prev, primaryDrag: 'pan' })),
    reset: resetViewport,
    adjust: () => setInteraction((prev) => ({ ...prev, primaryDrag: 'adjust' })),
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-3xl">
        {/* File Upload */}
        <div className="flex items-center justify-between mb-6">
          <label className="block text-lg font-medium text-gray-700">
            Load DICOM File:
          </label>
          <input
            type="file"
            accept="application/dicom"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-indigo-50 file:text-indigo-700
                       hover:file:bg-indigo-100"
          />
        </div>
        {file?.name && (
          <p className="text-gray-600 text-sm mb-4">Loaded File: {file.name}</p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={controllers.pan}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md">
            Pan
          </button>
          <button
            onClick={controllers.adjust}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 shadow-md">
            Adjust
          </button>
          <button
            onClick={controllers.reset}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md">
            Reset
          </button>
        </div>

        {/* Viewer */}
        <div className="relative bg-gray-200 rounded-lg overflow-hidden shadow-lg">
          <div className="h-[500px] w-full" ref={viewerRef}>
            <InsightViewer {...viewerProps} />
             
          </div>
        </div>
      </div>
    </div>
  );
}
