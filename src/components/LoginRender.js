/**
 * # Login.js
 *
 * This class is a little complicated as it handles multiple states.
 *
 */
'use strict'
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'

/**
 * Router actions
 */
import { Actions } from 'react-native-router-flux'

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'
/**
 * The ErrorAlert displays an alert for both ios & android
 */
import ErrorAlert from '../components/ErrorAlert'
/**
 * The FormButton will change it's text between the 4 states as necessary
 */
import FormButton from '../components/FormButton'
/**
 *  The LoginForm does the heavy lifting of displaying the fields for
 * textinput and displays the error messages
 */
import LoginForm from '../components/LoginForm'
/**
 * The itemCheckbox will toggle the display of the password fields
 */
import ItemCheckbox from '../components/ItemCheckbox'

/**
 * The necessary React components
 */
import React, {Component} from 'react'
import
{
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View
}
from 'react-native'

import Dimensions from 'Dimensions'
var {height, width} = Dimensions.get('window') // Screen dimensions in current orientation

/**
 * The states were interested in
 */
const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  BACK
} = require('../lib/constants').default

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  submit:{
        marginTop: 0,
        paddingTop: 5,
        paddingBottom:15,
        marginLeft:40,
        marginRight:40,
        width: 100,
        height: 40,
        backgroundColor:'#2B2B26',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
    
  submitText:{
      color:'#fff',
      textAlign:'center',
      fontSize: 20,
  },
  buttonText: {
    color: '#fff'
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
})
/**
 * ## Redux boilerplate
 */

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
import Backend from '../lib/Backend';
I18n.translations = Translations

class LoginRender extends Component {
  constructor (props) {
    super(props)
    //console.error(this.errorAlert);
    this.errorAlert = new ErrorAlert()
    this.state = {
      // value: {
      //   username: this.props.auth.form.fields.username,
      //   email: this.props.auth.form.fields.email,
      //   password: this.props.auth.form.fields.password,
      //   passwordAgain: this.props.auth.form.fields.passwordAgain
      // }
      value: {
        firstname: this.props.auth.form.fields.firstname,
        surname: this.props.auth.form.fields.surname,
        last6nin: this.props.auth.form.fields.last6nin,
        year: this.props.auth.form.fields.year,
        currentnumber: this.props.auth.form.fields.currentnumber,
        password: this.props.auth.form.fields.password,
        passwordAgain: this.props.auth.form.fields.passwordAgain

      }
    }
  }

  /**
   * ### componentWillReceiveProps
   * As the properties are validated they will be set here.
   */
  componentWillReceiveProps (nextprops) {
    this.setState({
      // value: {
      //   username: nextprops.auth.form.fields.username,
      //   email: nextprops.auth.form.fields.email,
      //   password: nextprops.auth.form.fields.password,
      //   passwordAgain: nextprops.auth.form.fields.passwordAgain
      // }
      value: {
        firstname: nextprops.auth.form.fields.firstname,
        surname: nextprops.auth.form.fields.surname,
        last6nin: nextprops.auth.form.fields.last6nin,
        year: nextprops.auth.form.fields.year,
        currentnumber: nextprops.auth.form.fields.currentnumber,
        password: nextprops.auth.form.fields.password,
        passwordAgain: nextprops.auth.form.fields.passwordAgain
      }
    })
  }

