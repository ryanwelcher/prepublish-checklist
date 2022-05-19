# Creating a Pre-publish Checklist in Gutenberg Workshop - WCEU 2022



## Pre-Workshop Setup Checklist

Before arriving on the day of the workshop, please ensure you have the following in place ( this is meant to help avoid wifi issues on the day):

1. Ensure you have Composer and Node version 16 installed on your laptop. I would strongly recommend using [Node Version Manager ( NVM )](https://github.com/nvm-sh/nvm) to manage your node versions. ( If Composer is an issue, it is technically optional. We will need Node however ).
2. A working local development environment running the latest version of WordPress. I will be using [LocalWP](https://localwp.com/) but you can use anything you're comfortable with.
3. The code from either this repo, or a fork of it, cloned into the `wp-content/plugins/` directory. ( i.e `git clone https://github.com/ryanwelcher/prepublish-checklist wp-content/plugins` from the root of your WordPress installation )
4. Run `npm install --force` and `composer install` to dowload all of the dependencies.


## Welcome!
I so happy to decided to join me today for this Workshop on creating a Pre-publish checklist in Gutenberg!

We only have a short time together today so I wil try to keep things moving as quickly as possible but please feel free to ask me any questions you may have along the way!

## What are we doing today?
**To save time and get right into coding, all of the setup for the plugin is in-place and ready to go. This means we won't be able cover topics related to the build process or using the `@wordpress/scripts` package beyond running some commands. If you're interested in this, please be sure to ask me after the workshop and I'll be happy to talk to you about it!**

Today, we'll be working to complete a partially built plugin that will restrict the ability to publish a post until a set of predefined publishing requirements are met.


To accomplish this goal, there are two sections of the plugin:

### Admin Screen
There is a custom settings screen called Pre-publish Checklist to allow defining the following criteria:

1. How many words are required?
2. Is a Featured image required?
3. Are categories required to be assigned?

This screen is pre-built ( the code is in the `./src/admin` directory ) and will not be part of the coding work done in the workshop.


### Plugin
This section contains all of the logic and SlotFills that make up the functionality of the pre-publish checklist and is where we will be spending our time today.

## Section 1 - Registering our plugin

### We're going to be leveraging the SlotFill fill system and the `@wordpress/plugins` api to introduce our code the Block Editor.

1. Start the build process in watch mode by running `npm start` from the root of the plugin. This process should be running at all times
2. Open `./src/plugin/index.js`.
3. Import `registerPlugin` from the `@wordpress/plugins` package
```javascript
import { registerPlugin } from '@wordpress/plugins';
```
4. Register a plugin called `wceu-2022-prepublish-checklist` with the following settings. Feel free to customize the name or icon if you desire!
```javascript
registerPlugin( 'wceu-2022-prepublish-checklist', {
	icon: 'forms',
	render: Render,
} );
```
5. import the `useEffect` hook from `@wordpress/element` and create a useEffect hook in the `Render`component that `console.log`s a message`
```javascript
const Render = () => {
	useEffect( () => {
		console.log( 'Hello!' );
	} );
	return null;
};
```

### Our code is now running in the Block Editor! 🥳 🥳 🥳 🥳 🥳. Let's move on!

## Section  2 - Getting information out of the datastore

Before we can determine if we want to stop the post from being published, we need to get some information the Block Editor. To do that, we need to use the `@wordpress/data` package and specifically the `useSelect` hook.

1. import the useSelect hook from the `@wordpress/data` package
```javascript
import { useSelect } from '@wordpress/data';
```
2. Access the `block-editor	` store to retrieve the list of block in currently in the block editor by calling the `getBlocks` selector.
```javascript
const blocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlocks() );
```
## Section  3 - Restricting publishing and showing the user

## Section  5 - Tying into our custom settings data.
