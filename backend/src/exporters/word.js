import { Document, Packer, Paragraph, TextRun } from "docx";

/**
 * exportToDocx(payload) -> Promise<Buffer>
 * payload can include test object and mapping for mail-merge
 */
export async function exportToDocx({ test }) {
  const doc = new Document();
  doc.addSection({
    children: [
      new Paragraph({ text: "Exported Test", heading: "Heading1" }),
      ...test.questions.map((q,i) => new Paragraph({
        children: [
          new TextRun({ text: `${i+1}. ${q.question}`, bold: true })
        ]
      }))
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
