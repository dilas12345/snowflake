/**
 * # Subview.js
 *
 *  This is called from main to demonstrate the back button
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

/**
 * Navigation Bar
 */
import NavigationBar from 'react-native-navbar'

/**
 * The necessary components from React
 */
import React from 'react'
import
{
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,

}
from 'react-native'

/**
 * Use device options so we can reference the Version
 *
 */
import * as deviceActions from '../reducers/device/deviceActions';

// import QRCode from 'react-native-qrcode';
import QRCode from 'react-native-qrcode'; 

/**
* ## Redux boilerplate
*/

/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version
  }
}

/*
 * Bind all the actions in deviceActions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
  }
}


/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

// const PATH_TO_LOGO = '../images/ibibio.png'


/**
 * ## Subview class
 */
let Subview = React.createClass({
  
  /** Getbase64 encode of the qrode (without logo) */
  getDataURL() {
    this.state.toDataURL(this.callback);
  },
  // handlePress = () => {
  //   this.qrcode.toDataURL(this.callback)
  // },
  callback(dataURL) {
    consol.error(dataURL);
  },
  

  render () {
    var titleConfig = {
      title: I18n.t('Subview.subview')
    }

    var leftButtonConfig = {
      title: I18n.t('Subview.back'),
      handler: Actions.pop
    }

    return (
      <View>
        {/* <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig} /> */}
          
          
        <View style={styles.container}>
            {/* <Image style={styles.backgroundImage}
              source={require('../images/proximity.png')}
            /> */}

          <Text style={styles.summary}>{I18n.t('Subview.subview')} {I18n.t('App.version')}: {this.props.deviceVersion}
          
          </Text>
          <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', paddingTop: 10}}>
            <View style={{width: 175, height: 200, backgroundColor: 'transparent'}}><Image style={{width: 120, height: 160, alignSelf: 'center', marginTop: 15, backgroundColor: 'transparent'}} source={require("../images/passport.png")}/></View>
          <View style={styles.QRCode}>
            {/* <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({text: text})}
              value={this.state.text}
            /> */}
          <QRCode
            value={'http://facebook.com'}
            size={150}
            bgColor='black'
            fgColor='white'/>
          </View>
          </View>
        </View>
      </View>
    )
  }
})

//Styles for Subview
const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },

// viewContainer:{
//     flex: 1,
//     backgroundColor: 'transparent',

// },
// date: {
//     fontFamily: 'OCR-B-Digits',
//     fontSize: 15,
//     textAlign: 'center',
// },
// viewStyleOne: {
//     width: 300,
//     height: 90,
//     marginLeft: 25,
//     marginTop: 40,
//     alignItems: 'flex-start',
//     backgroundColor: 'transparent'
// },
// viewStyleTwo: {
//     width: 60,
//     height: 28,
//     marginLeft: 25,
//     marginTop: 1,
//     alignItems: 'flex-start',
//     backgroundColor: 'transparent'
// },
// viewStyleThree: {
//     width: 60,
//     height: 28,
//     marginLeft: 25,
//     marginTop: -30,
//     alignItems: 'flex-start',
//     backgroundColor: 'transparent'
// },
// viewStyleFour: {
//     width: 100,
//     height: 40,
//     marginLeft: 95,
//     marginTop: -29,
//     alignItems: 'flex-start',
//     backgroundColor: 'transparent'
// },
// viewStylePassportphoto: {
//     width: 90,
//     height: 90,
//     marginLeft: 150,
//     marginTop: 40,
//     alignItems: 'flex-start',
//     backgroundColor: 'red'
// },
// textStylePlaceholderID: {
//     textAlign: 'left',
//     color: '#222222',
//     fontSize: 9,
//     marginTop: 4,
// },
// textStyleID: {
//     textAlign: 'left',
//     fontSize: 10,
// },
// textStylePlaceholder: {
//     textAlign: 'left',
//     color: '#222222',
//     fontSize: 9,
//     marginTop: 4,
// },
// textStyle: {
//     textAlign: 'left',
//     fontSize: 10,
// },
// textStyleDoc: {
//     textAlign: 'left',
//     fontSize: 13,
//     fontWeight: 'bold'
// },
backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
},

// text: {
//     paddingLeft: 10,
//     flex: 1,
// },
// surname: {
//     textAlign: 'left',
//     backgroundColor: 'transparent',
//     color: 'black',
//     marginTop: 20,
// },
// instructions: {
//     fontSize: 10,
//     margin: 20,
//     marginTop: 0,
//     textAlign: 'left',
//     color: '#595959',
//     fontWeight: 'bold',
//     fontFamily: 'sans-serif-light',
// },

// imgBackground: {
//     width: '20%',
//     height: '20%',
//     flex: 1
// },
// page: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
// },
// paragraph: {
//     margin: 20,
//     marginTop: 8,
//     fontSize: 13,
//     textAlign: 'center',
//     color: '#24882b',
//     fontFamily: 'sans-serif',
//     fontWeight: 'bold',
// },
// netedText: {
//     marginLeft: 20,
//     marginTop: 20,
//     backgroundColor: 'transparent',
//     color: 'black',
// },
// paragraphwarning: {
//     margin: 20,
//     marginTop: 3,
//     fontSize: 13,
//     textAlign: 'center',
//     color: '#fb0000',
//     fontFamily: 'sans-serif',
//     fontWeight: 'bold',
// },
// card: {
//     backgroundColor: "transparent",
//     height: 229,
//     width: null,
//     flex: 1,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#fff',
//     margin: 10,
// },

// passport: {
//   height: 80,
//   width: 80,
//   paddingTop: 40,
//   paddingBottom: 0,
//   marginLeft: 190,
//   marginRight: 0,
//   marginTop: 8,
//   opacity: 90
// },
QRCode: {
    margin: 10,
    padding: 5,
    marginTop: 15,
},

// pad: {
//     height: 400,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     width: 300,
//     borderRadius: 3,
//     alignItems: 'center',
// },
// input: {
//     height: 40,
//     width: 100,
//     borderColor: 'gray',
//     borderWidth: 1,
//     margin: 10,
//     marginTop: 0.2,
//     borderRadius: 5,
//     padding: 5,
// },
// welcome: {
//     fontSize: 10,
// },
})

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Subview)
