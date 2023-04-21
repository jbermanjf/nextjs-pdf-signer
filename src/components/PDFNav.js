import React from 'react';

const PDFNav = ({ goToPrevPage, goToNextPage, numPages, currentPage, toggleModal }) => (
  <div className="flex justify-center mt-4">
    <button onClick={goToPrevPage} className="mx-2">
      Prev Page
    </button>
    {
        currentPage > numPages && numPages != null ? (
            <button onClick={toggleModal} className="sign-button">
                Sign Document
            </button>
        ) : (
            <button onClick={goToNextPage} className="mx-2">
                Next Page
            </button>
        )
    }

  </div>
);

export default PDFNav;
