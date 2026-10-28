import express from "express";
import { requestLogger } from "./middlewares/logger.js";
import soapRouter from "./routes/soapRouter.js";

/**
 * Crea y configura la aplicación de Express.
 * - Aplica el middleware de logging ANTES de las rutas SOAP.
 * - Monta el Router que registra los servicios SOAP.
 * - NO contiene lógica de operaciones ni definición de contratos WSDL.
 */
export const createApp = () => {
	const app = express();

	// 1. Middleware de logging (debe ir ANTES del router SOAP)
	app.use(requestLogger);

	// 2. Router de servicios SOAP
	//    Toda petición a /soap/* será manejada por el router
	app.use("/soap", soapRouter);

	// 3. Ruta raíz informativa (no es SOAP, solo para verificar que el server vive)
	app.get("/", (_req, res) => {
		res.json({
			service: "Práctica SOAP y WSDL con Express",
			endpoints: {
				conversiones: "/soap/conversiones?wsdl",
				geometria: "/soap/geometria?wsdl",
			},
		});
	});

	// 4. Manejador 404 para rutas no registradas
	app.use((_req, res) => {
		res.status(404).json({ error: "Ruta no encontrada" });
	});

	return app;
};
