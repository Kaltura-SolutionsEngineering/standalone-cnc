# Example Server & Client
This documentation provides detailed information about the Example Server & Client application, which demonstrates the integration of Kaltura's Chat and Collaboration (CNC) app. The application consists of a server implemented in Node.js with TypeScript using the Koa web framework, and a client-side webpage built with HTML, CSS, and JavaScript.

## Introduction
The Example Server & Client application showcases how to integrate Kaltura's CNC app into a web application. The server provides the necessary APIs for client-server communication, user management, and Kaltura integration. The client-side webpage initiates the CNC app, retrieves partner data from the server, and enables user interactions.

## What the application does

Here's a general summary of how this application works:

- **Loading Libraries**: The application starts by loading the necessary libraries and dependencies. These may include frameworks like Koa, the Kaltura library, or any other components required for the application to function.

- **Setting Up Configuration**: Next, the application sets up its configuration. This involves defining variables, API keys, and any other settings specific to the application's environment.

- **Creating a Server**: The application creates a server instance using the Koa framework. The server listens for incoming requests from clients (web browsers, API clients, etc.) and routes those requests to the appropriate handlers.

- **Loading Content**: It loads static content such as HTML, CSS, and client-side JavaScript files. These files define the structure, styling, and behavior of the user interface.

- **Handling Requests**: When a request is received, the server determines the appropriate handler based on the requested URL and HTTP method. It may also parse request parameters, headers, and bodies to extract relevant data.

- **Processing Data**: The application may interact with a Kaltura API to retrieve or store data. It processes the data based on the request, performing tasks like making API calls, or performing business logic operations.

- **Generating Responses**: After processing the request and obtaining the necessary data, the application generates a response. This is HTML content.

- **Sending the Response**: The server sends the response back to the client that made the request. It includes the appropriate headers, such as status codes, content types, and any additional metadata.

- **Handling Errors**: Throughout the process, if any errors occur, the application handles them appropriately. This could involve logging the error, returning error messages to the client, or taking corrective actions to mitigate the issue.

- **Continuously Listening**: The server continues to listen for new requests, repeating the process for each incoming request until it is stopped or the application is shut down.

It's important to note that this is a high-level overview.

## Getting Started
To run the application, follow these steps:

- Clone the repository.
- Install the dependencies by running `npm install`.
- Configure the environment variables described in the "Configuration (.env environment variables)" section below.
- Start the server by running `npm run watch-server`.
- Open the client-side webpage in your browser.

## Configuration (.env environment variables)

The application requires certain configuration settings to connect with Kaltura and function properly. These settings are managed using environment variables. Create a .env file in the project's root directory and define the following environment variables:

- **KALTURA_PARTNER_ID=<Partner_id>** `-> PID found in the Kaltura Management Console (KMC)`
- **KALTURA_ADMIN_SECRET=<Admin_secret>** ` -> Admin Secret found in the KMC OR App Token (recommended)`
- **KALTURA_ADMIN_USER_ID=<User_id>** ` -> Owner of the KMC - found in the KMC`
- **KALTURA_URL=<Kaltura_url>** `e.g., https://www.kaltura.com`
- **KALTURA_UICONFID=<Player_id>** `-> Player ID taken from Studio in KMC`
- **KALTURA_CNC_UICONFID=<UI_conf_id>**` -> UIConf ID from the KMS admin's admin/config/tab/chatandcollaboration field "uiConfId"`
- **KALTURA_LEGALTEXT_ENTRY_ID=<Legal_id>** ` -> Entry ID that makes up the legal text URL, found in the KMS admin`
- **KALTURA_REACTION_UICONFID=<Reaction_id>** ` -> Reactions UIConf ID from the KMS admin's admin/config/tab/chatandcollaboration field "reactionsUiconfId"`
- **KALTURA_USE_GROUP_FOR_MODERATORS=<true/false>** ` -> toggle this to decide whether moderator should actually exist and be placed in groups or skip user group verification and just pass the group ID as if the user belongs to it`
- **KALTURA_KME_URL=<kme_url>** ` ->  Absolute URL where KME is launched from`
- **KALTURA_KME_SECRET=<lti_secret>** ` -> KME LTI launch secret`
- **KALTURA_KME_KEY=<lti_key>** ` -> KME LTI launch key`
- **KALTURA_KME_ROLE=<kme_role>** ` -> User role within KME room (Instructor/Student)`

Make sure to replace the placeholder values with the appropriate information for your Kaltura setup.

### Important note about the CnC authentication and authorization flow

The initial admin secret or app token (recommended) is primarily used to generate the JWT, and the JWT is used for authentication and authorization.
 
Here's a breakdown of the steps involved:

- **Initial Authentication**: The initial authentication is performed using an admin secret or an initial app token. This step is responsible for obtaining the necessary credentials to interact with the Kaltura API.

- **JWT Generation**: Once the initial authentication is successful, a JSON Web Token (JWT) is generated. The JWT is used for subsequent communication with the Kaltura Chat and Collaboration (CnC) server. It serves as an authentication token that verifies the identity of the client and allows access to the CnC services.

- **Retrieval of CnC App Token**: The `getAppToken()` function is responsible for retrieving the CnC app token. This token is specific to the CnC application and is required to access user information and interact with the CnC server. The `getAppToken()` function makes a request to the server to obtain the CnC app token, which is then used in the configuration of the Chat and Collaboration widget.

To summarize, the initial authentication provides the necessary credentials, the JWT is generated for authentication with the CnC server, and the `getAppToken()` function retrieves the CnC app token for accessing user information and configuring the CnC widget.

### Important note about the Registration Webhook authentication

The registration webhook uses a webhook key for authentication of provisioning requests. In the `.env` file, there is a variable named REGISTRATION_WEBHOOK_KEY which contains the webhook key.

When a provisioning request is sent to the Kaltura server, it needs to include the webhook key as part of the request for authentication. This ensures that only authorized requests with a valid webhook key can access and interact with the registration webhook functionality.

By using the webhook key for authentication, the Kaltura server can verify the authenticity and integrity of the incoming provisioning requests and allow or reject them based on the provided key.

## Client-Side Usage

The client-side webpage is responsible for initiating the CNC app, retrieving partner data from the server, and facilitating user interactions. Here are the key aspects of the client-side implementation:

- The webpage calls the server to retrieve partner data and start the CNC app.

- To load a specific user, append /user={email} to the webpage URL. If the user doesn't exist, the server automatically adds the user to Kaltura.

- The CNC app is loaded and displayed to the user, enabling real-time chat and collaboration features.

## Server-Side Implementation
The Simple Node Typescript server is implemented using Node.js and the [Koa web framework](https://koajs.com/)). It provides the necessary APIs for the client-side webpage and handles user management and Kaltura integration.

![Node](https://img.shields.io/badge/Node-18-green)
![TypeScript](https://img.shields.io/badge/Typescript-4-blue)

Here are the important components of the server-side implementation:
- **getJwt.ts**: This file contains functions for generating a JSON Web Token (JWT) signed with the app token retrieved from Kaltura and user data.
- **server.ts**: This file sets up the Koa server, defines the routes and middleware, and handles requests from the client-side webpage.
Refer to the source code and comments in these files for detailed information on the server-side implementation.

### 💻 Start server - `npm run watch-server`

Simple webpage that retrieves partner data from the server, then loads the floater CNC app.
Using plain JS HTML and CSS.

![Html5](https://img.shields.io/badge/HTML-5-orange)
