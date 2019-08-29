import React from 'react'

type HandleUnavailableState = {
    errored: boolean
}

export class HandleUnavailable extends React.Component<{}, HandleUnavailableState> {
    state = {
        errored: false
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo){
        this.setState({ errored: true })
    }

    render(){
        return this.state.errored
            ? <div style={{color: 'red'}}>
                <h3>Sorry! Service is unavailable</h3>
            </div>
            : this.props.children
    }
}