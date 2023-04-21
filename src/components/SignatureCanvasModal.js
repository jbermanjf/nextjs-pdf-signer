import SignatureCanvas from 'react-signature-canvas';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { sendPdfByEmail } from '@/sendEmail';

const SignatureCanvasModal = ({ isVisible, toggleModal, onSignatureEnd, pdfUrl, participantName, participantAddress, date, isMinor, guardianName, guardianRelationship, email }) => {
  let sigCanvas;

  const submitSignature = async () => {
    // Load the existing PDF document
    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
    // Embed the signature image
    const signatureImage = await pdfDoc.embedPng(sigCanvas.toDataURL());
    const signatureDimensions = signatureImage.scale(0.5); // scale the signature if needed
  
    // Get the page where you want to add the signature and inputs
    const pageIndex = pdfDoc.getPageCount() - 1; // Assuming you want to add it to the last page
    const page = pdfDoc.getPage(pageIndex);
  
    // Draw the signature on the PDF
    const signatureX = isMinor ? 120 : 200 ; // X coordinate of the signature
    const signatureY = isMinor ? 200 : 465; // Y coordinate of the signature
    page.drawImage(signatureImage, {
      x: signatureX,
      y: signatureY,
      width: signatureDimensions.width,
      height: signatureDimensions.height,
    });
  
    // Embed the fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
    // Write participant's name, address, and date on the PDF
    const fontSize = 12;
    page.drawText(participantName, { x: 200, y: 560, size: fontSize, font });
    page.drawText(participantAddress, { x: 220, y: 535, size: fontSize, font });
    page.drawText(date, { x: 130, y: 490, size: fontSize, font });


    if(isMinor)
    {
        page.drawText(participantName, { x: 355, y: 350, size: fontSize, font });
        page.drawText(guardianName, { x: 220, y: 315, size: fontSize, font });
        page.drawText(guardianRelationship, { x: 210, y: 290, size: fontSize, font });
        page.drawText(date, { x: 130, y: 225, size: fontSize, font });
    }
  
    // Serialize the modified PDF and save it
    const modifiedPdfBytes = await pdfDoc.save();
    // const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    // saveAs(blob, 'signed-document.pdf');
  
    // Submit the signature
    const signatureData = sigCanvas.toDataURL();
    onSignatureEnd(signatureData);
    toggleModal();
    const base64 = await pdfDoc.saveAsBase64();
    await sendPdfByEmail('jacobberman1234@gmail.com', base64);
    await sendPdfByEmail(email, base64);
  };

  return (
    isVisible && (
      <div className="modal">
        <div className="modalContent">
          <h2>Sign Document</h2>
          <SignatureCanvas
            ref={(ref) => {
              sigCanvas = ref;
            }}
            canvasProps={{
              width: 500,
              height: 200,
              className: 'sigCanvas',
            }}
            onEnd={() => onSignatureEnd(sigCanvas.toDataURL())}
          />
          <div className="buttons">
            <button onClick={toggleModal}>Close</button>
            <button onClick={submitSignature}>Submit</button>
            <button onClick={() => sigCanvas.clear()}>Clear</button>
          </div>
        </div>
      </div>
    )
  );
};

export default SignatureCanvasModal;
