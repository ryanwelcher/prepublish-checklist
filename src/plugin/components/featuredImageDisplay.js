/**
 *  WordPress dependencies
 */
import { PanelRow } from '@wordpress/components';
import { Icon, check, warning } from '@wordpress/icons';

const FeaturedImageDisplay = ( { featuredImageID } ) => {
	const locked = featuredImageID === 0;
	const message = locked
		? 'Please assign a Featured image'
		: 'Featured image set.';
	return (
		<PanelRow>
			<span style={ { marginTop: '3px' } }>{ message }</span>
			{ locked ? <Icon icon={ warning } /> : <Icon icon={ check } /> }
		</PanelRow>
	);
};

export default FeaturedImageDisplay;
