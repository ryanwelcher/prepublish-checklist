/**
 *  WordPress dependencies
 */
import { PanelRow } from '@wordpress/components';
import { Icon, check, warning } from '@wordpress/icons';

const CategoriesDisplay = ( { categories } ) => {
	const locked = ! categories.length || categories.includes( 1 );

	const generateMessage = () => {
		if ( locked ) {
			if ( ! categories.length ) {
				return 'Please assign a category.';
			}

			if ( categories.includes( 1 ) ) {
				return 'Categories cannot include Uncategorized';
			}
		}
		return 'Categories assigned correctly';
	};
	return (
		<PanelRow>
			{ generateMessage() }
			{ locked ? <Icon icon={ warning } /> : <Icon icon={ check } /> }
		</PanelRow>
	);
};

export default CategoriesDisplay;
