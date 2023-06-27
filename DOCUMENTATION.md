# Node.js project structure and source code

In a Node.js application, the "public" and "lib" directories are commonly used to organize different types of files and resources.

- **"public" Directory**:
The "public" directory is used to store static files that will be served directly to clients, such as web browsers.
These files include HTML, CSS, JavaScript, images, and other assets required for the user interface or front-end of a web application.
When a client makes a request for a static file, the server typically serves the corresponding file from the "public" directory.

- **"lib" Directory**:
The "lib" directory is short for "library" and typically contains files that contain reusable code or modules used within the application.
These files often define functions, classes, or utility modules that provide specific functionality.
Code is organized into separate files within the "lib" directory to promote modularity and maintainability.
These files can be imported and used in other parts of the application.

By convention, these directory names are not enforced by Node.js itself but are widely used and recommended in many Node.js projects to maintain a clean and organized project structure. However, you have the flexibility to choose different directory names or organize your files based on your specific project's needs.

## The root directory

There are a few files which are typically not placed in the "lib" or "public" directories, they have the following roles:

- **.env** file:
The **.env** file is used to store environment variables. It contains key-value pairs of configuration settings specific to the application or the environment in which it is deployed. These settings can include sensitive information like API keys, database connection strings, or other configuration details that should not be hard-coded into the application's source code. The .env file is usually not committed to version control and is loaded by the application at runtime using a dotenv library or similar mechanisms.

- **readme.md** file:
The **readme.md** file is a Markdown file used to provide documentation and instructions for the project.
It serves as a high-level overview of the application, including its purpose, features, usage guidelines, and other relevant information.
The **readme.md** file serves as a guide for developers who want to understand and use the project.

- **documentation.md** file:
The **documentation.md** file is a Markdown file used to provide detailed developer documentation and instructions for the project.
It serves as a technical description of the application, including its structure, functions, usage guidelines, and other relevant information.
The **documentation.md** file serves as a guide for developers who want to understand, use, or modify the project.

- **package.json** file:
The **package.json** file is a crucial file in a Node.js project as it defines the project's metadata and dependencies.
It includes information such as a list of required Node.js packages (dependencies) for the application to function correctly.
Additionally, the package.json file can include scripts for running various tasks, such as building the application, running tests, or starting the server.
It is used by package managers like npm or Yarn to install dependencies and manage project-related commands and scripts.

These files play important roles in organizing, configuring, documenting, and managing the Node.js application and its associated resources.

### The "package.json" file

The provided code snippet is a **package.json** file, which is used in Node.js projects to manage dependencies, specify scripts, and define various project metadata.
Let's go through each section to understand its purpose:

```typescript
{
  "name": "embed-cnc",
  "private": true,
  "version": "0.0.0",
  "main": "lib/server.ts",
  "engines": {
    "node": "16.x"
  },
  "scripts": {
    "test": "echo 17dfg ",
    "watch-server": "nodemon --watch 'src/**/*' -e ts,tsx --exec refresh",
    "build": "tsc",
    "start2": "npm run build && node build/server.js",
    "start": "ts-node lib/server.ts"
  },
  "dependencies": {
    // Dependency packages required for production
  },
  "devDependencies": {
    // Dependency packages required for development
  }
}
```

- **"name": "embed-cnc"**: Specifies the name of the project. In this case, it is "embed-cnc."

- **"private": true**: This indicates that the package should be treated as private, preventing accidental publication to public package registries.

- **"version": "0.0.0"**: Specifies the initial version of the project. In this case, it is set to "0.0.0."

- **"main": "lib/server.ts"**: Specifies the entry point of the application. In this case, it is the **lib/server.ts** file.

- **"engines": { "node": "16.x" }**: Defines the Node.js version that the project requires, specifying a range that includes version 16.x.

