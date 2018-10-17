/**
 * # Proximity.js
 *
 * This class interfaces with proximity using the rest api
 * see [https://vsc.ibib.io:7071/prov?r=p&f=FIRSTNAME&s=SURNAME&o=oldnumber&m=DEVICEMOBILENUMBER&n=LAST6NIN](https://vsc.ibib.io:7071/prov?r=p&f=FIRSTNAME&s=SURNAME&o=oldnumber&m=DEVICEMOBILENUMBER&n=LAST6NIN)
 *
 */
'use strict'

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import {AsyncStorage} from 'react-native';
import CONFIG from './config';
import _ from 'underscore';
import Backend from './Backend';

export class Proximity extends Backend {
  /**
   * ## Prioximity.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  initialize (token) {
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw new Error('TokenMissing')
    }
    this._sessionToken =
      _.isNull(token) ? null : token.sessionToken.sessionToken

    this.API_BASE_URL = CONFIG.backend.proximityLocal
          ? CONFIG.PROXIMITY.local.url
          : CONFIG.PROXIMITY.remote.url
  }
  /**
   * ### signup
   *
   * @param data object
   *
   * {firstname: "che", surname: "Yusuph", last6nin: "123456!", year: "1989", currentnumber: "07089068401"}
   *
   * @return
   * if ok, res.json={createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA",
   *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async signup (data) {
    return await this._fetch({
      method: 'POST',
      url: `https://vsc.ibib.io:7071/prov?r=p&f=${data.firstname}&s=${data.surname}&y=${data.year}&n=${data.last6nin}&m=${data.currentnumber}&k=${this.password}`,
      body: data
    })
      // .then((res) => {
      //   if (res.status === 200 || res.status === 201) {
      //     return res.json
      //   } else {
      //     throw res.json
      //   }
      // })
      .then((response) => {
        console.error({response})
        return response.json();
        // this.props.navigator.pop("ProtectedView");
      })
      .then((response) => {
        // if(response.status !== 200 || res.status === 201){
        //   console.error(response);
        //   throw new Error("Unable to create an account");
        // }
        AsyncStorage.setItem('landen', JSON.stringify(response.data));
              this.setState({
                landen: response.data,
                loading: false,
              });
        alert('Congratulation!!! now you are active.');
        // Redirect to home screen
        // this.props.navigator.pop("ProtectedView");
        // this.props.naviagate("Home");
      })
      .then((responseData) => {
        result = JSON.stringify(responseData)
      })
      .catch((error) => {
        throw (error)
      }) 
      .done()
  }
  
  
  /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {username: "YusuphChe", password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * objectId: "Z4yvP19OeL"
   * email: "barton@foo.com"
   * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * username: "barton"
   *
   */
  async login (data) {
    return await this._fetch({
      method: 'POST',
      url: 'https://vsc.ibib.io:7071/prov?r=p&f=FIRSTNAME&s=SURNAME&o=oldnumber&m=DEVICEMOBILENUMBER&n=LAST6NIN',
      body: data
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### logout
   * prepare the request and call _fetch
   */
  async logout () {
    return await this._fetch({
      method: 'POST',
      url: '/account/logout',
      body: {}
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201) ||
            (res.status === 400 && res.code === 209)) {
          return {}
        } else {
          throw new Error({code: res.statusCode, error: res.message})
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   *
   * @param datareset
   * {email: "barton@foo.com"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async resetPassword (data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/resetPasswordRequest',
      body: data
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return {}
        } else {
          var res = JSON.parse(response._bodyInit)
          throw (res)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * if good:
   * {createdAt: "2015-12-30T15:29:36.611Z"
   *  email: "barton@acclivyx.com"
   *  objectId: "Z4yvP19OeL"
   *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
   *  updatedAt: "2015-12-30T15:29:36.611Z"
   *  username: "barton"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async getProfile () {
    return await this._fetch({
      method: 'GET',
      url: `https://vsc.ibib.io:7071/prov?r=p`
    })
      .then((response) => {
        if ((res.status === 200 || res.status === 201)) {
          console.error({response})
          return response.json
        } else {
          throw (response.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId  _id
   * @param data object:
   * {firstname: "che", surname: "Yusuph", last6nin: "123456!", oldnumber: "07089068401", currentnumber: "07089068401"}
   */
  async updateProfile (userId, data) {
    return await this._fetch({
      method: 'POST',
      url: `https://vsc.ibib.io:7071/prov?r=p` + userId,
      body: data
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return {}
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### _fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  {code: response.code,
   *   status: response.status,
   *   json: response.json()
   */
  async _fetch (opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts)

    var reqOpts = {
      method: opts.method,
      headers: {
      }
    }

    if (this._sessionToken) {
      reqOpts.headers['Authorization'] = 'Bearer ' + this._sessionToken
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json'
      reqOpts.headers['Content-Type'] = 'application/json'
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body)
    }

    let url = this.API_BASE_URL + opts.url
    let res = {}

    let response = await fetch(url, reqOpts)
    res.status = response.status
    res.code = response.code

    return response.json()
      .then((json) => {
        res.json = json
        return res
      })
  }
}
// The singleton variable
export let proximity = new Proximity()
