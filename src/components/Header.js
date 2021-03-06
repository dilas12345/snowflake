/**
 * # Header.js
 *
 * This component initially displays a image. But when clicked, things
 * get interesting.
 *
 * On the initial display after being clicked, the
 * textinput will display the current ```state``` of the application.
 *
 * The button will be enabled and if clicked, whatever state is now
 * contained in the textinput will be processed and the application
 * will be restored to that state.
 *
 * By pasting in a previous state, the application will reset to that
 * state
 *
 * When the mark image is clicked, it is just toggled to display or hide.
*/
'use strict'

/**
 * ## Imports
 *
 * React
*/
import React, {PropTypes} from 'react'
import
{
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'

/**
 * Project component that will respond to onPress
 */
const FormButton = require('./FormButton')

/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

// const labels = ["step1"];

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#222',
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#0d6851',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#0d6851',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#222',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#222'
}

var Header = React.createClass({
  
  /**
   * ## Header.class
   * set the initial state of having the button be disabled.
   */
  getInitialState () {
    return {
      text: '',
      isDisabled: true
    }
  },
  /**
   * ### propTypes
   * * isFetching: display the spinner if true
   * * showState: should the JSON state, currentState, be displayed
   * * currentState: the JSON state
   * * onGetState: the action to call to get the current state
   * * onSetState: the action to call to set the state
   */
  propTypes: {
    isFetching: PropTypes.bool,
    showState: PropTypes.bool,
    currentState: PropTypes.object,
    onGetState: PropTypes.func,
    onSetState: PropTypes.func
  },
  /**
   * ### _onPressMark
   * Call the onGetState action passing the state prop
   */
  _onPressMark () {
    this.props.onGetState(!this.props.showState)
  },
  /**
   * ### _onChangeText
   * when the textinput value changes, set the state for that component
   */
  _onChangeText (text) {
    this.setState({
      text,
      isDisabled: false
    })
  },
  /**
   * ### _updateStateButtonPress
   * When the button for the state is pressed, call ```onSetState```
   */
  _updateStateButtonPress () {
    this.props.onSetState(this.state.text)
  },

  /**
   * ### render
   *
   * if showState, stringify the currentState and display it to the
   * browser for copying. Then display to the user.
   *
   * When the value of the input changes, call ```_onChangeText```
   *
   * When the 'Update State' button is pressed, we're off to the
   * races with Hot Loading...just call the
   * ```_updateStateButtonPress``` and away we go...
   *
   */
  // constructor(props) {
  //   super(props);

  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.state = {
  //     currentPage: 0
  //   };
  // },
  render () {
    let displayText
    if (this.props.showState) {
      displayText = JSON.stringify(this.props.currentState)
    }

    return (
      <View>
        <View style={styles.header}>

          <TouchableHighlight onPress={this._onPressMark}>

            <Image style={styles.logotop}
              source={require('../images/proximity.png')}
            />
          
          </TouchableHighlight>
          {this.props.isFetching
           ? <ActivityIndicator animating size='large' />
           : null
          }

        </View>
        {this.props.showState
         ? <View style={styles.container}>
           <Text>{I18n.t('Header.current_state')} ({I18n.t('Header.see_console')})</Text>
           <TextInput style={{height: 100, borderColor: 'gray', borderWidth: 1}}
             value={displayText}
             editable
             multiline
             onChangeText={(text) => this._onChangeText(text)}
             numberOfLines={20} />
           <View style={{
             marginTop: 10
           }}>
             <FormButton isDisabled={this.state.isDisabled}
               onPress={this._updateStateButtonPress}
               buttonText={I18n.t('Header.update_state')} />
           </View>
         </View>
         : null}
      </View>
    )
  }
})

/**
 * ## Styles
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 10
  },
  header: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  logotop: {
    backgroundColor: "transparent",
    marginTop: 3,
    height: 80,
    width: 200,
    resizeMode: 'contain'
  },
  mark: {
    height: 100,
    width: 100
  }

})
module.exports = Header