- **"scripts"**: This section defines custom scripts that can be executed using the `npm run` command. Let's look at the defined scripts:

  - **"test"**: Executes the command `echo 17dfg`. It can be used for running tests.
  - **"watch-server"**: Uses `nodemon` to watch for changes in the **src** directory with `.ts` and `.tsx` file extensions. It triggers the `refresh` command upon changes.
  - **"build"**: Runs the TypeScript compiler (`tsc`) to build the project.
  - **"start2"**: Executes the build script first and then runs the compiled build/server.js file with Node.js.
  - **"start"**: Uses `ts-node` to directly run the **lib/server.ts** file without compilation. Useful for development.

- **"dependencies"**: Lists the packages required for the project in production. These packages are necessary for the application to run correctly in a production environment.

- **"devDependencies"**: Lists the packages required for development purposes. These packages are not required for the application to run in production, but they are necessary for development-related tasks like testing, linting, and building.

The dependencies and devDependencies sections contain various packages along with their corresponding versions. These packages are retrieved from the npm registry and are installed when running `npm install` or `npm ci` based on the information provided in the `package.json` file.

## "public" directory

Here's a breakdown of the roles that each of the files in the "public" directory:

- **cnc.css**:
The **cnc.css** file is a CSS (Cascading Style Sheets) file that contains styles and formatting rules for the HTML elements in your application's user interface.
CSS files are used to define the visual presentation of the HTML content.
The **cnc.css** file might include selectors, declarations, and styles that determine the colors, typography, layout, and other visual aspects of the application.
It is typically linked to the corresponding HTML files to apply the defined styles.

- **index.html**:
The **index.html** file is the main HTML file of the web application and acts as the entry point for the application's user interface.
It represents the initial page that is loaded when a user visits the application's URL.
The **index.html** file includes the structure of the page, such as the HTML elements, tags, and their hierarchy.
It can contain links to CSS files like **cnc.css** for styling, as well as references to JavaScript files for adding interactivity and dynamic functionality to the page.

- **legaltext.txt**
The **legaltext.txt** file is the legal text displayed to new users opening the Chat and Collaboration (CnC)

- **en.json**
The **en.json** file defines the wording used accross the CnC UI

These files work together to define the structure, styling, and initial content of the user interface in a web application.
The **index.html** file serves as the starting point, while the **cnc.css** file provides the styles to be applied to the HTML elements within the page.

### The index.html page

The **index.html** file is the main HTML page of the Example Server & Client application.
It serves as the client-side webpage that interacts with the server and loads the CNC app.

Here is a breakdown of the different sections and elements within the index.html file:

- **Document Type Declaration**: The \<!DOCTYPE html\> declaration specifies the document type and version.

- **HTML Structure**: The HTML structure begins with the opening \<html\> tag.

- **Head Section**: The \<head\> section contains metadata and external resources used by the webpage.

- **Stylesheet**: The \<link\> tag includes a CSS file named cnc.css using the href attribute. This file contains styles specific to the CNC app.

- **Inline Styles** (Commented): There is a commented-out \<style\> block that includes some custom CSS styles for the CNC app.

- **Body Section**: The \<body\> section contains the JavaScript code responsible for loading and initializing the CNC app and the Kaltura player.

- **JavaScript Code:** The \<script\> tag includes the JavaScript code responsible for loading and initializing the CNC app and the Kaltura player. The code is wrapped in the defer attribute, which ensures that the script is executed after the document has finished parsing.

  - `initData()` Function: This function is responsible for retrieving data from the server and initializing the CNC app and the Kaltura player. It makes an asynchronous request to the server to fetch the necessary data.

  - `loadLibs()` Function: This function dynamically loads the required JavaScript libraries for the CNC app and the Kaltura player. It creates \<script\> elements and appends them to the \<head\> section of the document. Once the libraries are loaded, the respective loadCnc() and loadPlayer() functions are called.

  - `loadCnc()` Function: This function initializes and renders the CNC app using the provided configuration (floaterConfig object). It sets up various options such as consent, server details, theme, UI settings, help link, and reactions.

  - `loadPlayer()` Function: This function initializes the Kaltura player and loads the specified media. It creates an instance of the KalturaPlayer class, passing the target element ID and the necessary configuration options.

  - `loadKME()` Function: this function prepares a form with hidden input fields containing data for launching the KME (Kaltura Media Engine) room. It appends the form to the HTML document and submits it to the KME endpoint for launching the room.

  - `loadContent()` Function: this function is responsible for determining the type of media to be displayed (KME or Live) based on the configuration data. If the media type is KME, it calls the `loadKME()` function, and if it is Live, it calls the `loadPlayer() `function.

