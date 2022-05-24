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

## **Section 1 - Registering our plugin**

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
6. import the `useEffect` hook from `@wordpress/element` and create a useEffect hook in the `Render` component that outputs a message.
```javascript
const Render = () => {
	useEffect( () => {
		console.log( 'Welcome to WCEU 2022!' );
	} );
	return null;
};
```
7. Reload the page and we should see our message in the controls. Our code is now running in the Block Editor! 🥳 🥳 🥳 🥳 🥳. Let's move on!


## **Section  2 - Getting information out of the datastore**

Before we can determine if we want to stop the post from being published, we need to get some information the Block Editor that we can check to make that decision. To do that, we need to use the `@wordpress/data` package and specifically the `useSelect` hook.

1. import the useSelect hook from the `@wordpress/data` package
```javascript
import { useSelect } from '@wordpress/data';
```
2. Access the `block-editor` store to retrieve the list of block in currently in the block editor by calling the `getBlocks` selector. Because we're using a hook, we need to place the hook at the top of the component to ensure it's called every time.
```javascript
const Render = () => {

	const blocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlocks() );

	useEffect( () => {
		console.log( 'Hello!' );
	} );
	return null;
};

```
3. Having the list of blocks means we can now get the word count. Let's import a couple of things to so that
```javascript
import { count } from '@wordpress/wordcount';
import { serialize } from '@wordpress/blocks';
```
4. Inside our `useEffect` hook we can add the following to serialize the list of blocks and then count number of words contained in all blocks. Be sure to add the `blocks` variable to the list of dependencies for `useEffect` to be sure that anytime the blocks changes, that the word count is updated.

```javascript
const Render = () => {

	const blocks = useSelect( ( select ) => select( 'core/block-editor' ).getBlocks() );

	useEffect( () => {
		// Get the WordCount
		const currentWordCount = count( serialize( blocks ), 'words' );
		console.log( `There are ${currentWordCount} words` )
	}, [ blocks ] );

	return null;
};
```

5. Next, lets retrieve information about the categories list and the Featured image. Instead of having a `useSelect` hook for each item we want to retrieve, let's combine them in to a single call. The code below returns an object containing all three items we want to check and then we destructure them out as variables.

```javascript
const Render = () => {

	const { blocks, categories, featuredImageID } = useSelect( ( select ) => {
		return {
			blocks: select( 'core/block-editor' ).getBlocks(),
			categories: select( 'core/editor' ).getEditedPostAttribute(
				'categories'
			),
			featuredImageID: select( 'core/editor' ).getEditedPostAttribute(
				'featured_media'
			),
		};
	} );

	useEffect( () => {
		// Get the WordCount
		const currentWordCount = count( serialize( blocks ), 'words' );
		console.log( `There are ${currentWordCount} words` )
	}, [ blocks ] );

	return null;
}
```
6. Let's add our new variables to the `useEffect` hook list of dependencies and output a message for each of them.
```javascript
const Render = () => {
	const { blocks, categories, featuredImageID } = useSelect( ( select ) => {
		return {
			blocks: select( 'core/block-editor' ).getBlocks(),
			categories: select( 'core/editor' ).getEditedPostAttribute(
				'categories'
			),
			featuredImageID: select( 'core/editor' ).getEditedPostAttribute(
				'featured_media'
			),
		};
	} );

	useEffect( () => {
		// Get the WordCount
		const currentWordCount = count( serialize( blocks ), 'words' );
		console.log( `There are ${currentWordCount} words` )

		// Does the post have a featured image?
		console.log( 'Featured image?', featuredImageID === 0 )

		// Check that there a category assigned to the post.
		console.log( 'Categories assigned?', categories.length )
	}, [ blocks, categories, featuredImageID ] );

	return null;
}
```
7. Reload the page and we should see that our messages are updating whenever we make changes to the list of blocks, the assigned categories or the Featured image. **Great Success!!!** 🔥🔥🔥🔥🔥🔥
## **Section  3 - Restricting publishing**
Now that we have the data we need to check, we can make decisions on whether the post should be locked.

1. Let's start by adding a new variable called `lockPost` to our `useEffect` that will used to determine if the post should be locked. We are defining the variable using `let` so we can change its value later and setting the initial value to `false` each time the `useEffect` is called.