  /**
   * ### onChange
   *
   * As the user enters keys, this is called for each key stroke.
   * Rather then publish the rules for each of the fields, I find it
   * better to display the rules required as long as the field doesn't
   * meet the requirements.
   * *Note* that the fields are validated by the authReducer
   */
  // onChange (value) {
  //   if (value.username !== '') {
  //     this.props.actions.onAuthFormFieldChange('username', value.username)
  //   }
  //   if (value.email !== '') {
  //     this.props.actions.onAuthFormFieldChange('email', value.email)
  //   }
  //   if (value.password !== '') {
  //     this.props.actions.onAuthFormFieldChange('password', value.password)
  //   }
  //   if (value.passwordAgain !== '') {
  //     this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain)
  //   }
  //   this.setState(
  //     {value}
  //   )
  // }
  onChange (value) {
    if (value.firstname !== '') {
      this.props.actions.onAuthFormFieldChange('firstname', value.firstname)
    }
    if (value.surname !== '') {
      this.props.actions.onAuthFormFieldChange('surname', value.surname)
    }
    if (value.last6nin !== '') {
      this.props.actions.onAuthFormFieldChange('last6nin', value.last6nin)
    }
    if (value.year !== '') {
      this.props.actions.onAuthFormFieldChange('year', value.year)
    }
    if (value.currentnumber !== '') {
      this.props.actions.onAuthFormFieldChange('currentnumber', value.currentnumber)
    }
    if (value.password !== '') {
        this.props.actions.onAuthFormFieldChange('password', value.password)
      }
    if (value.passwordAgain !== '') {
        this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain)
      }
    this.setState(
      {value}
    )
  }
  /**
  *  Get the appropriate message for the current action
  *  @param messageType FORGOT_PASSWORD, or LOGIN, or REGISTER
  *  @param actions the action for the message type
  */
  getMessage (messageType, actions) {
    let forgotPassword =
      <TouchableHighlight
        onPress={() => {
          actions.forgotPasswordState()
          Actions.ForgotPassword()
        }} >
        <Text>{I18n.t('LoginRender.forgot_password')}</Text>
      </TouchableHighlight>

    let alreadyHaveAccount =
      <TouchableHighlight
        onPress={() => {
          actions.loginState()
          Actions.Login()
        }} >
        <Text>{I18n.t('LoginRender.already_have_account')}</Text>
      </TouchableHighlight>

    let register =
      // <TouchableHighlight
      //   onPress={() => {
      //     actions.registerState()
      //     Actions.Register()
      //   }} >
      //   <Text>{I18n.t('LoginRender.register')}</Text>
      // </TouchableHighlight>

      <View style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', height: 70, shadowOffset: {height: 0, width: 0}, shadowOpacity: 0, elevation: 0}}>
        <View style={{margin: 5, backgroundColor: 'transparent',}}>
          <TouchableHighlight style={styles.submit}>
            <Text style={styles.submitText}>Quit</Text>
          </TouchableHighlight>
        </View>
        <View style={{margin: 5, backgroundColor: 'transparent',}}>
        <TouchableHighlight style={styles.submit} onPress={() => {
              actions.registerState()
              Actions.Next()
          }} >
        <Text>{I18n.t('LoginRender.register')}</Text>>
          <Text style={styles.submitText}>Next</Text>
        </TouchableHighlight>
        </View>
      </View>


    switch (messageType) {
      case FORGOT_PASSWORD:
        return forgotPassword
      case LOGIN:
        return alreadyHaveAccount
      case REGISTER:
        return register
      // case BACK:
      //   return back
    }
  }

  /**
   * ### render
   * Setup some default presentations and render
   */
  render () {
    var formType = this.props.formType
    var loginButtonText = this.props.loginButtonText
    var onButtonPress = this.props.onButtonPress
    var displayPasswordCheckbox = this.props.displayPasswordCheckbox
    var leftMessageType = this.props.leftMessageType
    var rightMessageType = this.props.rightMessageType

    var passwordCheckbox = <Text />
    let leftMessage = this.getMessage(leftMessageType, this.props.actions)
    let rightMessage = this.getMessage(rightMessageType, this.props.actions)

    let self = this

    // display the login / register / change password screens
    this.errorAlert.checkError(this.props.auth.form.error)

    /**
     * Toggle the display of the Password and PasswordAgain fields
     */
    if (displayPasswordCheckbox) {
      passwordCheckbox =
        <ItemCheckbox
          text={I18n.t('LoginRender.show_password')}
          disabled={this.props.auth.form.isFetching}
          onCheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', true)
          }}
          onUncheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', false)
          }}
      />
    }

    /**
     * The LoginForm is now defined with the required fields.  Just
     * surround it with the Header and the navigation messages
     * Note how the button too is disabled if we're fetching. The
     * header props are mostly for support of Hot reloading.
     * See the docs for Header for more info.
     */

    return (
      <View style={styles.container}>
        <ScrollView horizontal={false} width={width} height={height}>
          <View>
            <Header isFetching={this.props.auth.form.isFetching}
              showState={this.props.global.showState}
              currentState={this.props.global.currentState}
              onGetState={this.props.actions.getState}
              onSetState={this.props.actions.setState} />

            <View style={styles.inputs}>
              <LoginForm
                formType={formType}
                form={this.props.auth.form}
                value={this.state.value}
                onChange={self.onChange.bind(self)} />
              {/* {passwordCheckbox} */}
            </View>

            <FormButton
              isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
              onPress={onButtonPress}
              buttonText={loginButtonText}
               />
            {/* <FormButton 
              onPress={onButtonPress}
              backButtonText={backButtonText}/> */}

            <View >
              <View style={styles.forgotContainer}>
                {leftMessage}
                {rightMessage}
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    )
  }
}
export default connect(null, mapDispatchToProps)(LoginRender)
