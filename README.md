Frontend demonstration project for GoBe Robotics (Blue Ocean Robotics)

## Viewing the client

-Open _config_manager_client/build/singlepage.html_ in any browser

or

-Execute commands "_npm install_" and "_npm run dev_" from _config_manager_client/_ and visit the localhost address specified in your terminal

or

-Execute commands "_npm install_" and "_npm run electron_" from _config_manager_client/_

or

-Execute commands "_npm install_" and "_npm run build_electron_" from _config_manager_client/_.  
Once finished, folder _config_manager_client/\_build/\_electron/_ will contain an executable for your OS

## (Re) building the singlepage application

### Webbrowser application

Run commands "_npm install_" and "_npm run build_" from _config_manager_client/_  
This will save both a plaintext singlepage .html file and a gzipped version (suitable for hosting to remote clients) of the plaintext to directory _config_manager_client/build/_

### Webbrowser application

Run commands "_npm install_" and "_npm run build_electron_" from _config_manager_client/_.
This will build an Electron.js based application for your OS.

## Tools used

#### Node.js

For running javascript locally and managing dependancies

#### React

As frontend framework

#### Typescript

For typechecking javascript code

#### Vite

As bundling tool, live reloading dev server and for css module support

#### Electron

For build applications capable of running directly on a host OS

#### ESLint

Code linting to enforce good writing practices

#### Prettier

To format code in a standardized way

#### HTML-minifier & zlib

As export tools to create a portable singlepage application file
