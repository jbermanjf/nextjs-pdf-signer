import React from 'react';
import { Document, Page } from 'react-pdf';

const PDFView = ({ file, currentPage, onDocumentLoadSuccess }) => (
  <Document
    file={file}
    onLoadSuccess={onDocumentLoadSuccess}
    renderMode="canvas"
    loading="Loading PDF..."
  >
    <Page pageNumber={currentPage} renderTextLayer={false} renderAnnotationLayer={false} />
  </Document>
);

export default PDFView;
