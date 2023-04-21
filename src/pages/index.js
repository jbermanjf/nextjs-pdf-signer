import Head from 'next/head';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import SignatureCanvasModal from '@/components/SignatureCanvasModal';
import PDFNav from '@/components/PDFNav';
import PDFView from '@/components/PDFView';
import WaiverFill from '@/components/WaiverFill';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [signatureData, setSignatureData] = useState(null);
  const waiverPdf = '/WoodfinZipliningWaiver.pdf';
  const [participantName, setParticipantName] = useState('');
  const [participantAddress, setParticipantAddress] = useState('');
  const [date, setDate] = useState('');
  const [isMinor, setIsMinor] = useState(false);
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('');
  const [email, setEmail] = useState('');
  
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const clearSignature = () => {
    sigCanvas.clear();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const goToNextPage = () => {
    if(currentPage <= numPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const goToPrevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNameChange = (e) => {
    setParticipantName(e.target.value);
  }

  const handleAddressChange = (e) => {
    setParticipantAddress(e.target.value);
  }

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const handleIsMinorChange = (e) => {
    setIsMinor(e.target.checked);
  };
  
  const handleGuardianNameChange = (e) => {
    setGuardianName(e.target.value);
  };

  const handleGuardianRelationshipChange = (e) => {
    setGuardianRelationship(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <Head>
        <title>PDF Signing App</title>
      </Head>
  
      <main>
        <div className="flex flex-col items-center justify-center">
          {currentPage > numPages && numPages != null ? (
            <WaiverFill
              participantName={participantName}
              participantAddress={participantAddress}
              date={date}
              handleNameChange={handleNameChange}
              handleAddressChange={handleAddressChange}
              handleDateChange={handleDateChange}
              isMinor={isMinor}
              handleIsMinorChange={handleIsMinorChange}
              guardianName={guardianName}
              handleGuardianNameChange={handleGuardianNameChange}
              guardianRelationship={guardianRelationship}
              handleGuardianRelationshipChange={handleGuardianRelationshipChange}
              email={email}
              setEmail={handleEmailChange}
            />
          ) : (
            <PDFView
              file={waiverPdf}
              currentPage={currentPage}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
            />
          )}
  
          <PDFNav
            goToPrevPage={goToPrevPage}
            goToNextPage={goToNextPage}
            numPages={numPages}
            currentPage={currentPage}
            toggleModal={toggleModal}
          />
  
        </div>
  
        <SignatureCanvasModal
          isVisible={modalVisible}
          toggleModal={toggleModal}
          pdfUrl={waiverPdf}
          participantAddress={participantAddress}
          participantName={participantName}
          date = {date}
          isMinor={isMinor}
          guardianName={guardianName}
          guardianRelationship={guardianRelationship}
        />
      </main>
    </div>
  );
}
