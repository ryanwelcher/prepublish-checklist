# Section 1 - Registering our plugin

We're going to be leveraging the SlotFill fill system and the `@wordpress/plugins` api to introduce our code the Block Editor.

1. Start the build process in watch mode by running `npm start` from the root of the plugin. This process should be running at all times
2. Create a new post in your local development environment and open the development tools to the console.
3. Open `./src/plugin/index.js`.
4. Import `registerPlugin` from the `@wordpress/plugins` package
```javascript
import { registerPlugin } from '@wordpress/plugins';
```
5. Register a plugin called `wceu-2022-prepublish-checklist` with the following settings. Feel free to customize the name or icon if you desire!
```javascript
registerPlugin( 'wceu-2022-prepublish-checklist', {
	icon: 'forms',
	render: Render,
} );
```
6. Import the `useEffect` hook from `@wordpress/element`
```javascript
import { useEffect } from '@wordpress/element';
```

7. create a useEffect hook in the `Render` component that outputs a message.
```javascript
const Render = () => {
	useEffect( () => {
		console.log( 'Welcome to WCEU 2022!' );
	} );
	return null;
};
```
8. Reload the page and we should see our message in the controls. Our code is now running in the Block Editor! 🥳 🥳 🥳 🥳 🥳. Let's move on!

# Ready to move on?
[Section 2: Getting information out of the datastore](./section-2.md)