- **Player Div**: This \<div\> element with the ID player is the container where the Kaltura player will be rendered. It has a fixed width and height and includes an \<h2\> element with the ID name that will be used to display the user's name.

- **KME Div**: This \<div\> element with the ID KME is the container where the Kaltura KME room will be rendered. It has a fixed width and height and includes an \<h2\> element with the ID name that will be used to display the user's room name.

The **index.html** file is responsible for setting up the client-side environment, loading necessary libraries, and rendering the Kaltura player and CNC app within the web page.

## "Lib" directory

Here's a breakdown of the roles that each of the files in the "lib" directory:

- **config.ts**:
The **config.ts** file contains configuration settings and constants used throughout the application.
It includes information such as API URLs, environment variables, or any other configuration parameters specific to the application.

- **getJwt.ts**:
The **getJwt.ts** file is responsible for handling the generation or validation of JSON Web Tokens (JWTs).
JWTs are commonly used for authentication and authorization purposes in web applications.
This file defines functions or classes related to JWT generation, verification, decoding, or handling specific JWT-related operations.

- **getUserData.ts**:
The **getUserData.ts** file contains code that interacts with a Kaltura CnC data source via an API, to fetch user-related information.
It includes functions or classes responsible for querying a user's data, performing CRUD (Create, Read, Update, Delete) operations on user records, or handling user-related logic.

- **routs.ts**:
The **routs.ts** file defines the application's routes or endpoints.
It typically contains the logic for handling incoming HTTP requests and mapping them to specific actions or functions within the application.
This file use a router framework to define the routes, specify the HTTP methods they handle, and link them to corresponding controller functions or request handlers.

- **server.ts**:
The **server.ts** file is responsible for starting and configuring the Node.js server.
It defines the server's entry point and includes code related to initializing server dependencies, setting up middleware, and listening for incoming requests.
It also defines the server's behavior when handling various HTTP methods and routes.

- **tsconfig.json**:
The **tsconfig.json** file is a TypeScript configuration file.
It specifies the TypeScript compiler options and settings for the project.
It includes information such as the source file locations, output directories, and various compiler options.

It's important to note that the specific roles and responsibilities of these files can vary based on the project's structure and requirements.
The file names and their functions can be customized according to the developer's preferences and project needs.

### The server.ts file

The **server.ts** file represents a basic server implementation using the Koa framework.
Let's go through the code step by step:

```typescript
import Koa from "koa";
import router from "./routs";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import serve from "koa-static";
```

The code begins by importing the required dependencies using the import syntax. It imports the following modules:
- `Koa` from the "koa" package: The main Koa framework module that provides the server functionality.
- `router` from the "./routs" file: A custom router module responsible for handling the application's routes.
- `bodyParser` from the "koa-bodyparser" package: A middleware for parsing request bodies.
- `logger` from the "koa-logger" package: A middleware for logging HTTP requests.
- `serve` from the "koa-static" package: A middleware for serving static files.

```typescript
const koaApp = new Koa();
const assets = serve("./public");
```

- The code creates a new instance of the Koa application by invoking the Koa class constructor and assigns it to the `koaApp` constant. This instance represents the main server application.
- The `assets` constant is assigned the result of calling the serve function from the "koa-static" package with the "./public" directory as its argument. This sets up the static file serving middleware for the "public" directory.

