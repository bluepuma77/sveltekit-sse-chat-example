import { EventEmitter } from 'events'

/**
 * The PubSub class extends EventEmitter to provide publish-subscribe functionality.
 * It allows clients to subscribe to events and publish messages to those events.
 */
class PubSub extends EventEmitter {
  constructor() {
    super()
    // Increase the maximum number of listeners
    this.setMaxListeners(1000)

    // Bind methods to the instance
    this.subscribe = this.subscribe.bind(this)
    this.publish = this.publish.bind(this)
  }

  /**
   * Subscribes to a specific event with a listener.
   * @param {string} eventName - The name of the event to subscribe to.
   * @param {Function} listener - The callback function to execute when the event is emitted.
   * @returns {Function} A function to unsubscribe the listener from the event.
   */
  subscribe(eventName, listener) {
    this.on(eventName, listener)
    return () => this.off(eventName, listener)
  }

  /**
   * Publishes an event with the given data.
   * @param {string} eventName - The name of the event to emit.
   * @param {*} data - The data to pass to the event listeners.
   */
  publish(eventName, data) {
    this.emit(eventName, data)
  }
}

const pubSubInstance = new PubSub()

export const subscribe = pubSubInstance.subscribe
export const publish = pubSubInstance.publish
