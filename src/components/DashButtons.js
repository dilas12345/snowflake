import React from 'react';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

var DashButton = React.createClass ({

    render () {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
                    <View>
                        <Button style={{borderRadius: 6, backgroundColor: '#60977C', height: 120, width: 120, marginLeft: 30, marginRight: 30}} onPress={() => Actions.fullvscard()}><Image style={{height: 100, width: 100, resizeMode: 'contain', marginLeft: 10, marginTop: 10}} source={require("../images/icons/IDcard.png")}/>
                        </Button>
                        <View><Text style={{ alignSelf: 'center', fontFamily: 'Raleway-Regular'}}>Display ID Card</Text></View>
                    </View>

                    <View>
                        <Button style={{borderRadius: 6, backgroundColor: '#60977C', height: 120, width: 120, marginLeft: 30, marginRight: 30}} onPress={() => Actions.permissions()}><Image style={{height: 80, width: 80, resizeMode: 'contain', alignSelf: 'center', marginTop: 20}} source={require("../images/icons/permissions.png")}/>
                        </Button>
                        <View><Text style={{ alignSelf: 'center', fontFamily: 'Raleway-Regular',}}>Permissions</Text></View>
                    </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
                    <View>
                        <Button style={{borderRadius: 6, backgroundColor: '#60977C', height: 120, width: 120, marginLeft: 30, marginRight: 30}} onPress={this._updateStateButtonPress}><Image style={{height: 100, width: 100, resizeMode: 'contain', marginLeft: 10, marginTop: 10}} source={require("../images/icons/NIN.png")}/>
                        </Button>
                    <View><Text style={{alignSelf: 'center', fontFamily: 'Raleway-Regular'}}>Display NIN</Text></View>
                    </View>
                    <View>
                        <Button style={{borderRadius: 6, backgroundColor: '#60977C', height: 120, width: 120, marginLeft: 30, marginRight: 30}} onPress={() => BackHandler.exitApp()}><Image style={{height: 100, width: 100, resizeMode: 'contain', marginLeft: 10, marginTop: 10}} source={require("../images/icons/exit.png")}/>
                        </Button>
                    <View><Text style={{alignSelf: 'center', fontFamily: 'Raleway-Regular'}}>     Exit     </Text></View>
                    </View>
                </View>
            </View>
        )
    }
})

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
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
  
  });
  module.exports = DashButton