```typescript
koaApp.use(logger());
koaApp.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error(`API error for ${ctx.request.path}:`, error);
    ctx.body = error;
  }
});
```

- The code utilizes the Koa middleware by calling the use method on the koaApp instance.
  - The variable "ctx" is commonly used as an abbreviation for "context" and is often used in web development frameworks like Koa.js or Express.js. It represents the context object that holds information about the current HTTP request and response. In the context object (ctx), you can find properties and methods that provide access to various aspects of the request and response, such as request headers, URL parameters, query parameters, request body, response status, response headers, and more.
  - `logger()` adds the logging middleware to the application. It logs information about each HTTP request.
  - The second middleware is an error handling middleware. It wraps the subsequent middleware and catches any errors that occur during request processing. If an error occurs, it logs the error message along with the path of the request and sets the response body to the error object.

```typescript
koaApp.use(bodyParser());
koaApp.use(assets);
koaApp.use(router.routes());
koaApp.use(router.allowedMethods());
```

The code continues to add more middleware to the application:
- `bodyParser()` adds the body parsing middleware, allowing the server to parse JSON, form data, and other types of request bodies.
- `assets` middleware is used to serve static files from the "./public" directory.
- `router.routes()` adds the routes defined in the imported router module to the application.
- `router.allowedMethods()` adds middleware that automatically handles OPTIONS requests and responds with the allowed methods when necessary.

```typescript
koaApp.listen(3000);
```

Finally, the code calls the `listen` method on the `koaApp` instance, instructing the server to start listening for incoming requests on port 3000.
This code sets up a basic Koa server with middleware for logging, error handling, request parsing, serving static files, and routing. It listens on port 3000 for incoming HTTP requests.

Please note that this is a simplified explanation of the provided code, and further details about the routes and their implementation within the "./routs" file are necessary for a complete understanding of the server's functionality.

### The routs.ts file

The provided code is a Node.js file named **rout.ts** that exports a router object using the Koa Router module.
Let's break down the code:

```typescript
import Router from "@koa/router";
import { getUserData } from "./getUserData";
import config from "./config";
import { getJwt } from "./getJwt";
```

- The code begins by importing dependencies using the `import` syntax. It imports the following modules:
  - `Router` from the "@koa/router" package: The Koa Router module used to define and handle routes.
  - `getUserData` from the "./getUserData" file: A custom function for retrieving user data.
  - `config` from the "./config" file: A module for retrieving configuration values.
  - `getJwt` from the "./getJwt" file: A function for generating a JSON Web Token (JWT).

```typescript
const router = new Router({ prefix: "/embed-cnc" });
const { id: partnerId } = config.get("partner");
const uiconfid = config.get("uiConfid");
const reactionUiConfid = config.get("reactionUiConfid");
const entryid = config.get("entryId");
const legalTextEntryId = config.get("legalTextEntryId");
const translationsEntryId = config.get("translationsEntryId");
const cncPlayerID = config.get("cncPlayerID");
```

- The code creates a new instance of the Koa Router by invoking the `Router` class constructor and assigns it to the `router` constant. The `prefix` option is set to "/embed-cnc" so that all defined routes will have this prefix.

- The following constants are defined using values retrieved from the `config` module:

  - `partnerId`: Retrieves the "id" value from the "partner" configuration.
  - `uiconfid`: Retrieves the "uiConfid" value from the configuration.
  - `reactionUiConfid`: Retrieves the "reactionUiConfid" value from the configuration.
  - `entryid`: Retrieves the "entryId" value from the configuration.
  - `legalTextEntryId`: Retrieves the "legalTextEntryId" value from the configuration.
  - `translationsEntryId`: Retrieves the "translationsEntryId" value from the configuration.
  - `cncPlayerID`: Retrieves the "cncPlayerID" value from the configuration.

