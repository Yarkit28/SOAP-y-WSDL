// src/index.js
import { createApp } from './app.js';
import { PORT, HOST } from './config/soapOptions.js';

const app = createApp();

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════');
  console.log(`  Servidor SOAP escuchando en ${HOST}`);
  console.log('═══════════════════════════════════════════════');
  console.log(`  Conversiones WSDL: ${HOST}/soap/conversiones?wsdl`);
  console.log(`  Geometría WSDL:    ${HOST}/soap/geometria?wsdl`);
  console.log('═══════════════════════════════════════════════');
});