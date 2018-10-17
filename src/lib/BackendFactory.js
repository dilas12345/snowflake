/**
 * # BackendFactory
 *
 * This class sets up the backend by checking the config.js
 *
 */
'use strict'

import CONFIG from './config'
import {parse} from './Parse'
import {hapi} from './Hapi'
import {proximity} from './Proximity'

export default function BackendFactory (token = null) {
  if (CONFIG.backend.hapiLocal || CONFIG.backend.hapiRemote) {
    hapi.initialize(token)
    return hapi
  } else if (CONFIG.backend.parseLocal || CONFIG.backend.parseRemote) {
    parse.initialize(token)
    return parse
  } else if (CONFIG.backend.proximityLocal || CONFIG.backend.proximityRemote) {
    proximity.initialize(token)
    return proximity
  }
}
