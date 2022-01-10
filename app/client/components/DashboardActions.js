'use strict'
/*
  Open Rowing Monitor, https://github.com/laberning/openrowingmonitor

  Component that renders the action buttons of the dashboard
*/

import { AppElement, html, css } from './AppElement'
import { customElement, property } from 'lit/decorators.js'
import { icon_undo, icon_expand, icon_compress, icon_poweroff, icon_bluetooth } from '../lib/icons'

@customElement('dashboard-actions')
export class DashboardActions extends AppElement {
  static get styles () {
    return css`
    `
  }

  @property({ type: String })
  peripheralMode = ''

  render () {
    return html`
      <button @click=${this.reset}>${icon_undo}</button>
      <!-- todo: hide in standalone mode -->
      <button @click=${this.toggleFullscreen}>
        <div id="fullscreen-icon">${icon_expand}</div>
        <div id="windowed-icon">${icon_compress}</div>
      </button>
      <button @click=${this.close} id="close-button">${icon_poweroff}</button>
      <button @click=${this.switchPeripheralMode}>${icon_bluetooth}</button>
      <div class="metric-unit">${this.appState.peripheralMode}</div>
     `
  }
  //      <div class="metric-unit">${this.peripheralMode}</div>

  toggleFullscreen () {
    const fullscreenElement = document.getElementsByTagName('web-app')[0]
    if (!document.fullscreenElement) {
      fullscreenElement.requestFullscreen({ navigationUI: 'hide' })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  close () {
    window.close()
  }

  reset () {
    this.sendEvent('triggerAction', { command: 'reset' })
  }

  switchPeripheralMode () {
    // todo: this is just a test property to see if the concept works...
    // this.appState.peripheralMode = 'PM5'
    // this.updateState()
    this.sendEvent('triggerAction', { command: 'switchPeripheralMode' })
  }
}
