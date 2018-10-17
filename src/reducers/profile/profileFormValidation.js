/**
 * # profileFormValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict'

/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 *
 * As there are only two fields, the form is valid if they are
 */
export default function formValidation (state) {
  // if (state.form.fields.username !== '' &&
  //       state.form.fields.email !== '' &&
  //       !state.form.fields.usernameHasError &&
  //       !state.form.fields.emailHasError &&
  //       (state.form.fields.username !== state.form.originalProfile.username ||
  //        state.form.fields.email !== state.form.originalProfile.email)
  //      ) {
  //   return state.setIn(['form', 'isValid'], true)
  // } else {
  //   return state.setIn(['form', 'isValid'], false)
  // }
  
  if (state.form.fields.firstname !== '' &&
        state.form.fields.surname !== '' &&
        state.form.fields.last6nin !== '' &&
        state.form.fields.dob !== '' &&
        state.form.fields.year !== '' &&
        state.form.fields.currentnumber !== '' &&
        !state.form.fields.firstnameHasError &&
        !state.form.fields.surnameHasError &&
        !state.form.fields.last6ninHasError &&
        !state.form.fields.dobHasError &&
        !state.form.fields.registernumberHasError &&
        !state.form.fields.currentnumberHasError &&
        (state.form.fields.firstname !== state.form.originalProfile.firstname ||
         state.form.fields.surname !== state.form.originalProfile.surname ||
         state.form.fields.last6nin !== state.form.originalProfile.last6nin ||
         state.form.fields.dob !== state.form.originalProfile.dob ||
         state.form.fields.year !== state.form.originalProfile.year ||
         state.form.fields.currentnumber !== state.form.originalProfile.currentnumber)
      ){
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }
}

