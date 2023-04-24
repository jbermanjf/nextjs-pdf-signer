import SignatureCanvas from 'react-signature-canvas';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

let date = new Date();
let options = { month: '2-digit', day: '2-digit', year: 'numeric' };
let currentDate = date.toLocaleDateString(undefined, options);

const SignatureCanvasModal = ({ isVisible, toggleModal, onSignatureEnd, pdfUrl, participantName, participantAddress, date, isMinor, guardianName, guardianRelationship, email, emergencyContact, emergencyContactPhone, emergencyContactRelationship }) => {
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
    const signatureX = isMinor ? 75 : 130 ; // X coordinate of the signature
    const signatureY = isMinor ? 40 : 290; // Y coordinate of the signature
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
    page.drawText(participantName, { x: 350, y: 725, size: fontSize, font }); //top one

    //Bundle of participant info
    page.drawText(participantName, { x: 145, y: 395, size: fontSize, font }); //bottom
    page.drawText(participantAddress, { x: 150, y: 370, size: fontSize, font });
    page.drawText(currentDate, { x: 75, y: 325, size: fontSize, font });


    if(isMinor)
    {
        page.drawText(participantName, { x: 300, y: 200, size: fontSize, font });
        page.drawText(guardianName, { x: 155, y: 150, size: fontSize, font });
        page.drawText(guardianRelationship, { x: 150, y: 125, size: fontSize, font });
        page.drawText(currentDate, { x: 75, y: 62, size: fontSize, font });
    }

    //Write emergency contact info
    page.drawText(emergencyContact, { x: 50, y: 525, size: fontSize, font });
    page.drawText(emergencyContactRelationship, { x: 190, y: 525, size: fontSize, font });
    page.drawText(emergencyContactPhone, { x: 325, y: 525, size: fontSize, font });
  
    // Serialize the modified PDF and save it
    const modifiedPdfBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'signed-document.pdf');
  
    // Submit the signature
    const signatureData = sigCanvas.toDataURL();
    onSignatureEnd(signatureData);
    toggleModal();
    const base64 = await pdfDoc.saveAsBase64();
    // await sendPdfByEmail(process.env.EMAIL, base64);
    // await sendPdfByEmail(process.env.TEST_EMAIL, base64);
    // await sendPdfByEmail(email, base64);
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