```javascript
useEffect( () => {
		// Define a variable to track whether the post should be locked
		let lockPost = false;

		/* Existing code removed for clarity - keep yours though 😄 */
	}, [ blocks, categories, featuredImageID ] );
```


2. Next, we can add some `if` statements to check each of the items to see if they pass the requirements and then check `lockPost` to see if we need to lock the post. Add the code below, refresh the page and then test the logic. You can change the values as needed to test i.e reducing the word count requirement.
```javascript
useEffect( () => {
		// Define a variable to track whether the post should be locked
		let lockPost = false;
		// Get the WordCount
		const currentWordCount = count( serialize( blocks ), 'words' );

		// If the word count is less than the required, lock the post saving.
		if ( currentWordCount < 500 ) {
			lockPost = true;
		}

		// Does the post have a featured image?
		if ( featuredImageID === 0 ) {
			lockPost = true;
		}

		// Check that there a category assigned to the post.
		if ( ! categories.length ) {
			lockPost = true;
		}

		//Lock or enable saving
		if ( lockPost === true ) {
			console.log( 'Lock post saving' );
		} else {
			console.log( 'Unlock post saving' );
		}
}, [ blocks, categories, featuredImageID ] );
```

3. To actually lock and unlock the post, we need to be able to tell the Block Editor to make that happen. We can again use the `@wordpress/data` but this time we need to use the `dispatch` function. When we dispatch an action, the datastore that controls the state of the Block Editor responds by changing something in the state. Let's get the dispatch function out of the package:
```javascript
import { useSelect, useDispatch } from '@wordpress/data';
```
4. Next we get retrieve the functions we need to dispatch the actions that lock and unlock post saving. Be sure to place this near the top of the file with the rest of the hooks.
```javascript
const {
		lockPostSaving,
		unlockPostSaving,
		enablePublishSidebar,
		disablePublishSidebar,
	} = useDispatch( 'core/editor' );
```
5. Now we can replace our logging with the correct functions to actually stop the post from being saved or published in our `useEffect` hook. Add the code, refresh and test again.
```javascript
useEffect( () => {
		// Define a variable to track whether the post should be locked
		let lockPost = false;
		// Get the WordCount
		const currentWordCount = count( serialize( blocks ), 'words' );

		// If the word count is less than the required, lock the post saving.
		if ( currentWordCount < 500 ) {
			lockPost = true;
		}
		// Does the post have a featured image?
		if ( featuredImageID === 0 ) {
			lockPost = true;
		}

		// Check that there a category assigned to the post.
		if ( categories.length ) {
			lockPost = true;
		}

		//Lock or enable saving
		if ( lockPost === true ) {
			lockPostSaving();
			disablePublishSidebar();
		} else {
			unlockPostSaving();
			enablePublishSidebar();
		}
}, [ blocks, categories, featuredImageID ] );
```
## **Section  4 - Creating a UI to provide feedback to the user.**
Up to now, we have not provided any feedback to the user. Let's change that by adding a UI that will give the user some feedback so they know why the post is not allowed to be saved or published.

1. We're going to add a new panel to the Settings sidebar so let's import the correct SlotFill. We'll also need a i18n function so we'll import it as well.
```javascript
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
```

2. Next, we can update our `Render` component to return  the SlotFill instead of `null`. Once you've saved and refreshed the page, you should see a new Panel in the Settings sidebar for the post called ***Prepublish Checklist***
```javascript
return (
	<PluginDocumentSettingPanel
		name="prepublish-checklist"
		title={ __( 'Prepublish Checklist', 'pre-publish-checklist' ) }
		className="prepublish-checklist"
	>
		Content will be displayed here
	</PluginDocumentSettingPanel>
);
```
3. Let's add some actual information from our plugin to the SlotFill. There are some pre-built components that are available in the `src/components` directory that we can use to standardize the display here. Let's import those and add them under the ***Internal Dependencies*** comment.
```javascript
/**
 * Internal dependencies
 */
import WordCountDisplayComponent from './components/wordCountDisplay';
import FeaturedImageDisplay from './components/featuredImageDisplay';
import CategoriesDisplay from './components/categoriesDisplay';
```

