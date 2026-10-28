/**
 * Opciones comunes para los servidores SOAP.
 * Centralizadas para no repetirlas en cada servicio.
 */
export const soapOptions = {
	// Desactiva el logging interno de la librería soap.
	// Nosotros ya tenemos nuestro propio middleware de logging.
	disableCache: true,
	returnFault: true,
	handleUpgrade: false,
	// Fuerza a que soap respete el formato XML sin transformarlo
	suppressStack: false,
	// Endpoint base que se usará en los WSDL (lo sobreescribimos por servicio)
	enableChunkedEncoding: false,
};

/**
 * Ruta base donde se publican los servicios SOAP.
 * Coincide con lo solicitado en la práctica: /soap/conversiones y /soap/geometria
 */
export const SOAP_BASE_PATH = "/soap";

/**
 * Puerto del servidor (configurable por variable de entorno)
 */
export const PORT = process.env.PORT || 3000;

/**
 * Host base para construir las URLs absolutas en los WSDL.
 * En producción se reemplazaría por el dominio real.
 */
export const HOST = process.env.HOST || `http://localhost:${PORT}`;
