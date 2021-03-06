/**
 * # Backend.js
 *
 * Abstract Base class for Backend support
 *
 */
'use strict'
/**
 * ## Async support
 *
 */
require('regenerator-runtime/runtime')

export default class Backend {
  /**
   * ### signup
   *
   * @param data object
   *
   * {firstname: "che", surname: "Yusuph", last6nin: "123456!", oldnumber: "07089068401", currentnumber: "07089068401"}
   *
   * @return
   * if ok, {createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA",
   *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  signup (data) {

  }
 /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {firstname: "che", surname: "Yusuph", last6nin: "123456!", oldnumber: "07089068401", currentnumber: "07089068401"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * firstname: "che"
   * surname: "Yusuph"
   * registered: "07089068401"
   * currentnumber: "07089068401"
   * objectId: "Z4yvP19OeL"
   * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * las6nin: "123456"
   *
   */
  login (data) {

  }
  /**
   * ### logout
   * prepare the request and call _fetch
   */
  logout () {

  }
  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   *
   * @param data
   * {firstname: "che"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  resetPassword (data) {

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
   *  firstname: "che"
   *  surname: "Yusuph"
   *  registered: "07089068401"
   *  currentnumber: "07089068401"
   *  objectId: "Z4yvP19OeL"
   *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
   *  updatedAt: "2015-12-30T15:29:36.611Z"
   *  las6nin: "123456"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  getProfile () {
  }
  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId
   * @param data object:
   * {firstname: "che", surname: "Yusuph", last6nin: "123456!", oldnumber: "07089068401", currentnumber: "07089068401"}
   */
  updateProfile (userId, data) {
  }

}

