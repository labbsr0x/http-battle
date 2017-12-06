import React, { Component } from 'react'
import { attachModelToView } from 'rhelena'
import ServerModel from './server.model'

import Speedometer from '../ui/speedometer'

export default class Server extends Component {

    componentWillMount() {
        attachModelToView(new ServerModel(this.props.name, this.props.host), this)
    }

    render() {
        return (
            <div>
                <Speedometer name={this.state.name} speed={this.state.speed} />
            </div>
        )
    }
}