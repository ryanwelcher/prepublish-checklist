/**
 * WordPress dependencies
 */
import { TextControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';

import { STORE_NAME } from '../datastore/constants';
import SettingsSection from './settings-section';

const WordCount = () => {
	// Get the data from the state.
	const { wordCount, userPreferences, isLoading } = useSelect( ( select ) => {
		const store = select( STORE_NAME );
		return {
			wordCount: store.getWordCount(),
			userPreferences: store.getUserPreferences(),
			isLoading: store.getIsLoading(),
		};
	} );

	// Update the state.
	const { setWordCount, setToggleState } = useDispatch( STORE_NAME );

	const { showWordCount } = userPreferences || { showWordCount: false };
	return (
		<SettingsSection
			title={ __( 'Word Count Options', 'pre-publish-checklist' ) }
			initialOpen={ showWordCount }
			onToggle={ () => {
				setToggleState( 'showWordCount', ! showWordCount );
			} }
		>
			{ isLoading ? (
				<Spinner />
			) : (
				<TextControl
					label={ __(
						'Minimum Word Count',
						'pre-publish-checklist'
					) }
					value={ wordCount }
					onChange={ ( value ) => setWordCount( value ) }
				/>
			) }
		</SettingsSection>
	);
};
export default WordCount;
