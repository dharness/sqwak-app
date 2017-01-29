import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from './../../shared/Nav';
import Warning from './../../shared/Warning';
import SubNav from './SubNav';
import Sidebar from './sidebar/Sidebar';
import {getFeatures, fetchApp} from './../../../services/api';


class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    testApi() {
        getFeatures().then(res => {
            this.setState({message: res.data})
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillMount() {
        const currentAppId = this.props.params.appId;
        const currentApp = this.props.userApps.find(app => app.id === currentAppId);
        if (!currentApp) {
            fetchApp(currentAppId).then(userApp => {
                this.props.addApp(userApp);
            });
        }
    }


    render () {
        return (
            <div className="sq-full-page">
                <Warning/>
                <Nav></Nav>
                <div className="sq-dashboard--content">
                    <Sidebar></Sidebar>
                    <div className="sq-dashboard--workspace">
                        <SubNav/>
                        <h1>{this.props.currentApp.appName}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const currentAppId = ownProps.params.appId;
    let currentApp = state.userApps.find(app => app.id === currentAppId);
    if (!currentApp) {
        currentApp = {appName: "loading..."}
    }
    return {
        userApps: state.userApps,
        currentApp
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addApp(userApp) {
        dispatch({
            type: 'ADD_APP',
            appName: userApp.appName,
            id: userApp._id
        })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage)