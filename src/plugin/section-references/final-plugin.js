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

// Pull the store into the plugin
import '../admin/datastore';
import { STORE_NAME } from '../admin/datastore/constants';

const Render = () => {
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
				required={ wordCount }
			/>
			{ requiredFeaturedImage && (
				<FeaturedImageDisplay featuredImageID={ featuredImageID } />
			) }
			{ requiredCategory && (
				<CategoriesDisplay categories={ categories } />
			) }
		</PluginDocumentSettingPanel>
	);
};

registerPlugin( 'wceu-2022-prepublish-checklist', {
	icon: 'forms',
	render: Render,
} );
