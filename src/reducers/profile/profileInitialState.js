/**
 * # profileInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'

const {Record} = require('immutable')

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 *
 * The originalProfile is what the server provided and has the objectId
 * The fields are what display on the UI
 */
const Form = Record({
  // originalProfile: new (Record({
  //   username: null,
  //   email: null,
  //   objectId: null,
  //   emailVerified: null
  // }))(),
  originalProfile: new (Record({
    firstname: null,
    surname: null,
    last6nin: null,
    oldnumber: null,
    currentnumber: null,
    objectId: null,
    currentnumberVerified: null
  }))(),

  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  // fields: new (Record({
  //   username: '',
  //   usernameHasError: false,
  //   usernameErrorMsg: '',
  //   email: '',
  //   emailHasError: false,
  //   emailErrorMsg: '',
  //   emailVerified: false
  // }))()
  fields: new (Record({
    firstname: '',
    firstnameHasError: false,
    firstnameErrorMsg: '',
    surname: '',
    surnameHasError: false,
    surnameErrorMsg: '',
    nin: '',
    ninHasError: false,
    ninErrorMsg: '',
    dob: '',
    dobHasError: false,
    dobErrorMsg: '',
    registernumber: '',
    registernumberHasError: false,
    registernumberErrorMsg: '',
    currentnumber: '',
    currentnumberHasError: false,
    currentnumberErrorMsg: '',
    currentnumberVerified:false

  }))()
})

var InitialState = Record({
  form: new Form()
})

export default InitialState
