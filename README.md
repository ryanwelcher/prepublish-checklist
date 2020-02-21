## Workshop Overview
Today, we are gong to be creating a plugin that will allow us to change the default publishing
workflow that come with WordPress.

We are going to define a list of criteria that need to be fulfilled before a post can be published.

## Requirements
So we can jump right in, please be sure you have the following at the start of the workshop

* Laptop ( Don't forget your charger! )
* A local WordPress development environment
* Node.js installed.

## Steps

### Set up.

1. Clone the repo into your plugins directory `git clone git@github.com:ryanwelcher/prepublish-checklist.git`.

### 01 - Setting up the build process.
1. Add the @wordpress/scripts package: `npm install @wordpress/scripts -save-dev`
2. Add a `/src` directory at the root of the plugin.
3. Add an `index.js` file into the new `./src` directory.
4. Add two scripts to your package.json file:
	* `"watch": "wp-scripts start"`
	* `"build": "wp-scripts build"`
5. Change the output directory to `./dist` by adding `--output-path=dist` to the scripts. ( Optional )

### 02 - Setting up our PHP enqueues
1. Add an action to the `enqueue_block_editor_assets` with a `enqueue_our_javascript` callback.
2. Inside the the callback, check for the `index.asset.php` file in our `/dist` directory
3. If found, enqueue our JavaScript using the `wp_enqueue_script` function using the dependency array and version data from the `index.asset.php` file.