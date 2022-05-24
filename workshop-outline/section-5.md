
# Section  5 - Tying in our custom admin page.

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

## 🎉🎉🎉 **CONGRATULATIONS!!! You have a working pre-publish checklist!!** 🎉🎉🎉

# Missing something from the last section?
[Section 4: Creating a UI to provide feedback to the user](./section-4.md)
