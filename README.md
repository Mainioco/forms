# Mainio Forms

This project's aim is to have easily integratable Angular 6 Dynamic forms to any web application. The project's not recommended for production at this stage. The project utilizes Angular Material at this stage.

## Build status

![Build status](https://mainiocoproduction.visualstudio.com/_apis/public/build/definitions/8f3b2aa3-39a3-4734-88b5-e20e775f0672/4/badge)

## Install

Using NPM run `npm i mainio-forms`
Using Yarn run `yarn add mainio-forms`

## Features

The project's split to two parts; one for dynamic form components (such as input field), and the other functionalities.

### Functionalities

| Feature                                        | Implemented | Documented | Has Tests | Notes                                      |
| ---------------------------------------------- | ----------- | ---------- | --------- | ------------------------------------------ |
| Display logic                                  | X           |            |
| Split one form to several display components   | X           |            |           | Basic support only. Service under progress |
| Service to combine splitted forms to one value |             |            |
| Basic validators                               | X           |            |           | Min, max length of input field             |
| Advanced validators                            |             |            |           | Support for Regex for example              |
| Clean styles                                   |             |            |           | No Angular material dependencies           |
| NgRx Store                                     |             |            |           |                                            |

### Form components

| Form component     | Implemented | Documented | Has Tests |
| ------------------ | ----------- | ---------- | --------- |
| Input field        | X           |            |           |
| Number field       | X           |            |           |
| Dropdown menu      | X           |            |
| Auto Complete      | X           |            |
| Open Text          |             |            |
| Range choice       | X           |            |
| Radio button group |             |            |
| Date intpu         | X           |            |

## How to run on local machine

This project's initalized using [Angular Cli](https://cli.angular.io/). Running ng serve on the root folder will launch the demo.

## How to build on local machine

Run `ng build mainio-forms` to build the NPM package locally. To include the npm package to your own local project's include `"@mainio/*": [ "PATH/*" ]` to tsconfig.json. Change PATH to dist folder of the repository

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
