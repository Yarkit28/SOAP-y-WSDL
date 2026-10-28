# Conclusiones

El desarrollo de esta práctica permitió comprender la arquitectura y utilidad de los servicios web SOAP. A diferencia de REST con JSON, SOAP utiliza XML para el intercambio de información, lo que aporta un alto nivel de formalidad, tipado estricto y extensibilidad, siendo ideal para entornos empresariales donde la robustez es más importante que la ligereza.

El contrato WSDL es fundamental porque actúa como un "contrato" entre el proveedor y el consumidor. Al consultar el WSDL, una aplicación sabe exactamente qué operaciones existen, qué parámetros recibe y qué esperar de vuelta, permitiendo generar clientes automáticamente. Consultar el WSDL es una operación de lectura de metadatos (GET), mientras que invocar una operación implica enviar un sobre SOAP con datos (POST).

Por otro lado, el uso de Express Router fue clave para mantener la aplicación escalable. Al separar los endpoints de los servicios de la configuración principal (`app.js`), se evita que el código se convierta en un monolito inmanejable, facilitando el mantenimiento y la adición de nuevos servicios SOAP sin afectar los existentes.

El middleware para registrar peticiones es otra excelente práctica. Si intentáramos registrar el tráfico dentro de cada operación, repetiríamos código y ensuciaríamos la lógica de negocio. Al implementarlo como middleware, interceptamos todas las peticiones (tanto las consultas de WSDL como las invocaciones) de forma centralizada, midiendo el tiempo y el estado sin modificar el contenido XML.

Finalmente, SOAP sigue siendo conveniente en escenarios de integración bancaria o sistemas legacy, mientras que una API REST con JSON es más sencilla para aplicaciones web modernas o móviles, donde el rendimiento y la ligereza son prioridad.