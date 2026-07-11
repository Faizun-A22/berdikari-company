import { supabase } from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function clearDb() {
  console.log('Starting DB and Local Fallback cleanup...');

  // 1. Clear Supabase tables
  const tables = [
    'portfolios',
    'activities',
    'contact_submissions',
    'financial_transactions',
    'invoices'
  ];

  for (const table of tables) {
    try {
      console.log(`Clearing Supabase table: ${table}...`);
      const { error } = await supabase
        .from(table)
        .delete()
        .not('id', 'is', null);

      if (error) {
        throw error;
      }
      console.log(`Successfully cleared Supabase table: ${table}`);
    } catch (err) {
      console.error(`Error clearing Supabase table ${table}:`, err.message);
    }
  }

  // 2. Clear Local JSON Fallback files
  const filesToClear = [
    { name: 'portfolios_store.json', content: '[]' },
    { name: 'contact_store.json', content: '[]' },
    { name: 'finance_store.json', content: JSON.stringify({ transactions: [], invoices: [] }, null, 2) }
  ];

  for (const fileObj of filesToClear) {
    const filePath = path.resolve(__dirname, fileObj.name);
    try {
      console.log(`Clearing local store file: ${fileObj.name}...`);
      fs.writeFileSync(filePath, fileObj.content);
      console.log(`Successfully cleared local store file: ${fileObj.name}`);
    } catch (err) {
      console.error(`Error clearing local file ${fileObj.name}:`, err.message);
    }
  }

  console.log('Cleanup finished successfully!');
}

clearDb();
