/**
 *  WordPress dependencies
 */
import { ToggleControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_NAME } from '../datastore/constants';
import SettingsSection from './settings-section';

const Category = () => {
	// Get the data from the state.
	const { requiredCategory, userPreferences, isLoading } = useSelect(
		( select ) => {
			const store = select( STORE_NAME );
			return {
				requiredCategory: store.getCategoryIsRequired(),
				userPreferences: store.getUserPreferences(),
				isLoading: store.getIsLoading(),
			};
		}
	);

	// Update the state.
	const { setCategoryRequired, setToggleState } = useDispatch( STORE_NAME );

	const { showCategory } = userPreferences || {
		showCategory: false,
	};
	return (
		<SettingsSection
			title={ __( 'Category Options', 'pre-publish-checklist' ) }
			initialOpen={ showCategory }
			onToggle={ () => {
				setToggleState( 'showCategory', ! showCategory );
			} }
		>
			{ isLoading ? (
				<Spinner />
			) : (
				<ToggleControl
					label={ __( 'Require Category', 'pre-publish-checklist' ) }
					checked={ requiredCategory }
					onChange={ () => {
						setCategoryRequired( ! requiredCategory );
					} }
				/>
			) }
		</SettingsSection>
	);
};
export default Category;