```typescript
router.get("/init", async (ctx: any) => {
  const ksPromise = getUserData(ctx.request.query.user); //gets [uid,ks,ismoderator]
  const jwtPromise = getJwt(await ksPromise); //gets jwt for cnc
  const [ks_id, jwt] = await Promise.all([ksPromise, jwtPromise]);

  ctx.body = { ks_id, jwt, partnerId, uiconfid, entryid, reactionUiConfid, legalTextEntryId, translationsEntryId };
});
```

- The code defines a GET route with the path "/init" on the router object. When a request is made to this route, an async function is executed with ctx (the Koa context object) as its argument.
  - The function invokes the `getUserData` function from the "./getUserData" file, passing `ctx.request.query.user` as the argument. It returns a Promise that resolves to an array containing [uid, ks, ismoderator].
  - The `getJwt` function from the "./getJwt" file is then called with the result of getUserData as its argument. It generates a JWT for the "CnC" (Chat and Collaboration) system.
  - The `Promise.all` method is used to await both the `ksPromise` and `jwtPromise`, and their results are destructured into `[ks_id, jwt]`.

- The response body of the route is set to an object containing `ks_id`, `jwt`, `partnerId`, `uiconfid`, `entryid`, `reactionUiConfid`, `legalTextEntryId`, and `translationsEntryId`.

```typescript
router.get("/get-lib-data", async (ctx: any) => {
  ctx.body = { partnerId, uiconfid, cncPlayerID }; // needed for Player and Cnc Libraries
});
```

- The code defines another GET route with the path "/get-lib-data" on the `router` object. When a request is made to this route, an async function is executed with `ctx` as its argument.
  - The response body of the route is set to an object containing `partnerId`, `uiconfid`, and `cncPlayerID`. These values are necessary for the Player and Cnc Libraries.

```typescript
export default router;
```

- Finally, the `router` object is exported as the default export of the module.

The `rout.ts` file sets up two routes ("/init" and "/get-lib-data") using the Koa Router module. The first route retrieves user data, generates a JWT, and returns various configuration values along with the user data. The second route provides specific configuration values needed for the Player and Cnc Libraries.

### The getUserData.ts file

The `getUserData.ts` file contains functions related to retrieving user data from Kaltura.
Let's go through each function and provide a brief description:

```typescript
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import kaltura from "kaltura-client";
import config from "./config";
import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import fs from "fs";
```

The code imports various dependencies:
- `kaltura` from the "kaltura-client" package, which is used for interacting with the Kaltura API.
- `config` from the "./config" file, which provides configuration values for the server.
- `axios` and `AxiosResponse` from the "axios" package, which are used for making HTTP requests.
- `FormData` from the "form-data" package, which is used for constructing form data.
- `fs` from the Node.js core module, which is used for file system operations.

```typescript
const serviceUrl = config.get("kalturaUrl");
const eventDomain = config.get("event_domain");
const regWebhookKey = config.get("reg_webhook_key");

const { id: partnerId, adminSecret, adminUserId } = config.get("partner");
const clientConfig = new kaltura.Configuration({ serviceUrl });
const client = new kaltura.Client(clientConfig);
const type = kaltura.enums.SessionType.USER;
const expiry = 86400 as const;
const privileges = "disableentitlement" as const;
```

- The code retrieves various configuration values using the `config.get` function from the "./config" file.
- It assigns these values to corresponding variables for later use.
- It creates a `clientConfig` object with the `serviceUrl` configuration value.
- It creates a `client` object using the `kaltura.Client` constructor with the `clientConfig` object.
- It sets some constants related to the Kaltura session type, expiry, and privileges.


```typescript
export async function getUserData(
  user: string
): Promise<[string, string, boolean]> {
  // ...
}
```

- The code exports an async function named `getUserData` that takes a `user` parameter of type string and returns a promise that resolves to an array containing the user's UID, session response, and a boolean value indicating whether they are a moderator.

