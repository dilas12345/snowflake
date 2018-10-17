/*
 * This component provides an interface for a logged in user to change
 * their username and email.
 * It too is a container so there is boilerplate from Redux similar to
 * ```App``` and ```Login```
 */
'use strict'
/**
* ## Imports
*
* Redux
*/
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */


import { getRepoDetail } from '../reducers/profile/profileActions';
import {getUser} from '../reducers/profile/profileReducer';

/**
 * The ErrorAlert will display any and all errors
 */
import ErrorAlert from '../components/ErrorAlert'
/**
 * The FormButton will respond to the press
 */
import FormButton from '../components/FormButton'
/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'

/**
 * The itemCheckbox will display the state of the email verified
 */
import ItemCheckbox from '../components/ItemCheckbox'
/**
 * The necessary React components
 */
import React, {Component} from 'react'
import
{
  StyleSheet,
  View
}
from 'react-native'



class RepoDetail extends Component {
  static navigationOptions = {
    title: 'RepoDetail'
  };
  componentDidMount() {
    this.props
      .getRepoDetail('relferreira', 'react-native-redux')
  }
  render() {
    const { repoInfo, loadingInfo } = this.props;
    if (loadingInfo) return <Text>Loading...</Text>;

    const {
      name,
      full_name,
      description,
      forks_count,
      stargazers_count
    } = repoInfo;

    return (
      <View>
        <Text>{name}</Text>
        <Text>{full_name}</Text>
        <Text>{description}</Text>
        <Text>Forks: {forks_count}</Text>
        <Text>Stars: {stargazers_count}</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ repoInfo, loadingInfo }) => ({
  repoInfo,
  loadingInfo
});

const mapDispatchToProps = {
  getRepoDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(RepoDetail);