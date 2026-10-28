/**
 * Implementación del servicio ConversionesService.
 *
 * Operaciones (deben coincidir EXACTAMENTE con los nombres del WSDL):
 *   - CelsiusAFahrenheit
 *   - KilometrosAMillas
 *
 * La librería `soap` en estilo document/literal entrega los argumentos
 * envueltos en el elemento raíz del mensaje. Por eso usamos `unwrapArgs`
 * para acceder a los campos directamente.
 */

/**
 * Factor de conversión exacto: 1 km = 0.621371 millas
 */
const KM_A_MILLAS = 0.621371;

/**
 * Desenvuelve los argumentos del mensaje SOAP.
 * Con document/literal, soap entrega algo como:
 *   { CelsiusAFahrenheitRequest: { celsius: 25 } }
 * y queremos:
 *   { celsius: 25 }
 *
 * Si el objeto ya viene plano (por ejemplo, cuando se prueba directamente
 * desde JS), devolvemos el objeto tal cual.
 */
const unwrapArgs = (args) => {
	if (!args || typeof args !== "object") return {};

	// Buscar la primera clave que sea un objeto (el elemento raíz del mensaje)
	for (const key of Object.keys(args)) {
		const value = args[key];
		if (value && typeof value === "object" && !Array.isArray(value)) {
			return value;
		}
	}
	return args;
};

/**
 * Convierte grados Celsius a Fahrenheit.
 * Fórmula: F = C * 9/5 + 32
 */
const celsiusAFahrenheit = (args) => {
	const { celsius } = unwrapArgs(args);

	if (typeof celsius !== "number" || Number.isNaN(celsius)) {
		throw new Error(
			'El parámetro "celsius" es obligatorio y debe ser numérico.',
		);
	}

	const fahrenheit = (celsius * 9) / 5 + 32;
	return { fahrenheit };
};

/**
 * Convierte kilómetros a millas.
 * Fórmula: mi = km * 0.621371
 */
const kilometrosAMillas = (args) => {
	const { kilometros } = unwrapArgs(args);

	if (typeof kilometros !== "number" || Number.isNaN(kilometros)) {
		throw new Error(
			'El parámetro "kilometros" es obligatorio y debe ser numérico.',
		);
	}

	const millas = kilometros * KM_A_MILLAS;
	return { millas };
};

/**
 * Objeto que la librería `soap` espera para registrar los servicios.
 * La estructura debe ser:
 *   { NombreDelServicio: { NombreOperacion: funcion } }
 *
 * El nombre del servicio coincide con el <service name="ConversionesService"> del WSDL.
 */
export const conversionesService = {
	ConversionesService: {
		ConversionesPort: {
			CelsiusAFahrenheit: celsiusAFahrenheit,
			KilometrosAMillas: kilometrosAMillas,
		},
	},
};
