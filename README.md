# Práctica: Servicios Web SOAP con Express y WSDL

Este proyecto implementa dos servicios web SOAP utilizando Node.js (ES6), Express y la librería `soap`, cumpliendo con la separación de responsabilidades (Router, Middleware, Servicios, WSDL).

## 📋 Requisitos
- Node.js v18 o superior
- npm

## 🚀 Instalación y Ejecución
1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
3. Iniciar el servidor:

bash
npm start
El servidor estará disponible en http://localhost:3000.

🛠️ Endpoints y Contratos WSDL
Al acceder a los siguientes enlaces desde el navegador, podrá ver el contrato WSDL de cada servicio:

Conversiones: http://localhost:3000/soap/conversiones?wsdl

Geometría: http://localhost:3000/soap/geometria?wsdl

## 🧪 Reproducción de Pruebas (Postman)
Para probar las operaciones, realice peticiones POST a los endpoints con los headers Content-Type: text/xml y SOAPAction.

Las peticiones XML utilizadas se encuentran en la carpeta requests/:

CelsiusAFahrenheit: Enviar requests/celsius-a-fahrenheit.xml a http://localhost:3000/soap/conversiones. (Esperado: 77)

KilometrosAMillas: Enviar requests/kilometros-a-millas.xml a http://localhost:3000/soap/conversiones. (Esperado: 6.21371)

AreaRectangulo: Enviar requests/area-rectangulo.xml a http://localhost:3000/soap/geometria. (Esperado: 40)

PerimetroRectangulo: Enviar requests/perimetro-rectangulo.xml a http://localhost:3000/soap/geometria. (Esperado: 26)

Las evidencias de las respuestas y del middleware de logging están en la carpeta evidencias/.