import express from 'express';
import cors from "cors"
import { getPdf } from './controllers/pdfController.js';

const app = express();

app.use(cors());
app.get('/pdf', getPdf);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
