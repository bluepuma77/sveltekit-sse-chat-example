import { EventEmitter } from 'events'

// Create an event emitter instance
const eventEmitter = new EventEmitter()
eventEmitter.setMaxListeners(1000)

/**
 * Publish an event
 * @param {string} eventName
 * @param {any} data
 */
export function publish(eventName, data) {
  console.log('publish', eventName, data)
  eventEmitter.emit(eventName, data)
}

// Subscribe to an event
/**
 *
 * @param {string} eventName
 * @param {Function} callback
 */
export function subscribe(eventName, callback) {
  console.log('subscribe', eventName)
  eventEmitter.on(eventName, callback)
}