```typescript
async function checkIfUserExists(uid: string): Promise<string> {
  // ...
}

async function createUserThruWebhook(uid: string): Promise<string> {
  // ...
}

async function getIDFromKS(join_url: any): Promise<any> {
  // ...
}

async function getSessionClient(): Promise<any> {
  // ...
}

async function checkIfModertor(uid: string, entry: any) {
  // ...
}
```

- The code defines several internal functions used by `getUserData`:
  - `checkIfUserExists`: Checks if a user with the provided email address already exists in Kaltura.
  - `createUserThruWebhook`: Creates a new Kaltura user by sending a registration webhook to a third-party system.
  - `getIDFromKS`: Given a Kaltura session join URL, parses the Kaltura session ID (ks) and uses it to retrieve the user ID.
  - `getSessionClient`: Helper function to start a Kaltura session client.
  - `checkIfModertor`: Checks if the user with the given uid is a moderator for the given entry.

The functions in `getUserData.ts` work together to retrieve user data from Kaltura, handle user creation through webhooks, manage sessions, and perform various checks.

### The config.ts file

The `config.ts` file contains the configuration settings for the application.
Here's an overview of the configuration properties defined in the file:

```typescript
import * as dotenv from "dotenv";
dotenv.config();
import convict from "convict";
```

- The code imports the `dotenv` package to load environment variables from a `.env` file.
- It also imports the `convict` package, which is used for handling configuration values.

```typescript
const config = convict({
  kalturaUrl: {
    doc: "Kaltura URl",
    format: String,
    default: "https://www.kaltura.com",
  },
  // ...
});
```

- The code creates a new `config` object using `convict()`.
- The `config` object is used to define the configuration properties and their details.

The configuration properties defined in the config object are described in the README.

```typescript
config.validate({ allowed: "strict" });
export default config;
```

- The code validates the configuration values based on the defined schema using `config.validate()`.
- The configuration object is exported as the default export of the module.

Overall, this file defines the configuration settings used by the application, allowing flexibility by using environment variables and providing default values for each property.

### The getJwt.ts file

The `getJwt.ts` file contains functions related to retrieving and signing JSON Web Tokens (JWT) using the Kaltura API and configuration settings.
Here's an overview of the file:

```typescript
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import kaltura from "kaltura-client";
import config from "./config";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import jsonwebtoken from "jsonwebtoken";
```

- The code imports the necessary dependencies, including the `kaltura-client` package for interacting with the Kaltura API and the `jsonwebtoken` package for JWT handling.
- The `config` object is imported from the `config.ts` file, which provides the necessary configuration settings.

```typescript
const ent = config.get("entryId");
const serviceUrl = config.get("kalturaUrl");
const { id: partnerId, adminSecret, adminUserId }: any = config.get("partner");
const eventId: any = config.get("eventId");
const clientConfig = new kaltura.Configuration({ serviceUrl });
const CnCExpirationMinutes = 24 * 60;
```

- The code retrieves specific configuration values from the `config` object and assigns them to variables for later use.
- `ent` represents the entry ID.
- `serviceUrl` represents the URL of the Kaltura service.
- `partnerId`, `adminSecret`, and `adminUserId` represent the partner-related configuration properties.
- `eventId` represents the event ID.
- `clientConfig` is a configuration object for the Kaltura client.
- `CnCExpirationMinutes` represents the expiration time for the JWT.

```typescript
export async function getJwt(input: [string, string, any]): Promise<string> {
  const token = await getAppToken();
  return signJwt(token, input);
}
```

- This is the main exported function. It receives an input array containing the partner ID, user ID, and user dependencies. It returns a Promise that resolves to a JWT.
- The function first retrieves an app token using the `getAppToken()` function, and then signs a JWT using the `signJwt()` function.

```typescript
function signJwt(secret: string, uidep: string[]): string {
  // ...
}
```

