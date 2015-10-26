# Aurelia AEB example based on the navigation example
## Functionality

This example application shows how to communicate with the aeb api and CRUD cities, the original code of the skeleton example was left in the example to give a more complete image of the possibilities of aurelia.

[Original](https://github.com/aurelia/skeleton-navigation)

## Basic app flow

Every action has a route associated with it, this means there is a router that knows what to do with #/cities.
This route knows which module to load, and assumes there is an html file with the same name, so cities.js assumes
there is a cities.html in the same folder. 

After matching the route, the module gets instantiated, then the view gets rendered. If a module defines a this.name, this can be rendered in the view using ${name}. Whenever this.name changes, the view will also update.

To make those values editable, you can use a form, in that case you can bind this.name in an input element like so:
  ```
  <input class="form-control" type="text" value.bind="name">
  ```

This will update this.name when the text is changed, and vice versa.

## Running The App

To run the app, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g jspm
  ```
  > **Note:** jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing `jspm registry config github` and following the prompts. If you choose to authorize jspm by an access token instead of giving your password (see GitHub `Settings > Personal Access Tokens`), `public_repo` access for the token is required.
5. Install the client-side dependencies with jspm:

  ```shell
  jspm install -y
  ```
  >**Note:** Windows users, if you experience an error of "unknown command unzip" you can solve this problem by doing `npm install -g unzip` and then re-running `jspm install`.
6. To run the app, execute the following command:

  ```shell
  gulp watch
  ```
7. Browse to [http://localhost:9000](http://localhost:9000) to see the app. You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.

> The Skeleton App uses [BrowserSync](http://www.browsersync.io/) for automated page refreshes on code/markup changes concurrently accross multiple browsers. If you prefer to disable the mirroring feature set the [ghostMode option](http://www.browsersync.io/docs/options/#option-ghostMode) to false

> Note: At present there is a bug in the HTMLImports polyfill which only occurs on IE. We have submitted a pull request to the team with the fix. In the mean time, if you want to test on IE, you can work around the issue by explicitly adding a script tag before you load system.js. The script tag should look something like this (be sure to confirm the version number):

```html
<script src="jspm_packages/github/webcomponents/webcomponentsjs@0.5.2/HTMLImports.js"></script>
```

## Bundling
Bundling is performed by [Aurelia Bundler](http://github.com/aurelia/bundler). A gulp task is already configured for that. Use the following command to bundle the app:

  ```shell
    gulp bundle
  ```

You can also unbundle using the command bellow:

  ```shell
  gulp unbundle
  ```
