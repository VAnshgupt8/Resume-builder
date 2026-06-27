const PDFDocument = require("pdfkit");

const generatePDF = (
  resume,
  res
) => {

  const doc =
  new PDFDocument();

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${resume.title}.pdf`
  );

  doc.pipe(res);

  // Header

  doc
  .fontSize(24)
  .text(
    resume.personal.fullName || "",
    {
      align:"center"
    }
  );

  doc.moveDown();

  doc
  .fontSize(12)
  .text(
    `${resume.personal.email || ""}
     | ${resume.personal.phone || ""}`
  );

  doc.moveDown();

  // Summary

  doc
  .fontSize(18)
  .text("Summary");

  doc
  .fontSize(12)
  .text(
    resume.summary || ""
  );

  doc.moveDown();

  // Skills

  doc
  .fontSize(18)
  .text("Skills");

  doc
  .fontSize(12)
  .text(
    resume.skills.join(", ")
  );

  doc.moveDown();

  // Projects

  doc
  .fontSize(18)
  .text("Projects");

  resume.projects.forEach(
    project => {

      doc
      .fontSize(14)
      .text(project.title);

      doc
      .fontSize(12)
      .text(
        project.description
      );

      doc.moveDown();

    }
  );

  doc.end();

};

module.exports =
generatePDF;