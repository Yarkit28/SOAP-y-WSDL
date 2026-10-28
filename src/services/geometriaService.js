/**
 * Implementación del servicio GeometriaService.
 *
 * Operaciones (deben coincidir EXACTAMENTE con los nombres del WSDL):
 *   - AreaRectangulo
 *   - PerimetroRectangulo
 *
 * Ambas operaciones reciben dos parámetros: base y altura.
 * Se usa el mismo patrón de "unwrap" que en conversionesService para
 * manejar document/literal de forma consistente.
 */

/**
 * Desenvuelve los argumentos del mensaje SOAP (ver conversionesService.js).
 * Con document/literal, soap entrega algo como:
 *   { AreaRectanguloRequest: { base: 8, altura: 5 } }
 * y queremos:
 *   { base: 8, altura: 5 }
 */
const unwrapArgs = (args) => {
	if (!args || typeof args !== "object") return {};

	for (const key of Object.keys(args)) {
		const value = args[key];
		if (value && typeof value === "object" && !Array.isArray(value)) {
			return value;
		}
	}
	return args;
};

/**
 * Valida que los parámetros base y altura sean numéricos.
 * Lanza un error con mensaje claro si algo falta o no es válido.
 */
const validarDimensiones = ({ base, altura }) => {
	if (typeof base !== "number" || Number.isNaN(base)) {
		throw new Error('El parámetro "base" es obligatorio y debe ser numérico.');
	}
	if (typeof altura !== "number" || Number.isNaN(altura)) {
		throw new Error(
			'El parámetro "altura" es obligatorio y debe ser numérico.',
		);
	}
};

/**
 * Calcula el área de un rectángulo: A = base * altura
 */
const areaRectangulo = (args) => {
	const params = unwrapArgs(args);
	validarDimensiones(params);

	const { base, altura } = params;
	const area = base * altura;
	return { area };
};

/**
 * Calcula el perímetro de un rectángulo: P = 2 * (base + altura)
 */
const perimetroRectangulo = (args) => {
	const params = unwrapArgs(args);
	validarDimensiones(params);

	const { base, altura } = params;
	const perimetro = 2 * (base + altura);
	return { perimetro };
};

/**
 * Objeto exportado con la estructura que la librería `soap` espera:
 *   { NombreServicio: { NombrePort: { operacion: fn } } }
 *
 * Coincide con el WSDL:
 *   <service name="GeometriaService">
 *     <port name="GeometriaPort">
 */
export const geometriaService = {
	GeometriaService: {
		GeometriaPort: {
			AreaRectangulo: areaRectangulo,
			PerimetroRectangulo: perimetroRectangulo,
		},
	},
};
