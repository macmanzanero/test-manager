import fs from 'fs/promises';

/**
 * parseImportFile(filePath) -> Promise(parsedObject)
 * Implementa el parser que convierta tu archivo de texto a la estructura interna de test.
 * Se puede definir un formato sencillo (ej: preguntas separadas por líneas "Q:", respuestas "A:", etc).
 */
export async function parseImportFile(filePath) {
  const text = await fs.readFile(filePath, 'utf-8');

  // Ejemplo simple: dividir por preguntas separadas por doble salto de línea
  const blocks = text.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
  const parsed = blocks.map(block => {
    const lines = block.split('\n').map(l => l.trim());
    // ej: first line is question, following are choices prefixed by "- "
    const question = lines.shift();
    const choices = lines.map(l => l.replace(/^[\-\*]\s*/, ''));
    return { question, choices };
  });
  return parsed;
}