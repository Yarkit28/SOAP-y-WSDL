export const soapOptions = {
	// Importante: evita que soap intente cachear el WSDL y enmascare errores
	disableCache: true,
	// Devuelve Faults SOAP cuando falla una operación (en lugar de lanzar)
	returnFault: true,
};

/**
 * Puerto del servidor (configurable por variable de entorno)
 */
export const PORT = process.env.PORT || 3000;

/**
 * Host base para construir las URLs absolutas en los WSDL.
 */
export const HOST = process.env.HOST || `http://localhost:${PORT}`;
