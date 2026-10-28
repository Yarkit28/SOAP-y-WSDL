import { Router } from "express";
import soap from "soap";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { conversionesService } from "../services/conversionesService.js";
import { geometriaService } from "../services/geometriaService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WSDL_DIR = path.resolve(__dirname, "..", "wsdl");

// Leemos el WSDL como string (es lo que espera soap.listen)
const conversionesWsdl = fs.readFileSync(
	path.join(WSDL_DIR, "conversiones.wsdl"),
	"utf8",
);
const geometriaWsdl = fs.readFileSync(
	path.join(WSDL_DIR, "geometria.wsdl"),
	"utf8",
);

const soapRouter = Router();

/**
 * Callback de inicialización. Es el QUINTO argumento.
 * Si no se pasa, soap puede fallar con "this.callback is not a function"
 * cuando hay cualquier problema al procesar el WSDL.
 */
const handleSoapError = (serviceName) => (err) => {
	if (err) {
		console.error(`Error al inicializar servicio SOAP "${serviceName}":`, err);
		process.exit(1);
	}
	console.log(`✅ Servicio SOAP "${serviceName}" inicializado correctamente`);
};

// --- Servicio de Conversiones ---
const conversionesRouter = Router();
soap.listen(
	conversionesRouter,
	"/",
	conversionesService,
	conversionesWsdl,
	handleSoapError("conversiones"), // 5º argumento: callback
);

// --- Servicio de Geometría ---
const geometriaRouter = Router();
soap.listen(
	geometriaRouter,
	"/",
	geometriaService,
	geometriaWsdl,
	handleSoapError("geometria"), // 5º argumento: callback
);

soapRouter.use("/conversiones", conversionesRouter);
soapRouter.use("/geometria", geometriaRouter);

export default soapRouter;
