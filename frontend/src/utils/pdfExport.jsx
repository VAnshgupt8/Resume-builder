// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// export const downloadPDF = async () => {
//   const input = document.getElementById('resume-preview');

//   const canvas = await html2canvas(input);
//   const imgData = canvas.toDataURL('image/png');

//   const pdf = new jsPDF('p', 'mm', 'a4');

//   pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
//   pdf.save('resume.pdf');
// };
// frontend/src/utils/pdfExport.jsx
export const downloadPDF = async () => {
  const { default: html2canvas } = await import('html2canvas');
  const { default: jsPDF } = await import('jspdf');

  const element = document.getElementById('resume-preview');
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, width, height);
  pdf.save('resume.pdf');
};