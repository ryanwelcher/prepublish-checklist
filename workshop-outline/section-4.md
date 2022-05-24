# Section  4 - Creating a UI to provide feedback to the user
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

# Ready to move on?
[Section 5: Tying in our custom admin page](./section-5.md)
# Missing something from the last section?
[Section 3: Restricting publishing](./section-3.md)
