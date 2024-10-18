import express from 'express';
import cors from "cors"
import pdfController from './controllers/pdfController.js';

const app = express();

app.use(cors());
app.get('/pdf', pdfController.getPdf);
app.get('/pdfVa', pdfController.getPdfVa);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
