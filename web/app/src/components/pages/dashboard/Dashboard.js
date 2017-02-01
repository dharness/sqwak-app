import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from './../../shared/Nav';
import SubNav from './SubNav';
import Sidebar from './sidebar/Sidebar';
import ModelView from './modelView/ModelView';
import getCurrentMlApp from './../../../selectors/currentMlApp';
import * as actions from './../../../actions';
import { loadApps } from './../../../actions/mlApps';


class DashboardPage extends Component {

    componentWillMount() {
        const currentAppId = this.props.params.appId;
        this.props.setCurrentMlApp(currentAppId);
        this.props.loadApps();
    }

    render () {
        return (
            <div className="sq-full-page">
                <Nav></Nav>
                <div className="sq-dashboard--content">
                    <Sidebar
                        customMlClasses={this.props.currentMlApp.workingModel.mlClasses}
                        premadeMlClasses={[]}
                    />
                    <div className="sq-dashboard--workspace">
                        <SubNav/>
                        <ModelView workingModel={this.props.currentMlApp.workingModel}/>
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
            workingModel: {
                mlClasses: []
            }
        }
    }
    const mlApps = Object.keys(state.mlApps).map(key => state.mlApps[key]);
    return {
        mlApps,
        currentMlApp
    }
}

export default connect(
  mapStateToProps,
  {...actions, loadApps}
)(DashboardPage)