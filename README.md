# CryptoDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

## 🧑‍💻 Core Features

- [x] ~~Display a **table or cards** showing:~~

  - [x] ~~Coin Name~~
  - [x] ~~Price~~
  - [x] ~~24h Price Change~~
  - [x] ~~Coin Symbol~~

- [x] ~~Implement **auto-refresh** every 10 seconds~~.

- [x] ~~Add a **sorting feature** for:~~

  - [x] ~~Price~~
  - [x] ~~Name~~
  - [x] ~~24h Change~~

- [x] ~~_(Optional)_ Display a **chart (sparkline)** for each coin.~~

## 💡 Bonus Features

### Error and Connection Handling

- [x] ~~Show an **offline notice** when network connection is interrupted.~~
- [x] ~~Handle **API errors gracefully** and notify the user.~~

### UI and UX

- [x] ~~Create a **responsive layout**.~~
- [x] ~~Add a **visual indicator** for auto-refresh (page stays interactive).~~

### URL State Sharing

- [x] ~~Persist **sort state in the URL**:~~

  - [x] ~~Survives page refresh.~~
  - [x] ~~Can be shared via URL.~~

- [x] ~~Implement a **coin detail view**:~~
  - [x] ~~Navigable via URL.~~
  - [x] ~~URL reflects selected coin.~~

### Deployment

- [x] ~~Deploy the app so it's **accessible via the web** (not just on localhost).~~

## 🔐 Authentication (Bonus)

- [x] ~~Implement **authentication** with a web-friendly method:~~

  - [x] ~~Login screen.~~
  - [x] ~~Protect content from unauthorized access.~~
  - [x] ~~No user database required.~~
  - [x] ~~Allow a single valid user or simple login logic.~~

- [x] ~~Store **login session**:~~
  - [x] ~~Persist across visits.~~
  - [x] ~~Allow expiration without auto-renewal.~~

# Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
