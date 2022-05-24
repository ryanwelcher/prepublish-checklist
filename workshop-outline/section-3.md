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
		if ( ! categories.length ) {
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
# Ready to move on?
[Section 4: Creating a UI to provide feedback to the user](./section-4.md)
