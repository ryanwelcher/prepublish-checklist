/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */

const Render = () => {
	useEffect( () => {
		console.log( 'Hello!' );
	} );
	return null;
};

registerPlugin( 'wceu-2022-prepublish-checklist', {
	icon: 'forms',
	render: Render,
} );
