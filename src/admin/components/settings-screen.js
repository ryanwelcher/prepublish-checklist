/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	Spinner,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
// eslint-disable-next-line no-unused-vars
import { useEntityProp } from '@wordpress/core-data'; // do I need this?
/**
 * Internal dependencies
 */
import '../datastore/index';
import WordCount from './wordcount';
import FeaturedImage from './featured-image';
import Category from './category';
import { STORE_NAME } from '../datastore/constants';

const SettingsScreen = () => {
	// Gets all settings from the store.
	const { isSaving, settingsFromState } = useSelect( ( select ) => {
		return {
			settingsFromState: select( STORE_NAME ).getSettings(),
			isSaving: select( STORE_NAME ).getIsSaving(),
		};
	} );

	const { saveSettings } = useDispatch( STORE_NAME );

	if ( ! settingsFromState ) {
		return <Spinner />;
	}

	return (
		<div className="wrap">
			<Panel header="Twitch Pre-Publish Checklist Settings">
				<WordCount />
				<FeaturedImage />
				<Category />
				<PanelBody>
					<PanelRow>
						{ isSaving ? (
							<Spinner />
						) : (
							<Button
								variant="primary"
								onClick={ () => {
									saveSettings( settingsFromState );
								} }
							>
								{ __( 'SAVE', 'pre-publish-checklist' ) }
							</Button>
						) }
					</PanelRow>
				</PanelBody>
			</Panel>
		</div>
	);
};

export default SettingsScreen;
