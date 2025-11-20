import express from 'express';
import multer from 'multer';
import { parseImportFile } from '../services/importer.js';
import { exportToDocx } from '../exporters/word.js';
import fs from 'fs';

const upload = multer({ dest: './tmp' });
const router = express.Router();

// GET lista example
router.get('/', (req, res) => {
  // En fase 1 puedes devolver ficheros de /data o una lista JSON
  const files = fs.readdirSync(new URL('../../data/', import.meta.url).pathname)
                  .filter(f => f.endsWith('.js') || f.endsWith('.json'));
  res.json({ tests: files });
});

// POST importar archivo de texto (form-data file=...)
router.post('/import', upload.single('file'), async (req, res) => {
  try {
    const parsed = await parseImportFile(req.file.path);
    // Guarda parsed en DB/data (a definir). Aquí devolvemos el objeto
    res.json({ success: true, parsed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  } finally {
    // borrar tmp
    if (req.file) fs.unlink(req.file.path, () => {});
  }
});

// POST exportar test a docx (body: { testId, mapping })
router.post('/export/docx', async (req, res) => {
  try {
    const buffer = await exportToDocx(req.body);
    res.setHeader('Content-Disposition', 'attachment; filename=test_export.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;