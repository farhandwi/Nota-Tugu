import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import fs from 'fs';
import path from 'path';

export const generatePdfVa = () => {
  const doc = new jsPDF();
  let pageNumber = 1;

  // Function to add header
  const addHeader = () => {
    // Load image as base64
    const logoPath = path.join('public/images/logo_tugu.png');
    let imgData;
    
    try {
      const imageBuffer = fs.readFileSync(logoPath);
      imgData = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    } catch (error) {
      console.error('Error loading image:', error);
    }

    if (imgData) {
      doc.addImage(imgData, "PNG", 165, 10, 30, 15);
    } else {
      doc.setFontSize(12);
      doc.text("LOGO", 15, 40);
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(3, 3, 129);
    doc.text("PERNYATAAN PENAGIHAN", 18, 17);
    
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic", "bold");
    doc.text("BILLING STATEMENT", 18, 20);
    
    doc.setTextColor(0,0,0);
    doc.setDrawColor(218,219,219);
    doc.setFillColor(218,219,219,);
    doc.roundedRect(18, 22.5, 23, 7, 3, 3, "FD");
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("10 Sep 2024", 20, 27);
  };

  // Function to add footer
  const addFooter = () => {
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    const logoCallTia = path.join('public/images/calltia.png');
    let imgDataCallTia;
    
    try {
      const imageBuffer = fs.readFileSync(logoCallTia);
      imgDataCallTia = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    } catch (error) {
      console.error('Error loading image:', error);
    }

    if (imgDataCallTia) {
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
    doc.text(`Policy Number : 03240000006810 - Page ${pageNumber}`,12,pageHeight-5);
    
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
      const imageBuffer = fs.readFileSync(logoBiru);
      imgBiru = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    } catch (error) {
      console.error('Error loading image:', error);
    }

    if (imgBiru) {
      doc.addImage(imgBiru, "PNG", 95, pageHeight-21, 14, 3);
    }

    const logoMerah = path.join('public/images/merah.png');
    let imgMerah;
    
    try {
      const imageBuffer = fs.readFileSync(logoMerah);
      imgMerah = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    } catch (error) {
      console.error('Error loading image:', error);
    }

    if (imgMerah) {
      doc.addImage(imgMerah, "PNG", -7, pageHeight-15, 14, 3);
    }

    const logoHijau = path.join('public/images/hijau.png');
    let imgHijau;
    
    try {
      const imageBuffer = fs.readFileSync(logoHijau);
      imgHijau = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    } catch (error) {
      console.error('Error loading image:', error);
    }

    if (imgHijau) {
      doc.addImage(imgHijau, "PNG", pageWidth - 12, pageHeight/2 - 10, 15, 4);
    }
  };

  // Function to check and add new page if needed
  const checkAndAddNewPage = (yPosition) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      pageNumber++;
      addHeader();
      addFooter();
      return 40;
    }
    return yPosition;
  };

  // Add initial header and footer
  addHeader();
  addFooter();

  // CONTENT 1
  let yPos
  const companyName = "PT ARCHOR TEKNOLOGI DIGITAL";
  const addressLine = "RDTX SQUARE JL PROF DR SATRIO LT 7 164 KARET, SEMANGGI, SETIABUDI";
  const country = "INDONESIA";

  function splitTextToFitWidth(doc, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = doc.getStringUnitWidth(currentLine + " " + word) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  yPos = 36;
  yPos = checkAndAddNewPage(yPos);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Kepada", 15, yPos+7);
  yPos += 3;

  doc.setFontSize(6);
  doc.setFont("helvetica", "bolditalic");
  doc.text("TO", 15, yPos+7);
  yPos += 2;

  const rectWidth = 80;
  const rectHeight = 30;
  const rectX = 30;
  const rectY = yPos - 5;

  doc.setTextColor(0,0,0);
  doc.setDrawColor(218,219,219,3);
  doc.setFillColor(255,255,255);
  doc.roundedRect(rectX, rectY, rectWidth, rectHeight, 3, 3, "FD");

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");

  const maxWidth = rectWidth - 4;
  let currentY = rectY + 5;
addressLine
  const companyNameLines = splitTextToFitWidth(doc, companyName, maxWidth);
  const addressLines = splitTextToFitWidth(doc, addressLine, maxWidth);
  const totalLines = companyNameLines.length + addressLines.length + 1;

  const rectHeightDynamic = totalLines * 5 + 10;

  // Perbarui penggambaran rect dengan tinggi dinamis
  doc.roundedRect(rectX, rectY, rectWidth, rectHeightDynamic, 3, 3, "FD");

  currentY = rectY + 5;

  companyNameLines.forEach(line => {
    doc.text(line, rectX + 2, currentY);
    currentY += 5;
  });

  addressLines.forEach(line => {
    if (currentY + 5 <= rectY + rectHeightDynamic - 10) {
      doc.text(line, rectX + 2, currentY);
      currentY += 5;
    }
  });

  doc.text(country, rectX + 2, rectY + rectHeightDynamic - 5);

  yPos = rectY + rectHeightDynamic + 5;

  // Add billing details
  const billingHeader = [
    ['Internal FP', ':    080.062.10.0000066474'],
    ['Debit Number', ':    0000001000'],
    ['Client ID', ':    1200004133'],
  ];

  doc.setTextColor(0,0,0);
  doc.setDrawColor(218,219,219);
  doc.setFillColor(218,219,219,);
  doc.roundedRect(155, yPos - 33, 38, 5, 3, 3, "FD");
  doc.roundedRect(155, yPos - 25.5, 22, 5, 3, 3, "FD");
  doc.roundedRect(155, yPos - 17.5, 22, 5, 3, 3, "FD");

  doc.autoTable({
    startY: yPos - 34,
    margin: 120,
    head: [],
    body: billingHeader,
    theme: 'plain',
    styles: { fontSize: 9, cellPadding: 2, fontStyle: 'bold' },
    columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 45 } },
  });

  yPos = doc.lastAutoTable.finalY + 15;

  // CONTENT 2
  yPos = checkAndAddNewPage(yPos);
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Pemegang Polis yang terhormat, terima kasih atas kepercayaan anda, bersama ini kami sampaikan rincian tagihan anda: ", 15, yPos);
  yPos += 3;

  doc.setFontSize(7);
  doc.setFont("helvetica", "italic", "bold");
  doc.text("Dear Policy Holder, thanks for your trust in Tugu Insurance, Here we provide the details of your bill: ", 15, yPos);
  yPos += 6;

  // CONTENT 3
  yPos = checkAndAddNewPage(yPos);
  
  const tableData = [
    ['NPWP', ':',' -'],
    ['','',''],
    ['Nomor Polis', ':','03240000007105 / 2024'],
    ['','',''],
    [`Klasifikasi Premi`, ':','EARTHQUAKE, PROPERTY ALL RISKS'],
    ['','',''],
    ['Periode Asuransi', ':', '18 Sep 2024 to 18 Sep 2025'],
    ['','',''],
    ['Tertanggung', ':', 'PT BHAKTI MINGASUTAMA'],
    ['','',''],
    ['Tertanggung Lainnya', ':', '-'],
    ['','',''],
    ['Total Pertanggungan', ':', 'IDR 334.750.000.000'],
    ['','',''],
    ['Keterangan Lain', ':','Being Renewal Premium iro PAREQ Insurance Cover Less 10% DiscountRisk Location: Desa Sukahaji, Kecamatan Patrol, Indramayu & ndash'],
    ['','',''],
    ['Premi', ':', 'IDR 1.408.250'],
    ['','',''],
    ['Biaya Administrasi', ':', 'IDR 70.000'],
    ['','',''],
    ['Diskon', ':', 'IDR 140.829.330'],
    ['','',''],
    ['Detail Angsuran', ':',''],
  ];

  doc.autoTable({
    body: tableData,
    startY: yPos,
    margin: 20,
    theme: 'plain',
    styles: {
      fontSize: 8,
      cellPadding: 0,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 38 },
      1: { cellWidth: 2 },
      2: { cellWidth: 'auto' },
    },
    didParseCell: function(data) {
        data.cell.styles.minCellHeight = 3;
    },
    didDrawCell: function(data) {
      if(data.row.index == 0){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Tax Register', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 2){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Policy Number', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 4){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Premium Class', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 6){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Insurance Period', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 8){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Insured', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 10){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Other Insured', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 12){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Sum Insured', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 14){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Particulars', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 16){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Premium', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 18){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Admin Cost', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 20){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Discount', data.cell.x, data.cell.y+5)
        }
      }
      if(data.row.index == 22){
        if(data.column.index == 0){
          doc.setFontSize(6);
          doc.setFont("helvetica", "italic", "bold");
          doc.text('Installment Details', data.cell.x, data.cell.y+5)
        }
      }
    }
  });

  yPos = doc.lastAutoTable.finalY + 5;


  yPos = checkAndAddNewPage(yPos);

  const tableData3 = {
    head: [
      ['No', 'Jatuh Tempo/Due Date', 'Jumlah Angsuran/Amount Due']
    ],
    body: [
      ['01', '18 Oct 2024', 'IDR 126.816.392'],
      ['02', '18 Nov 2024', 'IDR 126.816.392'],
      ['03', '18 Dec 2024', 'IDR 126.816.392'],
      ['04', '18 Jan 2025', 'IDR 126.816.392'],
      ['05', '18 Feb 2025', 'IDR 126.816.392'],
      ['06', '18 Mar 2025', 'IDR 126.816.392'],
      ['07', '18 Apr 2025', 'IDR 126.816.392'],
      ['08', '18 May 2025', 'IDR 126.816.392'],
      ['09', '18 Jun 2025', 'IDR 126.816.392'],
      ['10', '18 Jul 2025', 'IDR 126.816.392'],
      ['11', '18 Aug 2025', 'IDR 126.816.392'],
      ['12', '18 Sep 2025', 'IDR 126.816.392'],
    ]
  };

  const headerStyles = { fillColor: [0, 0, 139], textColor: [255, 255, 255], fontSize: 8 };
  const contentStyles = { fontSize: 8, textColor: [0, 0, 0], fontStyle: "bold" };

  // Fungsi untuk menghitung tinggi tabel
  const calculateTableHeight = (data, columnStyles) => {
    const lineHeight = 8;
    let totalHeight = 0;
    
    // Tinggi header
    totalHeight += lineHeight * 2;
    
    // Tinggi body
    data.body.forEach(row => {
      let maxLines = 1;
      row.forEach((cell, index) => {
        const columnWidth = columnStyles[index].cellWidth || 'auto';
        const lines = doc.splitTextToSize(cell.toString(), columnWidth).length;
        maxLines = Math.max(maxLines, lines);
      });
      totalHeight += lineHeight * maxLines;
    });
    
    return totalHeight;
  };

  // Hitung tinggi tabel
  const tableHeight = calculateTableHeight(tableData3, [
    { cellWidth: 30 },
    { cellWidth: 30 },
    { cellWidth: 30 },
    { cellWidth: 30 },
  ]);

  // Cek apakah tabel muat di halaman saat ini
  const pageHeight = doc.internal.pageSize.getHeight();
  if (yPos + tableHeight > pageHeight - 25) {
    doc.addPage();
    pageNumber++;
    addHeader();
    addFooter();
    yPos = 35;
  }

  doc.autoTable({
    head: tableData3.head,
    body: tableData3.body,
    startY: yPos,
    margin: {right: 45, left: 45}, 
    styles: {
      halign: 'center',
      valign: 'middle',
      tableLineWidth: 0.5,
    },
    headStyles: headerStyles,
    bodyStyles: contentStyles,
    theme: 'grid',
    lineColor: 10,
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 50 },
      2: { cellWidth: 50 },
    }
  });

  yPos = doc.lastAutoTable.finalY + 5;

  // CONTENT 7
 yPos = checkAndAddNewPage(yPos);
 let getCurrentLine;

 const tableData4 = [
   ['Jumlah Neto\nYang Harus Dibayar', ':','IDR 1.267.533.920'],
   ['','', ''],
   ['Terbilang', ':','SATU MILYAR DUA RATUS ENAM PULUH TUJUH JUTA LIMA RATUS TIGA PULUH TIGA RIBU SEMBILAN RATUS DUA PULUH RUPIAH'],
   ['','', ''],
   ['','','ONE BILLION TWO HUNDRED SIXTY-SEVEN MILLION FIVE HUNDRED THIRTY-THREE THOUSAND NINE HUNDRED TWENTY RUPIAH'],
   ['','', 'Dibebaskan dari PPN sesuai PP NO 49 THN 2022'],
   ['','', 'Free of VAT reff to PP NO 49 THN 2022'],
 ];

 // Fungsi untuk menghitung tinggi tabel
 const calculateTableHeight2 = (data, styles, columnStyles) => {
   let totalHeight = 0;
   data.forEach((row, rowIndex) => {
     let rowHeight = 0;
     row.forEach((cell, colIndex) => {
       const cellWidth = columnStyles[colIndex].cellWidth || doc.internal.pageSize.width;
       const cellStyle = {...styles, ...columnStyles[colIndex]};
       const lines = doc.splitTextToSize(cell, cellWidth - cellStyle.cellPadding * 2);
       const cellHeight = lines.length * cellStyle.fontSize / doc.internal.scaleFactor + 2 * cellStyle.cellPadding;
       rowHeight = Math.max(rowHeight, cellHeight);
     });
     totalHeight += rowHeight;
   });
   return totalHeight;
 };

 const tableStyles = {
   fontSize: 8,
   cellPadding: 0,
   fontStyle: 'bold',
 };

 const columnStyles = {
   0: { cellWidth: 38 },
   1: { cellWidth: 2 },
   2: { cellWidth: 'auto' },
 };

 // Hitung tinggi tabel
 const tableHeight3 = calculateTableHeight2(tableData4, tableStyles, columnStyles);

 // Cek apakah tabel muat di halaman saat ini
 const remainingSpace = doc.internal.pageSize.height - yPos - doc.internal.getFontSize() * 3;
 if (tableHeight3 > remainingSpace - 15) {
   doc.addPage();
   pageNumber++;
   addHeader();
   addFooter();
   yPos = 30; 
 }

 doc.autoTable({
   body: tableData4,
   startY: yPos,
   margin: 20,
   theme: 'plain',
   styles: tableStyles,
   columnStyles: columnStyles,
   didParseCell: function(data) {
     if (data.row.index == 5) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fontSize = 8;
        data.cell.styles.minCellHeight = 0;
     }else if(data.row.index == 6) {
        data.cell.styles.fontStyle = 'bolditalic';
        data.cell.styles.fontSize = 7;
        data.cell.styles.minCellHeight = 1;
      }else if (data.row.index == 3) {
        data.cell.styles.minCellHeight = 4;
      }else if (data.row.index == 4) {
        console.log(data.cell.text);
        if(data.column.index == 1){
            data.cell.styles.minCellHeight = 8;
        }
      }
   },
   didDrawCell: function(data) {
     if (data.row.index == 0) {
       if (data.column.index == 0) {
         doc.setFontSize(6);
         doc.setFont("helvetica", "italic", "bold");
         doc.text('Net Value', data.cell.x, data.cell.y + 8);
       }
       if(data.column.index == 1){
        doc.setFontSize(6);
        doc.setFont("helvetica", "bold");
        doc.text('PPN     : 0', data.cell.x + 90, data.cell.y + 2);
        doc.setFontSize(5);
        doc.setFont("helvetica", "bolditalic");
        doc.text('VAT', data.cell.x + 90, data.cell.y + 4);
      }
     }
     if (data.row.index == 2) {
       if (data.column.index == 0) {
         doc.setFontSize(6);
         doc.setFont("helvetica", "italic", "bold");
         doc.text('Say', data.cell.x, data.cell.y + 5);
       }
       if (data.column.index == 1) {
         getCurrentLine = data.cell.y + 9;
       }
     }
   }
 });

 yPos = doc.lastAutoTable.finalY + 5;

