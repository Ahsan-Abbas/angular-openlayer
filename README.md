# Objective:
Create an Angular-based project that utilizes the provided .geojson files and displays them on a map using the OpenLayers JavaScript library. The application should provide the following functionality:

• Load .geojson data: Import the provided .geojson files into your project.

• Initialize the OpenLayers map: Create a map using the OpenLayers library, and display the .geojson data on the map.

• Zoom to a graveyard: Implement a dropdown menu that lists all the graveyards in the .geojson data. The graveyard field is named "friedhof" in the attributes of the provided file. When a user selects a graveyard from the dropdown menu, the map should zoom to the selected graveyard's extent.

• Style graves based on grabstatus: Create individual color styling for the graves based on the unique values of the "grabstatus" field. Make sure each unique value is represented by a different color.

# OpenlayersAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
