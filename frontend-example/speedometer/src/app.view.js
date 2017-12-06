import React, { Component } from 'react'
import { attachModelToView } from 'rhelena'
import AppModel from './app.model'
import Server from './component/server.view'

export default class App extends Component {

  componentWillMount() {
    attachModelToView(new AppModel(), this)
  }

  render() {
    const servers = this.state.servers.map(server => { return <Server name={server.name} host={server.host} /> } )
    return (
      <div>
        { servers }
      </div>
    )
  }
}