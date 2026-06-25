# ChatBot Wizy API

Este repositorio contiene la solución a la prueba técnica para el puesto de Fullstack Developer en Wizybot. Consiste en un API endpoint construido con **NestJS (TypeScript)** que se comunica con la API de OpenAI (Chat Completion) y utiliza Function Calling para proporcionar a un agente de IA herramientas específicas.

## Herramientas del Agente
1. `searchProducts(query)`: Lee y busca productos dentro de `products_list.csv`.
2. `convertCurrencies(price, from, to)`: Consume la API pública de Open Exchange Rates para convertir monedas.

## 🚀 Requisitos Previos
- Node.js (v18+)
- NPM o Yarn
- Una API Key válida de [OpenAI](https://platform.openai.com/)
- Un App ID válido de [Open Exchange Rates](https://openexchangerates.org/)

## ⚙️ Configuración del Proyecto

1. Clona el repositorio y entra al directorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Agrega tus credenciales en el archivo `.env`:
   ```env
   OPENAI_API_KEY=tu_api_key_de_openai
   OPEN_EXCHANGE_RATES_APP_ID=tu_app_id_de_open_exchange_rates
   ```
5. Asegúrate de que el archivo `products_list.csv` exista en la raíz del proyecto.

## 🏃 Ejecución de la Aplicación

```bash
# Desarrollo
npm run start

# Modo Watch (desarrollo activo)
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📖 Documentación de la API (Swagger)

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva generada con Swagger en:

[http://localhost:3000/api](http://localhost:3000/api)

## 🧪 Cómo hacer peticiones al Endpoint

El endpoint principal para interactuar con el chatbot es `POST /chatbot/chat`.

### Ejemplo con cURL:

```bash
curl -X POST http://localhost:3000/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "I am looking for a phone"}'
```

### Ejemplos de Consultas para probar:
- *"I am looking for a phone"*
- *"I am looking for a present for my dad"*
- *"How much does a watch costs?"*
- *"What is the price of the watch in Euros"*
- *"How many Canadian Dollars are 350 Euros"*

## 🔍 Análisis de Código (SonarQube)
Se ha incluido un archivo `sonar-project.properties`. Si tienes Sonar Scanner configurado, puedes ejecutar un análisis de calidad de código local usando:
```bash
sonar-scanner
```
