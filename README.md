# AngularStarterKit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## NGXS Store Structure

This project follows a modular structure with a centralized store for shared state and feature-specific state managed within each feature directory.

```plaintext
src/app/
├── store/
│   ├── auth/
│   │   ├── auth.state.ts       # Authentication state
│   │   ├── auth.actions.ts     # Actions related to authentication
│   ├── app.state.ts            # General app-level state if needed
├── feature/
│   ├── feature.component.ts    # Feature component logic
│   ├── feature.component.html  # Feature component template
│   ├── feature.component.css   # Feature component styles
│   ├── feature.state.ts        # Feature-specific state
│   ├── feature.actions.ts      # Actions related to feature state
```


### Explanation

- **Store Directory**: Contains global/shared state files (`auth` module) and general app-level state.
- **Feature Directory**: Houses the component and its feature-specific state for self-contained management.

> Customize the structure as needed to fit your application's complexity and modularity requirements.
