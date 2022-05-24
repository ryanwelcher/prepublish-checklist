# Section  2 - Getting information out of the datastore

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
		console.log( `There are ${ currentWordCount } words` );

		// Does the post have a featured image?
		console.log( 'Featured image?', featuredImageID === 0 ? 'No' : 'Yes' );

		// Check that there a category assigned to the post.
		console.log(
			'Categories assigned?',
			categories.length ? categories.length : 'No'
		);
	}, [ blocks, categories, featuredImageID ] );

	return null;
}
```
7. Reload the page and we should see that our messages are updating whenever we make changes to the list of blocks, the assigned categories or the Featured image. **Great Success!!!** 🔥🔥🔥🔥🔥🔥

# Ready to move on?
[Section 3: Restricting publishing](./section-3.md)
# Missing something from the last section?
[Section 1: Registering our plugin](./section-1.md)