- This function generates a JSON Web Token (JWT) with the provided secret and user information.
- It constructs an object representing the user with properties such as partnerId, uid, contextId, groups, exp (expiration time), isAdmin, isScopedUser, and virtualEventId.
- The JWT is signed using the `jsonwebtoken` package and returned as a string.

```typescript
async function getAppToken(): Promise<string> {
  // ...
}
```

- This function retrieves an active app token from Kaltura with specific session privileges.
- It uses the Kaltura client and `kaltura.services.appToken.listAction()` to list the app tokens.
- The app token with the sessionPrivileges set to "cncAuth:true" is returned as the app token to be used for signing the JWT.

```typescript
async function getSessionClient(): Promise<any> {
  // ...
}
```

- This function retrieves a session client to be used for making requests to the Kaltura API.
- It starts a session using the adminSecret, adminUserId, and partnerId provided in the configuration.
- The client is configured with the obtained session token (ks) and returned.
Overall, this file provides the necessary functions to retrieve an app token from Kaltura, generate a JWT using the app token and user information, and retrieve a session client for making API requests.

# Handling of http requests and responses

The code of this application uses both Koa and Axios.
Koa is a lightweight web framework for Node.js that provides middleware functionality and simplifies the process of building web applications.
Axios, on the other hand, is a popular HTTP client library that simplifies making HTTP requests from Node.js.

In the code provided, Koa is used to set up the server and define routes and middleware functions to handle incoming requests.
It primarily focuses on handling the server-side logic, routing, and request/response handling.

Axios, on the other hand, is used within the server code to make HTTP requests to external APIs or services.
It allows the server to communicate with other endpoints, retrieve data, and perform various actions over the network.

## Making http requests to the Kaltura API

The codebase of the application primarily utilizes the [Kaltura node.js API client library](https://www.npmjs.com/package/kaltura-client) for interacting with the Kaltura platform.

![Node](https://img.shields.io/badge/Node-18-green)

The following functions and calls are leveraging the Kaltura library:

- `getJwt` function in `getJwt.ts`: This function generates a JWT (JSON Web Token) using the Kaltura library's `KalturaClient` and `session.start` method.

- `getUserData` function in `getUserData.ts`: This function uses the Kaltura library's `KalturaClient` and `user.get` method to retrieve user data from the Kaltura platform.

- `getAppToken` function in `getJwt.ts`: This function uses the Kaltura library's `KalturaClient` and establish a session with the Kaltura API and obtain a client object that can be used to make subsequent API calls.

- `init` function in `routs.ts`: This route handler uses the Kaltura library's `getJwt` and `getUserData` functions to generate a JWT and retrieve user data from the Kaltura platform.

- `getLibDataHandler` function in `routs.ts`: This route handler uses the Kaltura library's `getLibData` function to fetch library data from the Kaltura platform.

The Kaltura library is primarily used for authentication, retrieving user data, and fetching library-related information from the Kaltura platform.

### Webhook registrations

One use-case where Axios is used, instead of the Kaltura library, is for webhook registration.
The axios library is specifically imported and utilized in the `registerWebhook` function defined in the `getUserData.ts` file.

# Additional information on creating the JWT

The `getJwt` function in the provided code generates a JWT with the required properties and signs it using the provided admin secret.

Here's how the `getJwt` function in the code generates the token:

- The partner ID is used to set the `kid` (Key ID) header in the JWT. It is done using the `setHeader` method of the `KalturaClient` instance: `client.setHeader('kid', partnerId.toString())`.

- The payload of the JWT is constructed with the necessary properties:

  - `exp` is set to the expiration time in Epoch time.
  - `uid` is set to the user ID.
  - `partnerId` is set to the partner ID.
  - `isAdmin` is set to `false` to indicate that the user is not an admin as it is not necessary to access the CnC admin app. 
  
- The JWT is signed with the admin secret using the `sign` method of the `jsonwebtoken` library: `jsonwebtoken.sign(payload, adminSecret)`.

The resulting signed JWT is then returned by the `getJwt` function.
