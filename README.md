Frontend demonstration project for GoBe Robotics (Blue Ocean Robotics)

## Viewing the client

-Open _config_manager_client/build/singlepage.html_ in any browser

or

-Execute commands "_npm install_" and "_npm run dev_" from _config_manager_client/_ and visit the localhost address specified in your terminal

## (Re) building the singlepage application

Run command "_npm run build_" from _config_manager_client/_  
This will save both a plaintext singlepage .html file and a gzipped version (suitable for hosting to remote clients) of the plaintext to directory _config_manager_client/build/_

## Running Unit tests

Run command "_npm run test_" from \_config_manager_client/

## Tools used

#### Node.js

For running javascript locally and managing dependancies

#### React

As frontend framework

#### Typescript

For typechecking javascript code

#### Vite

As bundling tool, live reloading dev server and for css module support

#### ESLint

Code linting to enforce good writing practices

#### Prettier

To format code in a standardized way

#### HTML-minifier & zlib

As export tools to create a portable singlepage application file

#### Jest & react-testing-library

For unit tests
