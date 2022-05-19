/**
 *  WordPress dependencies
 */
import { PanelRow } from '@wordpress/components';
import { Icon, check, warning } from '@wordpress/icons';

const WordCountDisplayComponent = ( { wordCount, required } ) => {
	const locked = wordCount < required;
	return (
		<PanelRow>
			{ ` ${ wordCount } of ${ required } required words.` }
			{ locked ? <Icon icon={ warning } /> : <Icon icon={ check } /> }
		</PanelRow>
	);
};

export default WordCountDisplayComponent;
