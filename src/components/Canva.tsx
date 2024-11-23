import { useState, useRef } from 'react'
import InsightViewer, { useImage, useInteraction } from '@lunit/insight-viewer'
import { AnnotationOverlay } from '@lunit/insight-viewer/annotation'
import { useViewport } from '@lunit/insight-viewer/viewport'

import type { Annotation, AnnotationMode } from '@lunit/insight-viewer/annotation'

const MOCK_IMAGE = 'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000002.dcm'

export default function App() {
  const viewerRef = useRef<HTMLDivElement | null>(null)

  // Annotation state
  const [annotationMode, setAnnotationMode] = useState<AnnotationMode>('polygon')
  const [annotations, setAnnotation] = useState<Annotation[]>([])

  // DICOM image state
  const { image } = useImage({ wadouri: MOCK_IMAGE })

  // Interaction state
  const { interaction, setInteraction } = useInteraction({
    mouseWheel: 'scale', // Zoom in/out with mouse wheel
    primaryDrag: 'pan', // Pan the image with the left mouse drag
  })

  // Viewport state (for zoom, pan, etc.)
  const { viewport, setViewport, resetViewport } = useViewport({ image, viewerRef })

  // Interaction controllers
  const controllers = {
    pan: () => setInteraction((prev) => ({ ...prev, primaryDrag: 'pan' })),
    adjust: () => setInteraction((prev) => ({ ...prev, primaryDrag: 'adjust' })),
    reset: resetViewport,
  }

  // Props for InsightViewer
  const viewerProps = {
    image,
    viewerRef,
    viewport,
    interaction,
    onViewportChange: setViewport,
  }

  return (
    <>
      {/* Annotation Mode Controls */}
      <div style={{ marginBottom: '16px' }}>
        <button style={{ marginRight: '8px' }} onClick={() => setAnnotationMode('polygon')}>
          Polygon
        </button>
        <button style={{ marginRight: '8px' }} onClick={() => setAnnotationMode('ruler')}>
          Ruler
        </button>
        <button onClick={() => setAnnotationMode('area')}>Area</button>
      </div>

      {/* Interaction Controls */}
      <div style={{ marginBottom: '16px' }}>
        <button style={{ marginRight: '8px' }} onClick={controllers['pan']}>
          Pan
        </button>
        <button style={{ marginRight: '8px' }} onClick={controllers['adjust']}>
          Adjust
        </button>
        <button onClick={controllers['reset']}>Reset</button>
      </div>

      {/* Viewer Component */}
      <InsightViewer {...viewerProps}>
        {/* Annotation Overlay */}
        <AnnotationOverlay
          isDrawing
          mode={annotationMode}
          annotations={annotations}
          onChange={(newAnnotations) => setAnnotation(newAnnotations)}
        />
      </InsightViewer>
    </>
  )
}
