import React, { Component } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Nav from './../../shared/Nav';
import PlushButton from './../../shared/PlushButton';
import AppPreviewCard from './AppPreviewCard';
import NewAppForm from './NewAppForm';
import ConfirmDelete from './ConfirmDelete';
import * as actions from './../../../actions';
import { loadApps, removeApp, addApp } from './../../../actions/mlApps';


class MlAppsPage extends Component {

    newAppFormSubmited(formData) {
        this.props.createApp({ appName: formData.newAppName })
    }

    componentWillMount() {
        const userId = this.props.params.userId;
        this.props.loadApps(userId);
    }

    openApp(mlAppId) {
        const userId = this.props.params.userId;
        this.props.setCurrentMlApp(mlAppId);
        browserHistory.push(`/user/${userId}/apps/${mlAppId}/dashboard`);
    }

    showConfirmDeleteWarning(appName, id) {
        const userId = this.props.params.userId;
        this.props.showModal(( <ConfirmDelete onSubmit={()=> {
            this.props.removeApp({userId, appId: id})
        }} removeAppPending={this.props.removeAppPending}/>));
    }

    showCreateAppModal() {
        const userId = this.props.params.userId;
        this.props.showModal((
            <NewAppForm onSumbit={(appData) => {
                this.props.addApp({ appName: appData.newAppName, userId })
            }
        } />));
    }

    renderAppPreviewCards() {
        return this.props.mlApps.map((mlApp, i) => {
            return (
                <AppPreviewCard
                    onCardSelected={() => { this.openApp(mlApp.id); } }
                    key={mlApp.id}
                    appId={mlApp.id}
                    name={mlApp.app_name}
                    numClasses={mlApp.mlClasses.length}
                    numSamples={mlApp.numSamples}
                    isWorkingModelDirty={mlApp.workingModelDirty}
                    onDeleteClicked={(id) => {this.showConfirmDeleteWarning(mlApp.app_name, id)}}
                    />)
        });
    }

    render() {
        let shouldHideBgImg = (this.props.mlApps.length > 0) || this.props.isFetchingApps;
        return (
            <div className="sq-apps-page" style={{opacity: (this.props.isFetchingApps ? 0 : 1)}}>
                <Nav currentUserId={this.props.params.userId} isAppsPage={true}/>
                <div className="sq-apps-page--content">
                    <div className="sq-apps-page--header">
                        <div className="sq-text__xl">All apps</div>
                        <PlushButton buttonText="Create App" onClick={this.showCreateAppModal.bind(this)} />
                    </div>
                    <div className="sq-apps-page--app-grid">
                        {this.renderAppPreviewCards()}
                    </div>
                    <div
                        className={"sq-apps-page--bg-img" + (shouldHideBgImg ? " hiddden" : "")}
                        style={{
                            transition: (shouldHideBgImg ? "none" : "")
                        }}>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    const mlApps = Object.keys(state.mlApps).map(key => state.mlApps[key]);
    const isFetchingApps = state.statuses.isFetchingApps;
    const removeAppPending = state.statuses.removeAppPending;
    return {
        mlApps,
        isFetchingApps,
        removeAppPending
    };
}

export default connect(
    mapStateToProps,
    { ...actions, loadApps, removeApp, addApp }
)(MlAppsPage)