Technical Assessment: Fullstack Developer Position
Context
At Wizybot, we have developed an AI Customer Support and Sales Agent. Wizybot is powered by a Large Language Model
(LLM), which basically consists of a text generation model trained on a large corpus of data, allowing it to generate
responses to user enquiries using natural language. One of the fundamental ideas behind AI Agents such as Wizybot is
that you can instruct an LLM to use tools or functions, which allows it to perform tasks such as make API requests, execute
code, or search in databases.
The pipeline of instructing an LLM to use a tool can be summarized in the following steps:
1. Receive a user ́s enquiry:
• User input example: “Hello, what is the weather in Bogotá today?”
2. Make a first call to the LLM indicating the user ́s enquiry and the tools it has available, so the LLM can indicate
which tool and parameters does it want to us.
• Prompt Example: “A user asks: Hello, what is the weather in Bogota? You have the following functions
available: 1. getWeather(city) 2. getPopulation(city). Indicate which function you want to use to solve the
user’s enquiry.”
• LLM Response Example: “getWeather(Bogotá)”
3. Execute the function indicated by the LLM, which might involve executing code locally or making an API request.
4. Make a second call to the LLM to communicate the result so it can generate a final response:
• Prompt Example: “A user asks: Hello, what is the weather in Bogota? You have the following functions
available: 1. getWeather(city) 2. getPopulation(city). You chose to execute the function
getWeather(Bogotá). The result was: Cloudy, 13oC. Formulate a final response.”
• LLM Response Example: “The weather today in Bogotá is Cloudy. The temperature is 13 degrees Celsius.”
5. Send the final response of the LLM to the user.
Task Description
During the following technical assessment, you will implement an API endpoint that allows communication with a chatbot
that has access to 2 tools: searchProducts() and convertCurrencies().
Complete the following requirements:
1. Create an API endpoint using Nest.js which allows communication with the chatbot. The input of the API endpoint
should be a string which corresponds to the user enquiry. The output of the API endpoint should be a string which
corresponds to the final LLM response.
2. Use the OpenAI Chat Completion API with Function Calling to implement a chatbot that can use the
searchProducts() and convertCurrencies() tools.
3. The searchProducts() tool must retrieve a selection of 2 items from the products_list.csv file that was provided
through email. The retrieved products should be related to the customer ́s enquiry. Feel free to implement the
search algorithm that you consider most adequate.
4. The convertCurrencies() tool should allow to convert a price from one currency to another. This process should
involve making a request to the Open Exchange Rates API to get the latest currency exchange rate.
You can test your chatbot implementation with the following user queries:

• “I am looking for a phone”
• “I am looking for a present for my dad”
• “How much does a watch costs?”
• “What is the price of the watch in Euros”
• “How many Canadian Dollars are 350 Euros”
Considerations:
• You must implement the API endpoint using NestJS with Typescript. We expect you to implement good practices
such us using controllers for handling the input and output routing, services for business logic, and Data Transfer
Objects (DTOs) as required.
• The names of the variables, functions and classes declared in your code should be written in English. We expect
your code to be adequately commented in English to understand your implementation. We also encourage
implementing a tool like Swagger for generating automatic API endpoint documentation.
• You must use the OpenAI Chat Completion API. Solutions that use the OpenAI Agent API will not be considered.
• You should check that your API is working as expected using tools such as cURL, Postman, or Insomnia before
submission.
Submission
Please send a URL of a public repository in your GitHub account to
README.md file in the root path of the main branch which includes clear instructions of how to run your code. List the
repository. Also, provide clear documentation of how to do a request to your API endpoint.