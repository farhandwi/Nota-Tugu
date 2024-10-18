import { generatePdf } from '../services/pdfService.js';
import { generatePdfVa } from '../services/notaVaGeneratePdfService.js';

const getPdf = (req, res) => {
  const pdfData = generatePdf();

  // Set headers untuk mengirimkan PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="invoice.pdf"');
  
  // Kirim data sebagai buffer
  res.send(Buffer.from(pdfData));
};

const getPdfVa = (req, res) => {
  const pdfData = generatePdfVa();

  // Set headers untuk mengirimkan PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="invoice.pdf"');
  
  // Kirim data sebagai buffer
  res.send(Buffer.from(pdfData));
};


export default{
  getPdf,
  getPdfVa
}

