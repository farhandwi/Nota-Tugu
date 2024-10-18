import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import fs from 'fs';
import path from 'path';

export const generatePdf = () => {
  const doc = new jsPDF();


  // ~~HEADER~~

  // Load image as base64
  const logoPath = path.join('public/images/logo_tugu.png');
  let imgData;
  
  try {
    // Read the image as a base64 string
    const imageBuffer = fs.readFileSync(logoPath);
    imgData = `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error loading image:', error);
  }

  if (imgData) {
    doc.addImage(imgData, "PNG", 165, 10, 30, 15);
  } else {
    // Fallback text if image can't be loaded
    doc.setFontSize(12);
    doc.text("LOGO", 15, 40);
  }


  // Header PDF
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(3, 3, 129);
  doc.text("PERNYATAAN PENAGIHAN", 18, 30);
  
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic", "bold");
  doc.text("BILLING STATEMENT", 18, 33);
  
  doc.setTextColor(0,0,0);
  doc.setDrawColor(218,219,219);
  doc.setFillColor(218,219,219,);
  doc.roundedRect(18, 35, 23, 7, 3, 3, "FD");
  
  // Konten PDF
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("10 Sep 2024", 20, 40);


  // ~~AKHIR HEADER~~
  
  
  // ~~CONTENT 1~~
  doc.text("Kepada", 15,55);
  
  doc.setFontSize(6);
  doc.setFont("helvetica", "normal");
  doc.text("TO",15, 58);
  
  
  doc.setTextColor(0,0,0);
  doc.setDrawColor(218,219,219,3);
  doc.setFillColor(255,255,255);
  doc.roundedRect(30, 47, 80, 30, 3, 3, "FD");
  

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("PT ARCHOR TEKNOLOGI DIGITAL",32, 52);
  doc.text("RDTX SQUARE JL PROF DR SATRIO LT 7 164",32, 57);
  doc.text("KARET, SEMANGGI, SETIABUDI",32, 62);
  
  doc.text("INDONESIA",32, 73);

  // Add billing details (example data)
  const billingHeader = [
    ['Internal FP', ':    080.062.10.0000066474'],
    ['Debit Number', ':    0000001000'],
    ['Client ID', ':    1200004133'],
  ];

  doc.setTextColor(0,0,0);
  doc.setDrawColor(218,219,219);
  doc.setFillColor(218,219,219,);
  doc.roundedRect(155, 49, 38, 5, 3, 3, "FD");

  doc.setTextColor(0,0,0);
  doc.setDrawColor(218,219,219);
  doc.setFillColor(218,219,219,);
  doc.roundedRect(155, 57, 22, 5, 3, 3, "FD");

  doc.setTextColor(0,0,0);
  doc.setDrawColor(218,219,219);
  doc.setFillColor(218,219,219);
  doc.roundedRect(155, 64.5, 22, 5, 3, 3, "FD");

  doc.autoTable({
    startY: 48,
    margin: 120,
    head: [],
    body: billingHeader,
    theme: 'plain',
    styles: { fontSize: 9, cellPadding: 2, fontStyle: 'bold' },
    columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 45 } },
  });

  // ~~AKHIR CONTENT 1~~



  // ~~CONTENT 2~~

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Pemegang Polis yang terhormat, terima kasih atas kepercayaan anda, bersama ini kami sampaikan rincian tagihan anda: ", 15, 84);

  doc.setFontSize(7);
  doc.setFont("helvetica", "italic", "bold");
  doc.text("Dear Policy Holder, thanks for your trust in Tugu Insurance, Herw we provide the details of your bill: ", 15, 87);

  // ~~AKHIR CONTENT 2~~



  // ~~CONTENT 3~~
  
  const tableData = [
    ['NPWP', ': 0847027216067000'],
    ['Tax Register', ''],
    ['Nomor Polis', ': 03240000006810 / 2024'],
    ['Policy Number', ''],
    ['Endorsement No', ': 0'],
    ['Endorsement No', ''],
    [`Klasifikasi Premi`, ': PAR - PERTAMINA RETAIL, CASH IN TRANSIT- PERTAMINA RETAIL, PERSONAL ACCIDENT\n  KHUSUS PERTAMINA RETAIL, CASH IN SAFE - PERTAMINA RETAIL, CGL - PERTAMINA RETAIL'],
    ['', ''],
    ['Periode Asuransi', ': 30 Aug 2024 to 31 May 2025'],
    ['Insurance Period', ''],
    ['Tertanggung', ': MR EMYR GIOVANNI'],
    ['Insured', ''],
    ['Tertanggung Lainnya', ': -'],
    ['Other Insured', ''],
    ['Total Pertanggungan', ': AS PER POLICY ATTACHED'],
    ['Sum Insured', ''],
    ['Keterangan Lain', ': -'],
    ['Particulars', ''],
    ['Premi', ': IDR 2.490.092'],
    ['Premium', ''],
    ['Biaya Administrasi', ': IDR 100.000'],
    ['Admin Cost', ''],
    ['Jumlah Neto\nYang Harus Dibayar', ': IDR 2.590.092'],
    ['Net Value', ''],
    ['Terbilang', ': DUA JUTA LIMA RATUS SEMBILAN PULUH RIBU SEMBILAN PULUH DUA RUPIAH'],
    ['Say',''],
    ['','  TWO MILLION FIVE HUNDRES NINETY THOUSAND NINETY-TWO RUPIAH'],
    ['','Dibebaskan dari PPN sesuai PP NO 49 THN 2022'],
    ['','Free of VAT reff to PP NO 49 THN 2022'],
    ['Jatuh Tempo Pembayaran',': 29 Sep 2024'],
    ['Payment due at',''],
  ];

  // Create the table
  doc.autoTable({
    body: tableData,
    startY: 93, 
    margin:20,
    theme: 'plain',
    styles: {
      fontSize: 8,
      cellPadding: 0,
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 'auto' },
    },
    didParseCell: function(data) {
      if(data.row.index % 2 == 1 && data.row.index <= tableData.length - 6){
        data.cell.styles.fontStyle = 'bolditalic';
        data.cell.styles.fontSize = 6;
        data.cell.styles.minCellHeight = 3;
      }else if(data.row.index % 2 != 0 && data.row.index <= tableData.length - 6){
        data.cell.styles.fontStyle = 'italic';
      }else if(data.row.index == 26){
        console.log(data.cell.text);
        data.cell.styles.fontStyle = 'bolditalic';
        data.cell.styles.fontSize = 8;
        data.cell.styles.minCellHeight = 6;
      }else if(data.row.index == 28){
        data.cell.styles.fontStyle = 'bolditalic';
        data.cell.styles.fontSize = 6;
        data.cell.styles.minCellHeight = 3;
      }else{
      }
    },
    didDrawCell: function(data) {
      if(data.row.index == 6){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Premium Class', data.cell.x, data.cell.y+5)
        }
      }else if(data.row.index == 22){
        if(data.column.index == 1){
          doc.setFontSize(6);
          doc.setFont("helvetica", "bold");
          doc.text('PPN     : 0', data.cell.x + 90, data.cell.y + 2);
          doc.setFontSize(5);
          doc.setFont("helvetica", "bolditalic");
          doc.text('VAT', data.cell.x + 90, data.cell.y + 4);
        }
      }
    }
  });

  doc.setTextColor(0,0,0);
  doc.setDrawColor(0,0,0);
  doc.setFillColor(0,0,0);
  doc.setLineWidth(0.5);
  doc.line(60, doc.lastAutoTable.finalY - 20.5, 190, doc.lastAutoTable.finalY - 20.5);

  // ~~AKHIR CONTENT 3~~



  // ~~CONTENT 4~~

  doc.setFontSize(8);
  doc.setFont("helvetica","bold");
  doc.text("Pembayaran dapat dilakukan melalui transfer ke alamat rekening berikut ini dengan menambahkan informasi Billing Number", 15, doc.lastAutoTable.finalY + 6);

  doc.setFontSize(7);
  doc.setFont("helvetica","bolditalic");
  doc.text("Please transfer to our bank as state the debit number on bank", 15, doc.lastAutoTable.finalY + 9);

  // ~~AKHIR CONTENT 4~~



  // ~~CONTENT 5~~

  const tableData2 = {
    head: [
      ['Bank', 'Cabang/Branch', 'Mata Uang/Currency', 'Nomor Virtual Akun/Virtual Account Number', 'Nama Virtual Akun/Virtual Account Name']
    ],
    body: [
      ['MANDIRI', 'WISMA TUGU', 'IDR', '8800110240000740', 'TUGU PRATAMA INDONESIA']
    ]
  };
  
  const headerStyles = { fillColor: [0, 0, 139], textColor: [255, 255, 255], fontSize: 8 };
  const contentStyles = { fontSize: 8,textColor: [0, 0, 0] , fontStyle: "bold"};
  
  doc.autoTable({
    head: tableData2.head,
    body: tableData2.body,
    startY: doc.lastAutoTable.finalY + 11,
    margin: {right:20, left: 20}, 
    styles: {
      halign: 'center',
      valign: 'middle',
      tableLineWidth: 0.5,
    },
    headStyles: headerStyles,
    bodyStyles: contentStyles,
    theme: 'grid',
    lineColor:10,
  });


  // ~~AKHIR CONTENT 5~~



  // ~~CONTENT 6~~

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  doc.text("Pembayaran dapat dilakukan melalui transfer ke alamat rekening berikut ini dengan menambahkan informasi Billing Number", 15, doc.lastAutoTable.finalY + 4);

  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(7);
  doc.text("Please transfer to our bank as state the debit number on bank", 15, doc.lastAutoTable.finalY + 7);

  // ~~AKHIR CONTENT 6~~




  // ~~CONTENT 7~~

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text('HESTI LISTYOWATI .', 15, doc.lastAutoTable.finalY + 20);
  doc.line(15, doc.lastAutoTable.finalY + 21, 60, doc.lastAutoTable.finalY + 21);
  doc.text('AUTHORIZED SIGNATORY', 15, doc.lastAutoTable.finalY + 24);

  // ~~AKHIR CONTENT 7~~


  // ~~FOOTER~~

  // Lebar halaman (A4 = 210mm x 297mm untuk orientasi potret)
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const logoCallTia = path.join('public/images/calltia.png');
  let imgDataCallTia;
  
  try {
    // Read the image as a base64 string
    const imageBuffer = fs.readFileSync(logoCallTia);
    imgDataCallTia = `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error loading image:', error);
  }

  if (imgData) {
    doc.addImage(imgDataCallTia, "PNG", 170, pageHeight-21, 32, 18);
  } else {
    doc.setFontSize(12);
    doc.text("LOGO", 170, pageHeight-20);
  }

  doc.setFontSize(6);
  doc.setTextColor(21, 27, 141);
  doc.setFont("helvetica", "bold");
  doc.text("PT ASURANSI TUGU PRATAMA INDONESIA TBK",12,pageHeight-14);
  doc.text("a member of PERTAMINA",12,pageHeight-11);
  doc.text("NPWP : 01.302.218.1-062.000",12,pageHeight-8);
  doc.text("Policy Number : 03240000006810 - Page 1",12,pageHeight-5);
  
  doc.text("Head Office",75,pageHeight-14);
  doc.text("Wisma Tugu I",75,pageHeight-11);
  doc.text("Jl. H. R. Rasuna Said Kav. C 8-9",75,pageHeight-8);
  doc.text("Jakarta 12920, Indonesia",75,pageHeight-5);
  
  doc.text("PRINTED BY CIREBON POSS",120,pageHeight-14);
  doc.text("+6221 529 61777",120,pageHeight-11);
  doc.text("+6221 529 61555 +6221 529 62555",120,pageHeight-8);
  doc.text("enquiry@tugu.com  WWW.TUGU.COM",120,pageHeight-5);

  doc.setFontSize(6);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text("Apabila memerlukan informasi lebih lanjut silahkan menghubungi marketing",120,pageHeight-27);
  doc.text("kami atau menghubungi Call TIA pada nomor:",120,pageHeight-25);
  doc.setFontSize(5);
  doc.setFont("helvetica", "italic");
  doc.text("For futher information please contact our in charge officer or contact Call TIA at:",120,pageHeight-23);

  const logoBiru = path.join('public/images/biru.png');
  let imgBiru;
  
  try {
    // Read the image as a base64 string
    const imageBuffer = fs.readFileSync(logoBiru);
    imgBiru = `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error loading image:', error);
  }

  if (imgData) {
    doc.addImage(imgBiru, "PNG", 95, pageHeight-21, 14, 3);
  } else {
    doc.setFontSize(12);
    doc.text("LOGO", 170, pageHeight-20);
  }

  const logoMerah = path.join('public/images/merah.png');
  let imgMerah;
  
  try {
    // Read the image as a base64 string
    const imageBuffer = fs.readFileSync(logoMerah);
    imgMerah = `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error loading image:', error);
  }

  if (imgData) {
    doc.addImage(imgMerah, "PNG", -7, pageHeight-15, 14, 3);
  } else {
    doc.setFontSize(12);
    doc.text("LOGO", 170, pageHeight-20);
  }

  // ~~AKHIR FOOTER~~

  const logoHijau = path.join('public/images/hijau.png');
  let imgHijau;
  
  try {
    // Read the image as a base64 string
    const imageBuffer = fs.readFileSync(logoHijau);
    imgHijau = `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error loading image:', error);
  }

  if (imgData) {
    doc.addImage(imgHijau, "PNG", pageWidth - 12, pageHeight/2 - 10, 15, 4);
  } else {
    doc.setFontSize(12);
    doc.text("LOGO", 170, pageHeight-20);
  }

  // // Return the PDF as a Buffer
  return doc.output('arraybuffer'); // Changed to 'arraybuffer'
};
