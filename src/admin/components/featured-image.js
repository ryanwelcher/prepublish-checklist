/**
 *  WordPress dependencies
 */
import { ToggleControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';

import { STORE_NAME } from '../datastore/constants';
import SettingsSection from './settings-section';

const FeaturedImage = () => {
	// Get the data from the state.
	const { imageRequired, userPreferences, isLoading } = useSelect(
		( select ) => {
			const store = select( STORE_NAME );
			return {
				imageRequired: store.getFeatureImageIsRequired(),
				userPreferences: store.getUserPreferences(),
				isLoading: store.getIsLoading(),
			};
		}
	);

	// Update the state.
	const { setFeaturedImageIsRequired, setToggleState } = useDispatch(
		STORE_NAME
	);

	const { showFeaturedImage } = userPreferences || {
		showFeaturedImage: false,
	};

	return (
		<SettingsSection
			title={ __( 'Featured Image Options', 'pre-publish-checklist' ) }
			initialOpen={ showFeaturedImage }
			onToggle={ () => {
				setToggleState( 'showFeaturedImage', ! showFeaturedImage );
			} }
		>
			{ isLoading ? (
				<Spinner />
			) : (
				<ToggleControl
					label={ __(
						'Require Featured Image',
						'pre-publish-checklist'
					) }
					checked={ imageRequired }
					onChange={ () => {
						setFeaturedImageIsRequired( ! imageRequired );
					} }
				/>
			) }
		</SettingsSection>
	);
};
export default FeaturedImage;
