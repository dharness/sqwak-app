import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from './../../shared/Nav';
import Warning from './../../shared/Warning';
import SubNav from './SubNav';
import Sidebar from './sidebar/Sidebar';
import {fetchApp} from './../../../services/api';
import getCurrentMlApp from './../../../selectors/currentMlApp';
import * as actions from './../../../actions';


class DashboardPage extends Component {

    componentWillMount() {
        const currentAppId = this.props.params.appId;
        this.props.setCurrentMlApp(currentAppId);
        const currentApp = this.props.mlApps.find(app => app.id === currentAppId);
        if (!currentApp) {
            fetchApp(currentAppId).then(userApp => {
                userApp.model.classes.forEach(mlClass => {
                    this.props.addMlClass(mlClass);    
                });
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
                    <Sidebar
                        customMlClasses={this.props.currentMlApp.mlClasses}
                        premadeMlClasses={[]}
                    />
                    <div className="sq-dashboard--workspace">
                        <SubNav/>
                        <h1>{this.props.currentMlApp.appName}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let currentMlApp = getCurrentMlApp(state);
    if (!currentMlApp) {
        currentMlApp = {
            appName: "loading...",
            mlClasses: []
        }
    }
    return {
        mlApps: state.mlApps,
        currentMlApp
    }
}

export default connect(
  mapStateToProps,
  actions
)(DashboardPage)