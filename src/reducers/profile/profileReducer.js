/**
 * # profileReducer.js
 *
 * The reducer user profile actions
 */
'use strict'

/**
 * ## Imports
 *
 * fieldValidation for validating the fields
 * formValidation for setting the form's valid flag
 */
const fieldValidation = require('../../lib/fieldValidation').default
const formValidation = require('./profileFormValidation').default

/**
 * ## Actions
 *
 */
const {
  ON_PROFILE_FORM_FIELD_CHANGE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  GET_PROFILE_REPOS,
  GET_PROFILE_REPOS_SUCCESS,
  GET_PROFILE_REPOS_FAIL,

  GET_PROFILE_REPO_INFO,
  GET_PROFILE_REPO_INFO_SUCCESS,
  GET_PROFILE_REPO_INFO_FAIL,

  GET_ID_NUMBER,
  GET_ID_NUMBER_SUCCESS,
  GET_ID_NUMBER_FAIL,

  GET_QRCODE,
  GET_QRCODE_SUCCESS,
  GET_QRCODE_FAIL,

  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,

  LOGOUT_SUCCESS,

  SET_STATE
} = require('../../lib/constants').default

/**
 * ## Initial State
 *
 */
const InitialState = require('./profileInitialState').default
const initialState = new InitialState()

// const initialState = { repos: [], repoInfo: {}, user: {} };

