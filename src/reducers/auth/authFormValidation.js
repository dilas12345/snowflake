/**
 * # authFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict'

/**
 * ## Imports
 * the actions being addressed
 */
const {
  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../../lib/constants').default

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation (state) {
  switch (state.form.state) {
    /**
     * ### Logout has no fields, so always valid
     */
    case LOGOUT:
      return state.setIn(['form', 'isValid'], true)
    /**
     * ### Registration has 6 fields
     */
    case REGISTER:
      if (state.form.fields.firstname !== '' &&
          state.form.fields.surname !== '' &&
          state.form.fields.last6nin !== '' &&
          state.form.fields.year !== '' &&
          state.form.fields.currentnumber !== '' &&
          state.form.fields.password !== '' &&
          state.form.fields.passwordAgain !== '' &&
          !state.form.fields.firstnameHasError &&
          !state.form.fields.surnameHasError &&
          !state.form.fields.last6ninHasError &&
          !state.form.fields.yearHasError &&
          !state.form.fields.currentnumberHasError&&
          !state.form.fields.passwordHasError &&
          !state.form.fields.passwordAgainHasError)
           {
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }
    /**
     * ### Login has 2 fields
     */
    case LOGIN:
      if (state.form.fields.username !== '' &&
          state.form.fields.password !== '' &&
          !state.form.fields.usernameHasError &&
          !state.form.fields.passwordHasError) {
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }
    /**
     * ### Reset password has 1 field
     */
    case FORGOT_PASSWORD:
      if (state.form.fields.currentnumber !== '' &&
        !state.form.fields.currentnumberHasError) {
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }

  }
  /**
   * Default, return the state
   */
  return state
}
