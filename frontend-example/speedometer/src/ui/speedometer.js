import React, { Component } from 'react';

export default ({name, speed}) => {

    return (
        <div>
            <h1>{name}</h1>
            <h2>{speed}</h2>
        </div>
    )
}