/**
 * ## profileReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function profileReducer (state = initialState, action) {
  let nextProfileState = null

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {
    /**
     * ### Request starts
     * set the form to fetching and clear any errors
     */
    case GET_PROFILE_REQUEST:
    case PROFILE_UPDATE_REQUEST:
      return state.setIn(['form', 'isFetching'], true)
      .setIn(['form', 'error'], null)

    /**
     * ### Request end successfully
     * set the form to fetching as done
     */
    case PROFILE_UPDATE_SUCCESS:
      return state.setIn(['form', 'isFetching'], false)

    /**
     * ### Request ends successfully
     *
     * the fetching is done, set the UI fields and the originalProfile
     *
     * Validate the data to make sure it's all good and someone didn't
     * mung it up through some other mechanism
     */
    // case GET_PROFILE_SUCCESS:
    //   nextProfileState = state.setIn(['form', 'isFetching'], false)
    //   .setIn(['form', 'fields', 'username'], action.payload.username)
    //   .setIn(['form', 'fields', 'email'], action.payload.email)
    //   .setIn(['form', 'fields', 'emailVerified'],
    //          action.payload.emailVerified)
    //   .setIn(['form', 'originalProfile', 'username'], action.payload.username)
    //   .setIn(['form', 'originalProfile', 'email'], action.payload.email)
    //   .setIn(['form', 'originalProfile', 'emailVerified'], action.payload.emailVerified)
    //   .setIn(['form', 'originalProfile', 'objectId'], action.payload.objectId)
    //   .setIn(['form', 'error'], null)

    //   return formValidation(
    //   fieldValidation(nextProfileState, action)
    //   , action)

    case GET_PROFILE_SUCCESS:
      nextProfileState = state.setIn(['form', 'isFetching'], false)
      .setIn(['form', 'fields', 'firstname'], action.payload.firstname)
      .setIn(['form', 'fields', 'surname'], action.payload.surname)
      .setIn(['form', 'fields', 'last6nin'], action.payload.last6nin)
      .setIn(['form', 'fields', 'dob'], action.payload.dob)
      .setIn(['form', 'fields', 'oldnumber'], action.payload.oldnumber)
      .setIn(['form', 'fields', 'currentnumber'], action.payload.currentnumber)
      .setIn(['form', 'fields', 'currentnumberVerified'], action.payload.currentnumber)

      .setIn(['form', 'originalProfile', 'firstname'], action.payload.firstname)
      .setIn(['form', 'originalProfile', 'surname'], action.payload.surname)
      .setIn(['form', 'originalProfile', 'last6nin'], action.payload.last6nin)
      .setIn(['form', 'originalProfile', 'dob'], action.payload.dob)
      .setIn(['form', 'originalProfile', 'oldnumber'], action.payload.oldnumber)
      .setIn(['form', 'originalProfile', 'currentnumber'], action.payload.currentnumber)
      .setIn(['form', 'originalProfile', 'currentnumberVerified'], action.payload.currentnumberVerified)
      .setIn(['form', 'originalProfile', 'objectId'], action.payload.objectId)
      .setIn(['form', 'error'], null)

      return formValidation(
        fieldValidation(nextProfileState, action)
      , action)

    /**
     * User logged out, so reset form fields and original profile.
     *
     */
    // case LOGOUT_SUCCESS:
    //   nextProfileState = state.setIn(['form', 'fields', 'username'], '')
    //   .setIn(['form', 'fields', 'email'], '')
    //   .setIn(['form', 'fields', 'emailVerified'], false)
    //   .setIn(['form', 'originalProfile', 'username'], '')
    //   .setIn(['form', 'originalProfile', 'email'], '')
    //   .setIn(['form', 'originalProfile', 'emailVerified'], false)
    //   .setIn(['form', 'originalProfile', 'objectId'], null)
    //   .setIn(['form', 'error'], null)
    //   return formValidation(nextProfileState, action)
    case LOGOUT_SUCCESS:
      nextProfileState = state.setIn(['form', 'fields', 'firstname'], '')
      .setIn(['form', 'fields', 'surname'], '')
      .setIn(['form', 'fields', 'last6nin'], '')
      .setIn(['form', 'fields', 'dob'], '')
      .setIn(['form', 'fields', 'oldnumber'], '')
      .setIn(['form', 'fields', 'currentnumber'], '')
      .setIn(['form', 'fields', 'currentnumberVerified'], flase)

      .setIn(['form', 'originProfile', 'firstname'], '')
      .setIn(['form', 'originProfile', 'surname'], '')
      .setIn(['form', 'originProfile', 'last6nin'], '')
      .setIn(['form', 'originProfile', 'dob'], '')
      .setIn(['form', 'originProfile', 'oldnumber'], '')
      .setIn(['form', 'originProfile', 'currentnumber'], '')
      .setIn(['form', 'originProfile', 'currentnumberVerified'], false)
      .setIn(['form', 'originProfile', 'objectId'], null)
      .setIn(['form', 'error'], null)
      return formValidation(nextProfileState, action)
      

    /**
     * ### Request fails
     * we're done fetching and the error needs to be displayed to the user
     */
    case GET_PROFILE_FAILURE:
    case PROFILE_UPDATE_FAILURE:
      return state.setIn(['form', 'isFetching'], false)
      .setIn(['form', 'error'], action.payload)

    /**
     * ### form fields have changed
     *
     * Set the state with the fields, clear the form error
     * and perform field and form validation
     */
    case ON_PROFILE_FORM_FIELD_CHANGE: {
      const {field, value} = action.payload
      let nextState = state
          .setIn(['form', 'fields', field], value)
          .setIn(['form', 'error'], null)

      return formValidation(
        fieldValidation(nextState, action),
        action
      )
    }

    /**
     * This will fetch the information about the current user
     * **/

     /**GET repos state and setting them on load */
    case GET_PROFILE_REPOS:
      return { ...state, loading: true };
    case GET_PROFILE_REPOS_SUCCESS:
      return { ...state, loading: false, repos: action.payload.data };
    case GET_PROFILE_REPOS_FAIL:
      return { ...state, loading: false, error: 'Error getting repos info' };
    /**Get repo state and setting them on load */
    case GET_PROFILE_REPO_INFO:
      return { ...state, loadingInfo: true };
    case GET_PROFILE_REPO_INFO_SUCCESS:
      return { ...state, loadingInfo: false, repoInfo: action.payload.data };
    case GET_PROFILE_REPO_INFO_FAIL:
      console.log(action.payload);
      return {
        ...state,
        loadingInfo: false,
        errorInfo: 'Error getting repo info'
      };
      /**Get User infomation and setting them for loading to payloads */
    case GET_USER:
      return { ...state, loadingProfile: true };
    case GET_USER_SUCCESS:
      return { ...state, loadingProfile: false, user: action.payload.data };
    case GET_USER_FAIL:
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting user info'
    };
    
    /**Same for ID number */
    case GET_ID_NUMBER:
      return { ...state, loadingIdnumber: true };
    case GET_ID_NUMBER_SUCCESS:
      return { ...state, loadingIdnumber: false, user: action.payload.data };
    case GET_ID_NUMBER_FAIL:
      return {
        ...state,
        loadingIdnumber: false,
        errorUser: 'Error getting user info'
    };

    /**Same for ID number */
    case GET_QRCODE:
      return { ...state, loadingIdnumber: true };
    case GET_QRCODE_SUCCESS:
      return { ...state, loadingIdnumber: false, user: action.payload.data };
    case GET_QRCODE_FAIL:
      return {
        ...state,
        loadingIdnumber: false,
        errorUser: 'Error getting user info'
    };

    /**
     * ### set the state
     *
     * This is in support of Hot Loading - take the payload
     * and set the values into the state
     *
     */
    case SET_STATE:
      var profile = JSON.parse(action.payload).profile.form
      // var next = state.setIn(['form', 'disabled'], profile.disabled)
      //     .setIn(['form', 'error'], profile.error)
      //     .setIn(['form', 'isValid'], profile.isValid)
      //     .setIn(['form', 'isFetching'], profile.isFetching)
      //     .setIn(['form', 'originalProfile',
      //             'username'], profile.originalProfile.username)
      //     .setIn(['form', 'originalProfile',
      //             'email'], profile.originalProfile.email)
      //     .setIn(['form', 'originalProfile',
      //             'objectId'], profile.originalProfile.objectId)
      //     .setIn(['form', 'originalProfile',
      //             'emailVerified'], profile.originalProfile.emailVerified)
      //     .setIn(['form', 'fields',
      //             'username'], profile.fields.username)
      //     .setIn(['form', 'fields',
      //             'usernameHasError'], profile.fields.usernameHasError)
      //     .setIn(['form', 'fields',
      //             'email'], profile.fields.email)
      //     .setIn(['form', 'fields',
      //             'emailHasError'], profile.fields.emailHasError)
      //     .setIn(['form', 'fields',
      //             'emailVerified'], profile.fields.emailVerified)
      var next = state.setIn(['from', 'disabled'], profile.disabled)
          .setIn(['form', 'error'], profile.error)
          .setIn(['form', 'isValid'], profile.isValid)
          .setIn(['form', 'isFetching'], profile.isFetching)
          .setIn(['form', 'originalProfile', 'firstname'], profile.originalProfile.firstname)
          .setIn(['form', 'originalProfile', 'surname'], profile.originalProfile.surname)
          .setIn(['form', 'originalProfile', 'last6nin'], profile.originalProfile.last6nin)
          .setIn(['form', 'originalProfile', 'dob'], profile.originalProfile.dob)
          .setIn(['form', 'originalProfile', 'oldnumber'], profile.originalProfile.oldnumber)
          .setIn(['form', 'originalProfile', 'currentnumber'], profile.originalProfile.currentnumber)

          .setIn(['form', 'originalProfile', 'objectId'], profile.originalProfile.objectId)

          .setIn(['form', 'originalProfile', 'currentnumberVerified'], profile.originalProfile.mobileVerified)
          .setIn(['form', 'fields', 'firstname'], profile.fields.firstname)
          .setIn(['form', 'fields', 'firstnameHasError'], profile.fields.firstnameHasError)
          .setIn(['form', 'fields', 'surname'], profile.fields.surname)
          .setIn(['form', 'fields', 'surnameHasError'], profile.fields.surnameHasError)
          .setIn(['form', 'fields', 'last6nin'], profile.fields.last6nin)
          .setIn(['form', 'fields', 'last6ninHasError'], profile.fields.last6ninHasError)
          .setIn(['form', 'fields', 'dob'], profile.fields.dob)
          .setIn(['form', 'fields', 'dobHasError'], profile.fields.dobHasError)
          
          .setIn(['form', 'fields', 'oldnumber'], profile.fields.oldnumber)
          .setIn(['form', 'fields', 'oldnumberHasError'], profile.fields.oldnumberHasError)
          .setIn(['form', 'fields', 'currentnumber'], profile.fields.currentnumber)
          .setIn(['form', 'fields', 'currentnumberHasError'], profile.fields.currentnumberHasError)
          .setIn(['form', 'fields', 'currentnumberVerified'], profile.fields.currentnumberVerified)
      return next

  }
  // switch
  /**
   * # Default
   */
  return state
}

/***
 * This fetches the information about the current user and display on the user's screen
*/
// export function listRepos(user) {
//   return {
//     type: GET_PROFILE_REPOS,
//     payload: {
//       request: {
//         url: `/users/${user}/repos`
//       }
//     }
//   };
// }

// export function getRepoDetail(user, repo) {
//   return {
//     type: GET_PROFILE_REPO_INFO,
//     payload: {
//       request: {
//         url: `/repos/${user}/${repo}`
//       }
//     }
//   };
// }

// export function getUser(user) {
//   return {
//     type: GET_USER,
//     payload: {
//       request: {
//         url: `/users/${user}`
//       }
//     }
//   };
// }

// export function getUser(user) {
//   return {
//     type: GET_ID_NUMBER,
//     payload: {
//       request: {
//         url: `/users/${user}`
//       }
//     }
//   };
// }

// export function getUser(user) {
//   return {
//     type: GET_QRCODE,
//     payload: {
//       request: {
//         url: `https://vsc.ibib.io:7071/verify?r=v&h=${HASH}&u=${USERID&l}=${IdLevel}&i=${idNUMBER}&c=${CRIHASH}}`
//       }
//     }
//   };
// }