//   ~~AKHIR CONTENT 7~~

  // ~~GARIS BIAYA TABLE~~

  const indonesianAmount = 'SATU MILYAR DUA RATUS ENAM PULUH TUJUH JUTA LIMA RATUS TIGA PULUH TIGA RIBU SEMBILAN RATUS DUA PULUH RUPIAH';
  const englishAmount = 'TWO MILLION FIVE HUNDRES NINETY THOUSAND NINETY-TWO RUPIAH';
  
  // Fungsi untuk mengukur lebar teks
  function getTextWidth(doc, text, fontSize) {
    doc.setFontSize(fontSize);
    return doc.getTextWidth(text);
  }
  
  // Menentukan teks terpanjang
  const longerText = getTextWidth(doc, indonesianAmount, 8) > getTextWidth(doc, englishAmount, 8) 
    ? indonesianAmount 
    : englishAmount;
  
  // Mengukur lebar teks terpanjang
  const textWidth = getTextWidth(doc, longerText, 8);
  
  // Menentukan posisi awal dan akhir garis
  const lineStartX = 60;
  const lineEndX = Math.min(lineStartX + textWidth + 5, 190);
  
  doc.setTextColor(0,0,0);
  doc.setDrawColor(0,0,0);
  doc.setFillColor(0,0,0);
  doc.setLineWidth(0.5);
  doc.line(lineStartX, getCurrentLine - 0.6, lineEndX, getCurrentLine- 0.6);
  yPos += 2;

  // ~~AKHIR GARIS BIAYA TABLE~~


  // CONTENT 4
  yPos = checkAndAddNewPage(yPos);

  doc.setFontSize(8);
  doc.setFont("helvetica","bold");
  doc.text("Pembayaran dapat dilakukan melalui transfer ke alamat rekening berikut ini dengan menambahkan informasi Billing Number", 15, yPos);
  yPos += 3;

  doc.setFontSize(7);
  doc.setFont("helvetica","bolditalic");
  doc.text("Please transfer to our bank as state the debit number on bank", 15, yPos);
  yPos += 3;

  // CONTENT 5
  yPos = checkAndAddNewPage(yPos);

  const tableData2 = {
    head: [
      ['Bank', 'Cabang/Branch', 'Mata Uang/Currency', 'Nomor Virtual Akun/Virtual Account Number', 'Nama Virtual Akun/Virtual Account Name']
    ],
    body: [
      ['MANDIRI', 'WISMA TUGU', 'IDR', '8800110240000740', 'TUGU PRATAMA INDONESIA']
    ]
  };

  const headerStyles2 = { fillColor: [0, 0, 139], textColor: [255, 255, 255], fontSize: 8 };
  const contentStyles2 = { fontSize: 8, textColor: [0, 0, 0], fontStyle: "bold" };

  // Hitung tinggi tabel
  const tableHeight2 = calculateTableHeight(tableData2, [
    { cellWidth: 30 },
    { cellWidth: 30 },
    { cellWidth: 30 },
    { cellWidth: 50 },
    { cellWidth: 50 }
  ]);

  // Cek apakah tabel muat di halaman saat ini
  const pageHeight2 = doc.internal.pageSize.getHeight();
  if (yPos + tableHeight2 > pageHeight2 - 20) {
    doc.addPage();
    pageNumber++;
    addHeader();
    addFooter();
    yPos = 35;
  }

  doc.autoTable({
    head: tableData2.head,
    body: tableData2.body,
    startY: yPos,
    margin: {right: 20, left: 20}, 
    styles: {
      halign: 'center',
      valign: 'middle',
      tableLineWidth: 0.5,
    },
    headStyles: headerStyles2,
    bodyStyles: contentStyles2,
    theme: 'grid',
    lineColor: 10,
    columnStyles: {
      0: { cellWidth: 22 },
      1: { cellWidth: 27 },
      2: { cellWidth: 26 },
      3: { cellWidth: 42 },
      4: { cellWidth: 50 }
    }
  });

  yPos = doc.lastAutoTable.finalY + 5;

  // CONTENT 6
  yPos = checkAndAddNewPage(yPos);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  doc.text("Pembayaran dapat dilakukan melalui transfer ke alamat rekening berikut ini dengan menambahkan informasi Billing Number", 15, yPos);
  yPos += 3;

  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(7);
  doc.text("Please transfer to our bank as state the debit number on bank", 15, yPos);
  yPos += 18;

  // CONTENT 7
  yPos = checkAndAddNewPage(yPos);

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text('HESTI LISTYOWATI .', 15, yPos);
  yPos += 1;
  doc.setTextColor(0,0,0);
  doc.setDrawColor(0,0,0);
  doc.setFillColor(0,0,0);
  doc.setLineWidth(0.5);
  doc.line(15, yPos, 60, yPos);
  yPos += 3;
  doc.text('AUTHORIZED SIGNATORY', 15, yPos);

  // Return the PDF as a Buffer
  return doc.output('arraybuffer');
};