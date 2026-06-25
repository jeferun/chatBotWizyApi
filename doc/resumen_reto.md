# Resumen del Reto Técnico: Fullstack Developer (Wizybot)

Este documento resume los puntos clave y las consideraciones más importantes descritas en `infoGeneral.md` para la prueba técnica, así como una evaluación de los apuntes iniciales.

## 📌 Objetivos Principales

El objetivo es desarrollar un **API endpoint** utilizando **NestJS (TypeScript)** que permita la comunicación con un agente de IA (chatbot). Este chatbot actuará recibiendo consultas en lenguaje natural del usuario, decidiendo qué herramientas usar, y generando una respuesta final en texto.

El chatbot debe tener acceso a **dos herramientas específicas** (Function Calling):
1. **`searchProducts()`**: Debe buscar y devolver una selección de 2 productos relevantes basados en la consulta del usuario, leyendo de un archivo proporcionado llamado `products_list.csv`. La implementación del algoritmo de búsqueda queda a tu criterio.
2. **`convertCurrencies()`**: Debe permitir convertir un precio de una moneda a otra. Para esto se debe consumir la API pública de **Open Exchange Rates**.

## 🛠 Requisitos Técnicos

- **Framework**: NestJS con TypeScript.
- **Arquitectura**: Aplicar buenas prácticas del framework (Uso de Controllers para el enrutamiento, Services para la lógica de negocio y DTOs para la validación de datos).
- **IA/LLM**: Utilizar exclusivamente **OpenAI Chat Completion API con Function Calling**. 
- **Idioma del Código**: Todo el código (variables, funciones, clases) y los comentarios deben estar estrictamente en **Inglés**.

## 🚨 Consideraciones Críticas (¡Muy Importante!)

- **Prohibido usar OpenAI Agent API**: La solución debe construir el "cerebro" gestionando las llamadas manualmente usando la *Chat Completion API*. Las soluciones que utilicen la *OpenAI Agent API* (que automatiza esto por debajo) no serán consideradas.
- **Documentación de API**: Se sugiere fuertemente (casi obligatorio por buenas prácticas) implementar **Swagger** para generar la documentación automática del endpoint.
- **Código Limpio y Comentado**: Se evaluarán las buenas prácticas de programación y los comentarios (en inglés) que expliquen el porqué de tu implementación.
- **Pruebas Locales**: Asegurarse de que la API funcione correctamente haciendo pruebas locales (Postman, Insomnia, cURL) antes de enviar la prueba.
- **Entregables**: 
  - Un repositorio público en GitHub.
  - El archivo `README.md` en la rama principal debe contener instrucciones precisas de cómo ejecutar el proyecto y cómo hacer una petición al endpoint.

---

## 📝 Evaluación de tus Apuntes (`apuntes.md`)

Tus notas están **muy bien alineadas** con lo que solicita el reto. Has captado perfectamente la restricción más importante (no usar Agent API) y has incluido pasos excelentes que aportan valor profesional, como la configuración de Lint y SonarQube.

**Sugerencias de tareas adicionales para tu lista:**
1. **Configuración de Variables de Entorno (Credenciales)**: Aparte de la API Key de OpenAI, vas a necesitar registrarte y obtener una API Key para **Open Exchange Rates**.
2. **Manejo del CSV**: Incluir una tarea específica para cargar, parsear y buscar sobre el archivo `products_list.csv`. Podrías usar una librería como `csv-parser` o similar.
3. **Manejo de Errores**: Asegurarte de que el endpoint no se caiga si la API de OpenAI o la de Open Exchange Rates fallan o tardan en responder.
