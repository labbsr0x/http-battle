import React, { Component } from 'react';
import './speedometer.css'

export default ({name, speed, active, delay}) => {
    delay = (delay) + "ms"
    return (
        <div className="speedometer">
            <h1>{name}</h1>
            <h2 style={{color: active ? 'green' : "red"}}>{speed}</h2>
            { !active &&
            <div>
              <div className="clock" style={{animationDuration: delay}}></div> Wait {delay}
            </div>
            }
        </div>
    )
}
