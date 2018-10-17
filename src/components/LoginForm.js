/**
 * # LoginForm.js
 *
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
 */
'use strict'
/**
 * ## Import
 *
 * React
 */
import React, {PropTypes} from 'react'

/**
 * States of login display
 */
const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../lib/constants').default

/**
 *  The fantastic little form library
 */
const t = require('tcomb-form-native')
let Form = t.form.Form

/**
 * ### Translations
 */
// var I18n = require('react-native-i18n')
import I18n from 'react-native-i18n';
import Translations from '../lib/Translations'
I18n.translations = Translations

var LoginForm = React.createClass({
  /**
   * ## LoginForm class
   *
   * * form: the properties to set into the UI form
   * * value: the values to set in the input fields
   * * onChange: function to call when user enters text
   */
  propTypes: {
    formType: PropTypes.string,
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
  },

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   *
   */
  render () {
    let formType = this.props.formType

    let options = {
      fields: {
      }
    }

    let firstname = {
      label: ('Firstname'),
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.firstnameHasError,
      error: this.props.form.fields.firstnameErrorMsg
    }
    let surname = {
      label: ('Surname'),
      maxLength: 14,
      editalbe: !this.props.form.isFetching,
      hasError: this.props.form.fields.surnameHasError,
      error: this.props.form.fields.surnameErrorMsg,
    }

    let last6nin = {
      label: ('Last 6 Digit of NIN'),
      keyboardType: 'phone-pad',
      maxLength: 6,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.last6ninHasError,
      error: this.props.form.fields.last6ninErrorMsg
    }

    let year = {
      label: ('Year'),
      keyboardType: 'phone-pad',
      maxLength: 4,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.yearHasError,
      error: this.props.form.fields.yearErrorMsg
    }

    let currentnumber = {
      label: ('Current Number'),
      keyboardType: 'phone-pad',
      maxLength: 11,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.currentnumberHasError,
      error: this.props.form.fields.currentnumberErrorMsg
    }

    let secureTextEntry = !this.props.form.fields.showPassword

    let password = {
      label: I18n.t('LoginForm.password'),
      maxLength: 12,
      secureTextEntry: secureTextEntry,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordHasError,
      error: this.props.form.fields.passwordErrorMsg
    }

    let passwordAgain = {
      label: I18n.t('LoginForm.password_again'),
      secureTextEntry: secureTextEntry,
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordAgainHasError,
      error: this.props.form.fields.passwordAgainErrorMsg
    }

    let loginForm
    switch (formType) {
      /**
       * ### Registration
       * The registration form has 4 fields could be more cause of extension
       */
      case (REGISTER):
        // loginForm = t.struct({
        //   username: t.String,
        //   email: t.String,
        //   password: t.String,
        //   passwordAgain: t.String
        // })
        loginForm = t.struct({
          firstname: t.String,
          surname: t.String,
          last6nin: t.String,
          year: t.String,
          currentnumber: t.String,
          password: t.String,
          passwordAgain: t.String
        })
        // options.fields['username'] = username
        // options.fields['username'].placeholder = I18n.t('LoginForm.username')
        // options.fields['username'].autoCapitalize = 'none'
        // options.fields['email'] = email
        // options.fields['email'].placeholder = I18n.t('LoginForm.email')
        // options.fields['email'].autoCapitalize = 'none'
        // options.fields['password'] = password
        // options.fields['password'].placeholder = I18n.t('LoginForm.password')
        // options.fields['passwordAgain'] = passwordAgain
        // options.fields['passwordAgain'].placeholder = I18n.t('LoginForm.password_again')
        options.fields['firstname'] = firstname
        options.fields['firstname'].placeholder = ('Firstname')
        options.fields['firstname'].autoCapitalize = 'words'
        options.fields['surname'] = surname
        options.fields['surname'].placeholder = ('Surname')
        options.fields['surname'].autoCapitalize = 'words'
        options.fields['last6nin'] = last6nin
        options.fields['last6nin'].placeholder = ('Last 6 digit of NIN')
        options.fields['year'] = year
        options.fields['year'].placeholder = ('Year')
        options.fields['currentnumber'] = currentnumber
        options.fields['currentnumber'].placeholder = ('Current Number')
         options.fields['password'] = password
        options.fields['password'].placeholder = ('Password')
        options.fields['passwordAgain'] = passwordAgain
        options.fields['passwordAgain'].placeholder = ('Password Again')
        break

      /**
       * ### Login
       * The login form has only 2 fields
       */
      case (LOGIN):
        loginForm = t.struct({
          username: t.String,
          password: t.String
        })
        options.fields['username'] = username
        options.fields['username'].placeholder = I18n.t('LoginForm.username')
        options.fields['username'].autoCapitalize = 'none'
        options.fields['password'] = password
        options.fields['password'].placeholder = I18n.t('LoginForm.password')
        break

      /**
       * ### Reset password
       * The password reset form has only 1 field
       */
      case (FORGOT_PASSWORD):
        loginForm = t.struct({
          email: t.String
        })
        options.fields['currentnumber'] = currentnumber
        options.fields['currentnumber'].autoCapitalize = 'none'
        options.fields['currentnumber'].placeholder = I18n.t('LoginForm.currentnumber')
        break
    } // switch

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref='form'
        type={loginForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
      />

    )
  }
})

module.exports = LoginForm
