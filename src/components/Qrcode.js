import React, {ProtoType} from 'react';
import { StyleSheet } from 'react-native';

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


var Qrcode = React.creactClass ({
    /**Qrcode getting initials data from the fetch */
    getInitialState () {
        return {
          text: '',
          isDisabled: true
        }
    },

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
    render(){
        let displayText
        if (this.props.showState) {
        displayText = JSON.stringify(this.props.currentState)
        }
        return(
            <View>
                <View>
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
                {this.props.showState ?
                <View>
                <Text>{I18n.t('Qrcode.current_state')} ({I18n.t('Qrcode.see_console')})</Text>
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
                        buttonText={I18n.t('Qrcode.update_state')} />
                        </View>

                        <View>
                            <Text>{firstname}</Text>
                            <Text>{middlename}</Text>
                            <Text></Text>
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
      width: 80,
      resizeMode: 'contain'
    },
    mark: {
      height: 100,
      width: 100
    }
  
  })
  module.exports = Qrcode
  