4. Next, update the our `return` statement to use this new components, passing the props they need. Save and test these changes.
```javascript
return (
	<PluginDocumentSettingPanel
		name="prepublish-checklist"
		title={ __( 'Prepublish Checklist', 'pre-publish-checklist' ) }
		className="prepublish-checklist"
	>
		<WordCountDisplayComponent
			wordCount={ currentWordCount }
			required={ 500 }
		/>

		<FeaturedImageDisplay featuredImageID={ featuredImageID } />

		<CategoriesDisplay categories={ categories } />
	</PluginDocumentSettingPanel>
);
```

5. At this point, you most likely got an error. This is because `currentWordCount` is not available outside of the `useEffect` hook. We can fix this by creating using some internal state for our component. This is great way of tracking data that doesn't need to be saved and is only used while the component is active. Let's import the `useState` hook from the same package as `useEffect`
```javascript
import { useEffect, useState } from '@wordpress/element';
```

6. Next, lets create a temporary variable to track the state and a function to update it when we need to. Put this with the rest of our hooks.
```javascript
const [ wordCountDisplay, setWordCountDisplay ] = useState( '' );
```

7. Now, update our `useEffect` hook to update this internal state when the word count is updated
```javascript
useEffect( () => {
	// Get the WordCount
	const currentWordCount = count( serialize( blocks ), 'words' );
	setWordCountDisplay( currentWordCount );

	/* truncated */
}, [ settings, blocks ] );
```

8. Finally, update the `WordCountDisplayComponent` component to use `wordCountDisplay` instead of the `currentWordCount` and everything should be working now
```javascript
return (
	<PluginDocumentSettingPanel
		name="prepublish-checklist"
		title={ __( 'Prepublish Checklist', 'pre-publish-checklist' ) }
		className="prepublish-checklist"
	>
		<WordCountDisplayComponent
			wordCount={ wordCountDisplay }
			required={ 500 }
		/>

		<FeaturedImageDisplay featuredImageID={ featuredImageID } />

		<CategoriesDisplay categories={ categories } />
	</PluginDocumentSettingPanel>
);
```
9. Test out the new panel and confirm that the logic is working and that the feedback is correct.
## 🎉🎉🎉🎉🎉🎉 **CONGRATULATIONS!!! You have a working pre-publish checklist!!** 🎉🎉🎉🎉

## **Section  5 - Tying in our custom admin page.**

Now that we have a working pre-publish checklist, let's incorporate the Settings Page to be able to control all of the requirements.

For some background, the Settings Page has registered a custom datastore that will save to a option in the database. This has all be pre-built for us so we only need to access the data that it provides.

1. The first thing we need to do is import the store itself and a constant that contains the name of the store
```javascript
// Pull the store into the plugin
import '../admin/datastore';
import { STORE_NAME } from '../admin/datastore/constants';
```
2. Next, we can retrieve all of the settings that the custom datastore provides by adding another property to our `useSelect` hook. We can also destructure them out to be used in the `Render` component
```javascript
const {
		blocks,
		categories,
		featuredImageID,
		settings: { wordCount, requiredFeaturedImage, requiredCategory },
	} = useSelect( ( select ) => {
		return {
			blocks: select( 'core/block-editor' ).getBlocks(),
			categories: select( 'core/editor' ).getEditedPostAttribute(
				'categories'
			),
			featuredImageID: select( 'core/editor' ).getEditedPostAttribute(
				'featured_media'
			),
			settings: select( STORE_NAME ).getSettings(),
		};
	} );
```

3. Next, we can update our logic to check against these settings in our `useEffect`. Because requiring a Featured image or categories is option, we check to be sure that the setting is `true` before checking if the items exist
```javascript
// If the word count is less than the required, lock the post saving.
if ( currentWordCount < wordCount ) {
	lockPost = true;
}
// Does the post have a featured image?
if ( requiredFeaturedImage && featuredImageID === 0 ) {
	lockPost = true;
}

// Check that there a category assigned to the post.
if ( requiredCategory && categories.length ) {
	lockPost = true;
}
```

4. Finally, we need to update the components in our UI to use the correct items and only display the Featured image and Category items if the settings indicate they should be shown
```javascript
<WordCountDisplayComponent
	wordCount={ wordCountDisplay }
	required={ settings.wordCount }
/>
{ settings.requiredFeaturedImage && (
	<FeaturedImageDisplay featuredImageID={ featuredImageID } />
) }
{ settings.requiredCategory && (
	<CategoriesDisplay categories={ categories } />
) }
```
