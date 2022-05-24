/**
 * WordPress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { useSelect, useDispatch } from '@wordpress/data';
import { count } from '@wordpress/wordcount';
import { serialize } from '@wordpress/blocks';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import WordCountDisplayComponent from './components/wordCountDisplay';
import FeaturedImageDisplay from './components/featuredImageDisplay';
import CategoriesDisplay from './components/categoriesDisplay';

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

	const {
		lockPostSaving,
		unlockPostSaving,
		enablePublishSidebar,
		disablePublishSidebar,
	} = useDispatch( 'core/editor' );

	const [ wordCountDisplay, setWordCountDisplay ] = useState( '' );

	useEffect( () => {
		// Define a variable to track whether the post should be locked
		let lockPost = false;
		// Get the WordCount
		const currentWordCount = count( serialize( blocks ), 'words' );
		setWordCountDisplay( currentWordCount );

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
};

registerPlugin( 'wceu-2022-prepublish-checklist', {
	icon: 'forms',
	render: Render,
} );
