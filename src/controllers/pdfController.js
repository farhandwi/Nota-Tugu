import { generatePdf } from '../services/pdfService.js';

export const getPdf = (req, res) => {
  const pdfData = generatePdf();

  // Set headers untuk mengirimkan PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="invoice.pdf"');
  
  // Kirim data sebagai buffer
  res.send(Buffer.from(pdfData));
};
