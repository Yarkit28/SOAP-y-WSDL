// src/middlewares/logger.js

/**
 * Middleware de registro de peticiones.
 * Registra: método HTTP, URL solicitada, código de estado y tiempo de procesamiento.
 * NO modifica el contenido XML de la petición ni de la respuesta.
 */
export const requestLogger = (req, res, next) => {
	const startTime = process.hrtime.bigint();

	// Se ejecuta cuando la respuesta termina de enviarse
	res.on("finish", () => {
		const endTime = process.hrtime.bigint();
		const durationMs = Number(endTime - startTime) / 1_000_000; // ns -> ms

		const logEntry = {
			timestamp: new Date().toISOString(),
			method: req.method,
			url: req.originalUrl,
			statusCode: res.statusCode,
			durationMs: durationMs.toFixed(3),
			contentType: req.headers["content-type"] || "N/A",
		};

		console.log(
			`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} → ${logEntry.statusCode} (${logEntry.durationMs} ms)`,
		);
	});

	// Importante: pasamos el control al siguiente middleware/ruta sin tocar el body
	next();
};
