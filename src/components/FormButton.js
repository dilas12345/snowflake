/**
 * # FormButton.js
 *
 * Display a button that responds to onPress and is colored appropriately
 */
'use strict'
/**
 * ## Imports
 *
 * React
 */
import React from 'react'
import
{
  StyleSheet,
  View,
  Text
} from 'react-native'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  signin: {
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    height: 40,
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
    borderColor: '#ffffff'
  },

  submitText:{
      color:'#ffffff',
      textAlign:'center',
      fontSize: 20,
  },
  button: {
    backgroundColor: '#222222',
    borderColor: '#ffffff',
    width: 100,
    height: 40,
  },
  buttonText: {
    color: '#f0f'
  },
  back: {
    marginLeft: 10,
    marginRight: 10
  },
  backbutton: {
    backgroundColor: '#a2a2a2',
    borderColor: '#a2a2a2'
  }

})

var FormButton = React.createClass({
  /**
   * ### render
   *
   * Display the Button
   */
  render () {
    return (
      <View style={{flexDirection: 'row', backgroundColor: 'transparent', justifyContent: 'center', height: 70, shadowOffset: {height: 0, width: 0}, shadowOpacity: 0, elevation: 0}}>
        <View style={{margin: 5, backgroundColor: 'transparent',}}>
          <Button style={styles.submit}
            textstyle={{fontSize: 20, color: '#f0f'}}
            >
            <Text>Quit</Text>
          </Button>
        </View>
        <View style={{margin: 5, backgroundColor: 'transparent',}}>
          <Button style={styles.submit}
            textstyle={{fontSize: 20, color: '#ffffff'}}
            onPress={this.props.onPress} >
            {this.props.buttonText}
          </Button>
        </View>
      </View>
    )
  }
})

module.exports = FormButton
