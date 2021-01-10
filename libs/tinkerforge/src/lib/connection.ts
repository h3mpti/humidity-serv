import * as tf from 'tinkerforge'
import { ConnectionState } from '../models/connection-state'
import { Bricklets } from '../models/bricklets'

export class Connection {
  private host: string
  private port: number
  private _connectionState = ConnectionState.disconnected

  constructor(host: string, port: number) {
    this.host = host
    this.port = port
  }

  private _connection: any

  get connection(): any {
    return this._connection
  }

  public connect() {
    this._connection = new tf.IPConnection() // Create IP connection
    console.log('connecting to device', { host: this.host, port: this.port })
    this._connection.connect(this.host, this.port, (error: number) =>
      console.error(error)
    ) // Connect to brickd

    // Register Connected Callback
    this._connection.on(
      tf.IPConnection.CALLBACK_CONNECTED,
      (connectReason: number) => {
        console.log(
          `connection established (Reason: ${
            connectReason === tf.IPConnection.CONNECT_REASON_REQUEST
              ? 'REQUEST'
              : 'AUTO_REQUEST'
          })`
        )
        this._connectionState = ConnectionState.connected
        this._connection.enumerate()
      }
    )
    this._connection.on(
      tf.IPConnection.CALLBACK_DISCONNECTED,
      (disconnectReason: number) => {
        // console.log(`connection established (Reason: ${connectReason === tf.IPConnection.CONNECT_REASON_REQUEST ? 'REQUEST' : 'AUTO_REQUEST'})`)
        this._connectionState = ConnectionState.disconnected
      }
    )
    const brickletIdentifiers = Object.values(Bricklets).filter(
      (x): x is number => typeof x === 'number'
    )

    // Register Enumerate Callback
    this._connection.on(
      tf.IPConnection.CALLBACK_ENUMERATE,
      // Print incoming enumeration
      (
        uid: string,
        connectedUid: string,
        position: string,
        hardwareVersion: string,
        firmwareVersion: string,
        deviceIdentifier: number,
        enumerationType: number
      ) => {
        if (!brickletIdentifiers.includes(deviceIdentifier)) {
          console.log('found nothing for device identifier', deviceIdentifier)
        } else {
          console.log('UID:               ' + uid)
          console.log('Enumeration Type:  ' + enumerationType)

          if (
            enumerationType === tf.IPConnection.ENUMERATION_TYPE_DISCONNECTED
          ) {
            console.log('')
            return
          }

          console.log('Connected UID:     ' + connectedUid)
          console.log('Position:          ' + position)
          console.log('Hardware Version:  ' + hardwareVersion)
          console.log('Firmware Version:  ' + firmwareVersion)
          console.log('Device Identifier: ' + deviceIdentifier)
          console.log('Bricklet Type:     ' + Bricklets[deviceIdentifier])

          console.log('')
        }
      }
    )
  }

  public disconnect() {
    this._connection.disconnect()
  }

  private getConnectReason(connectReason: number): string {
    let reason = ''
    switch (connectReason) {
      case tf.IPConnection.CONNECT_REASON_REQUEST:
        reason = 'REQUEST'
        break
      case tf.IPConnection.CONNECT_REASON_AUTO_RECONNECT:
        reason = 'AUTO RECONNECT'
        break
      default:
        reason = 'UNKNOWN'
        break
    }

    return `${reason} - Code ${connectReason}`
  }
}
