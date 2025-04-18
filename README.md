# CryptoDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

## 🧑‍💻 Core Features

- [x] Display a **table or cards** showing:

  - [x] Coin Name
  - [x] Price
  - [x] 24h Price Change
  - [x] Coin Symbol

- [x] ~~Implement **auto-refresh** every 10 seconds~~.

- [ ] Add a **sorting feature** for:

  - [ ] Price
  - [ ] Name
  - [ ] 24h Change

- [ ] _(Optional)_ Display a **chart (sparkline)** for each coin.

## 💡 Bonus Features

### Error and Connection Handling

- [ ] Show an **offline notice** when network connection is interrupted.
- [ ] Handle **API errors gracefully** and notify the user.

### UI and UX

- [ ] Create a **responsive layout**.
- [ ] Add a **visual indicator** for auto-refresh (page stays interactive).

### URL State Sharing

- [ ] Persist **sort state in the URL**:

  - [ ] Survives page refresh.
  - [ ] Can be shared via URL.

- [ ] Implement a **coin detail view**:
  - [ ] Navigable via URL.
  - [ ] URL reflects selected coin.

### Deployment

- [x] ~~Deploy the app so it's **accessible via the web** (not just on localhost).~~

## 🔐 Authentication (Bonus)

- [ ] Implement **authentication** with a web-friendly method:

  - [ ] Login screen.
  - [ ] Protect content from unauthorized access.
  - [ ] No user database required.
  - [ ] Allow a single valid user or simple login logic.

- [ ] Store **login session**:
  - [ ] Persist across visits.
  - [ ] Allow expiration without auto-renewal.

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
