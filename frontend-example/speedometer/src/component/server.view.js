import React, { Component } from 'react'
import { attachModelToView } from 'rhelena'
import ServerModel from './server.model'

import Speedometer from '../ui/speedometer'
import './server.view.css'

export default class Server extends Component {

    componentWillMount() {
        attachModelToView(new ServerModel(this.props.name, this.props.host, this.props.onWakeup), this)
    }

    render() {
        return (
            <div>
                <Speedometer {...this.state} />
            </div>
        )
    }
}
