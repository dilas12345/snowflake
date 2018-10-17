/**
 * # profileActions.js
 *
 * The actions to support the users profile
 */
'use strict'
/**
 * ## Imports
 *
 * The actions for profile
 */
const {
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

  ON_PROFILE_FORM_FIELD_CHANGE
} = require('../../lib/constants').default

/**
 * BackendFactory - base class for server implementation
 * AppAuthToken for localStorage sessionToken access
 */
const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'

/**
 * ## retreiving profile actions
 */
export function getProfileRequest () {
  return {
    type: GET_PROFILE_REQUEST
  }
}
export function getProfileSuccess (json) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: json
  }
}
export function getProfileFailure (json) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: json
  }
}

/***
 * This fetches the information about the current user and display on the user's screen
*/
export function listRepos(user) {
  return {
    type: GET_PROFILE_REPOS,
    payload: {
      request: {
        url: `https://vsc.ibib.io:7071/verify?r=p`
      }
    }
  };
}

export function getRepoDetail(user, repo) {
  return {
    type: GET_PROFILE_REPO_INFO,
    payload: {
      request: {
        url: `https://vsc.ibib.io:7071/verify?r=p`
      }
    }
  };
}

export function getUser(user) {
  return {
    type: GET_USER,
    payload: {
      request: {
        url: `https://vsc.ibib.io:7071/verify?r=p`
      }
    }
  };
}

export function getIdnumber(user) {
  return {
    type: GET_ID_NUMBER,
    payload: {
      request: {
        url: `/users/${user}`
      }
    }
  };
}

export function getQrcode(user) {
  return {
    type: GET_QRCODE,
    payload: {
      request: {
        url: `https://vsc.ibib.io:7071/verify?r=v&h=${hash}&u=${userid}&l=${idlevel}&i=${idnumber}&c=${crihash}`
      }
    }
  };
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getProfile (sessionToken) {
  return dispatch => {
    dispatch(getProfileRequest())
    // store or get a sessionToken
    return appAuthToken.getSessionToken(sessionToken)
      .then((token) => {
        return BackendFactory(token).getProfile()
      })
      .then((json) => {
        dispatch(getProfileSuccess(json))
      })
      .catch((error) => {
        dispatch(getProfileFailure(error))
      })
  }
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function profileUpdateRequest () {
  return {
    type: PROFILE_UPDATE_REQUEST
  }
}
export function profileUpdateSuccess () {
  return {
    type: PROFILE_UPDATE_SUCCESS
  }
}
export function profileUpdateFailure (json) {
  return {
    type: PROFILE_UPDATE_FAILURE,
    payload: json
  }
}
/**
 * ## updateProfile
 * @param {string} userId -  objectId
 * @param {string} firstname - the users name
 * @param {string} surname - the user surname
 * @param {string] year - user's mobile
 * @param {string} currentnumber - user's mobileAgain,
 * @param {string} nin
 * @param {string} userid - user's userID
 * @param {string} dob
 * @param {string} idnumber
 * @param {string} gender
 * @param {string} expiry
 * @param {string} nationality
 * 
 * @param {Object} sessionToken - the sessionToken
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export function updateProfile (userId, firstname, surname, last6nin, year, nin, userid, gender, expiry, nationality, sessionToken) {
  return dispatch => {
    dispatch(profileUpdateRequest())
    return appAuthToken.getSessionToken(sessionToken)
      .then((token) => {
        return BackendFactory(token).updateProfile(userId,
          {
            firstname: firstname,
            surname: surname,
            last6nin: last6nin,
            dob: dob,
            year: year,
            currentnumber: currentnumber,
            nin: nin,
            userid: userid,
            gender: gender,
            expiry: expiry,
            nationality: nationality
            
          }
        )
      })
      .then(() => {
        dispatch(profileUpdateSuccess())
        dispatch(getProfile())
      })
      .catch((error) => {
        dispatch(profileUpdateFailure(error))
      })
  }
}
/**
 * ## onProfileFormFieldChange
 *
 */
export function onProfileFormFieldChange (field, value) {
  return {
    type: ON_PROFILE_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}
