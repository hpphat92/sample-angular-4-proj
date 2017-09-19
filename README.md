## List of features
* Angular 2+
* Angular CLI
* Bootstrap 4 CSS
* SASS

## Installation
Prerequisites
* Installed Node.js:&nbsp;&nbsp;&nbsp;&nbsp; https://nodejs.org
* Installed Angular CLI:&nbsp;&nbsp;&nbsp;&nbsp; https://cli.angular.io

Run `npm install` to install dependency packages.<br>
If has error:<br>
* Open file `package.json`
* Under `dependencies`, remove these two values: <br>
  "amcharts3": "github:amcharts/amcharts3",<br>
  "ammap3": "github:amcharts/ammap3",
* Run `npm install`. It will work just fine and create a directory by the name of `node_modules`<br>
  Inside `node_modules` directory, clone the following repositories:<br>
  git clone https://github.com/amcharts/ammap3.git<br>
  git clone https://github.com/amcharts/amcharts3.git<br>


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--env=prod` flag for a production build.


## Directory Structure
The directory structure of this project is as follows:

```
root/
   ├──e2e/
   │   ├──tsconfig.e2e.json             * typescript config that protractor use for e2e tests
   │
   ├──src/                              * source files that will be compiled to javascript
   │   │
   │   ├──app/                          * application code - our working directory
   │   │   ├──app.component.ts          * main application component
   │   │   │
   │   │   ├──app.constant.ts           * application constant, config api domain
   │   │   │
   │   │   ├──app.module.ts             * main application module
   │   │   │
   │   │   ├──app.routing.ts            * application routes
   │   │   │ 
   │   │   ├──app.translation.module.ts * main translation module
   │   │   │  
   │   │   ├──global.state.ts           * global application state for data exchange between components
   │   │   │
   │   │   ├──app.component.scss        * application styles
   │   │   │
   │   │   ├──pages/                    * application pages components, place where you can create pages and fill them with components
   │   │   │   ├──pages.menu.ts         * menu pages routes
   │   │   │
   │   │   ├──shared/                   * shared modules/components/services and pipes
   │   │   │
   │   │   └──theme/                    * template global components/directives/pipes and styles
   │   │
   │   │
   │   ├──assets/                       * static assets are served here
   │   │   │
   │   │   ├──fonts/                    * fonts
   │   │   │
   │   │   ├──i18n/                     * language translate
   │   │   │   └──US/
   │   │   │      └──en.json            * menu name/error messages and popup title
   │   │   │
   │   │   ├──img/                      * logo and default images
   │   │   │
   │   │   └──tinymce/                  * editor skin/plugin
   │   │
   │   │
   │   ├──environments/                 * environment provider
   │   │   │
   │   │   ├──environment.prod.ts       * product environment
   │   │   │
   │   │   └──environment.ts            * dev environment
   │   │
   │   │
   │   ├──index.html                    * application layout and config Azure Application Insights tracking
   │   │
   │   ├──main.ts                       * entry file for our browser environment
   │   │
   │   ├──polyfills.ts                  * polyfills file
   │   │
   │   └──typings.d.ts                  * custom typings for third-party modules
   │
   │
   ├──.angular-cli.json                 * Angular CLI config
   │
   ├──Dockerfile                        * Docker config
   │
   ├──karma.conf.js                     * config that karma use for unit tests
   │
   ├──protractor.conf.js                * config that protractor use for e2e tests
   │
   ├──.angular-cli.json                 * Angular CLI config
   │
   ├──.stylelintrc.json                 * SASS/CSS lint config
   │
   ├──tslint.json                       * typescript lint config
   │
   ├──typedoc.json                      * typescript documentation generator
   │
   ├──tsconfig.json                     * config that webpack uses for typescript
   │
   └──package.json                      * what npm uses to manage it's dependencies
```
### Remark
* Config api domain in `src/app/app.constant.ts`

* Change menu name, error message, modal title in `src/assets/i18n/US/en.json`

* Config Azure Application Insights tracking in `src/index.html`