/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { useSelect } from '@wordpress/data';
import { count } from '@wordpress/wordcount';
import { serialize } from '@wordpress/blocks';

/**
 * Internal dependencies
 */

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
};

registerPlugin( 'wceu-2022-prepublish-checklist', {
	icon: 'forms',
	render: Render,
} );
