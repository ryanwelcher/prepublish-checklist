/**
 * WordPress dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

import {
	DEFAULT_STATE,
	STATE_FROM_DATABASE,
	SET_WORD_COUNT,
	FETCH_SETTINGS,
	SET_FEATURED_IMAGE,
	SET_CATEGORY,
	SET_USER_PREFERENCES,
	STORE_NAME,
	IS_SAVING,
	IS_LOADING,
} from './constants';

// Define our actions
const actions = {
	initSettings( settings ) {
		return {
			type: STATE_FROM_DATABASE,
			payload: {
				...settings,
			},
		};
	},
	fetchSettings() {
		return {
			type: FETCH_SETTINGS,
			payload: {},
		};
	},
	setWordCount( wordCount ) {
		return {
			type: SET_WORD_COUNT,
			payload: {
				wordCount,
			},
		};
	},
	setFeaturedImageIsRequired( requiredFeaturedImage ) {
		return {
			type: SET_FEATURED_IMAGE,
			payload: {
				requiredFeaturedImage,
			},
		};
	},
	setCategoryRequired( requiredCategory ) {
		return {
			type: SET_CATEGORY,
			payload: { requiredCategory },
		};
	},
	setUserPreferences( userPreferences ) {
		return {
			type: SET_USER_PREFERENCES,
			payload: {
				userPreferences,
			},
		};
	},
	setToggleState( section ) {
		return function ( { select, dispatch } ) {
			const currentValues = select.getUserPreferences();
			const sectionValue = currentValues[ section ];
			dispatch.setUserPreferences( {
				...currentValues,
				[ section ]: ! sectionValue,
			} );
		};
	},
	setIsSaving( status ) {
		return {
			type: IS_SAVING,
			payload: {
				status,
			},
		};
	},
	setIsLoading( status ) {
		return {
			type: IS_LOADING,
			payload: {
				status,
			},
		};
	},
	saveSettings( { wordCount, requiredFeaturedImage, requiredCategory } ) {
		return async function ( { dispatch, registry } ) {
			dispatch.setIsSaving( true );
			await registry
				.dispatch( 'core' )
				.saveEntityRecord( 'root', 'site', {
					'pre-publish-checklist_data': {
						wordCount,
						requiredFeaturedImage,
						requiredCategory,
					},
				} );
			dispatch.setIsSaving( false );
		};
	},
};

// Define the reducer
function reducer( state = DEFAULT_STATE, { type, payload } ) {
	switch ( type ) {
		case IS_SAVING: {
			const { status } = payload;
			return {
				...state,
				isSaving: status,
			};
		}
		case IS_LOADING: {
			const { status } = payload;
			return {
				...state,
				isLoading: status,
			};
		}
		case STATE_FROM_DATABASE:
			return {
				...state,
				...payload,
			};
		case SET_WORD_COUNT:
			const { wordCount } = payload;
			return {
				...state,
				wordCount,
			};
		case SET_FEATURED_IMAGE:
			const { requiredFeaturedImage } = payload;
			return {
				...state,
				requiredFeaturedImage,
			};
		case SET_CATEGORY:
			const { requiredCategory } = payload;
			return {
				...state,
				requiredCategory,
			};
		case SET_USER_PREFERENCES:
			const { userPreferences } = payload;
			if ( userPreferences ) {
				window.localStorage.setItem(
					'pre-publish-checklist-user-preferences',
					JSON.stringify( userPreferences )
				);
			}
			return {
				...state,
				userPreferences,
			};
	}
	return state;
}

// Define some selectors
const selectors = {
	getWordCount( state ) {
		return state.wordCount;
	},
	getFeatureImageIsRequired( state ) {
		return state.requiredFeaturedImage;
	},
	getCategoryIsRequired( state ) {
		return state.requiredCategory;
	},
	getSettings( state ) {
		// eslint-disable-next-line no-unused-vars
		const { userPreferences, ...settings } = state;
		return settings;
	},
	getUserPreferences( state ) {
		return state.userPreferences;
	},
	getIsSaving( state ) {
		return state.isSaving;
	},
	getIsLoading( state ) {
		return state.isLoading;
	},
};

const resolvers = {
	getSettings() {
		return async ( { dispatch, registry } ) => {
			dispatch.setIsLoading( true );
			const settings = await registry
				.resolveSelect( 'core' )
				.getEntityRecord( 'root', 'site' );
			dispatch.initSettings( settings[ 'pre-publish-checklist_data' ] );
			dispatch.setIsLoading( false );
		};
	},
	getUserPreferences() {
		return ( { dispatch } ) => {
			const userPreferences =
				window.localStorage.getItem(
					'pre-publish-checklist-user-preferences'
				) || DEFAULT_STATE.userPreferences;
			dispatch.setUserPreferences( JSON.parse( userPreferences ) );
		};
	},
};

// Define and register the store.
const store = createReduxStore( STORE_NAME, {
	reducer,
	actions,
	selectors,
	resolvers,
	__experimentalUseThunks: true, // Fallback for those not using WP 6.0
} );

register( store );
