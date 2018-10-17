import React, {PropTypes} from 'react'
import
{
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button
} from 'react-native'

// const DashButtons = require('./DashButtons');
//import DashButtons from './DashButtons';

var Dashborad = React.createClass({
  
    /**
     * ## Header.class
     * set the initial state of having the button const DashButton = require('./DashButton');be disabled.
     */
    // getInitialState () {
    //   return {
    //     text: '',
    //     isDisabled: true
    //   }
    // },
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
     * ### _dashStateButtonPress
     * When the button for the state is pressed, call ```onSetState```
     */
    _dashStateButtonPress () {
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
        <View style={styles.container}>
          <View >
              <View  style={{flex: 1, flexDirection: 'row'}}>
                <View><Image style={styles.logotop} source={require("../images/proximity.png")}/></View>
                <View><Image style={styles.logotopNimc} source={require("../images/Nimclogo.png")}/></View>
              </View>
              {/* {this.props.showState} */}
              <Text style={{textAlign: 'center',
              color: '#595959',
              marginTop: -50,
              fontSize: 20,
              fontFamily: 'AvenirLTStd-Roman',}} value={displayText}  
              onChangeText={(text) => this._onChangeText(text)}
              numberOfLines={20}>
                Welcome to your National ID Card
              </Text>
              <Text style={styles.instructions}>
                Dashboard
              </Text>
            {/* {this.props.isFetching
             ? <ActivityIndicator animating size='large' />
             : null
            } */}
            <DashButtons
              onPress={this._dashStateButtonPress}
              buttonText={I18n.t('Dashboard.dash_state')} />
              <Image style={{marginBottom: 10, height: 50, width: 100, resizeMode: 'contain'}} source={require("../images/ibibio.png")}/>
  
          </View>
          {/* {this.props.showState} */}
            <View >
             
             {/* <Text>{I18n.t('Dashboard.current_state')} ({I18n.t('Dashboard.see_console')})</Text> */}
             {/* <TextInput style={{height: 100, borderColor: 'gray', borderWidth: 1}}
               value={displayText}
               editable
               multiline
               onChangeText={(text) => this._onChangeText(text)}
               numberOfLines={20} /> */}
             <View style={{
               marginTop: 2
             }}>
              
               {/* <DashButton isDisabled={this.state.isDisabled}
                 onPress={this._updateStateButtonPress}
                 buttonText={I18n.t('Dashboard.update_state')} /> */}
             </View>
           </View>
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
      marginTop: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    header: {
      marginTop: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    buttonText: {
      color: '#fff'
    },
    instructions: {
      textAlign: 'center',
      color: '#595959',
      marginBottom: 40,
      fontSize: 20,
      fontFamily: 'AvenirLTStd-Roman',
    },
    
    logotop: {
      backgroundColor: "transparent",
      alignSelf: 'center',
      marginTop: 5,
      marginLeft: 75,
      marginRight: 75,
      height: 50,
      width: 100,
      resizeMode: 'contain'
    },
    logotopNimc: {
      backgroundColor: "transparent",
      alignSelf: 'center',
      marginTop: 5,
      marginLeft: 90,
      marginRight: 60,
      height: 50,
      width: 100,
      resizeMode: 'contain'
    },
    mark: {
      height: 100,
      width: 100
    }
  
  })
  module.exports = Dashborad
  