import React, { Component } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Nav from './../../shared/Nav';
import PlushButton from './../../shared/PlushButton';
import Warning from './../../shared/Warning';
import AppPreviewCard from './AppPreviewCard';
import NewAppForm from './NewAppForm';
import * as actions from './../../../actions';
import { loadApps, removeApp } from './../../../actions/mlApps';
import { createApp } from './../../../services/api';


class MlAppsPage extends Component {

    newAppFormSubmited(formData) {
        return createApp({ appName: formData.newAppName }).then((newApp) => {
            if (newApp) {
                this.props.addApp(newApp);
            }
        });
    }

    componentWillMount() {
        this.props.loadApps();
    }

    openApp(mlAppId) {
        this.props.setCurrentMlApp(mlAppId);
        browserHistory.push(`/dashboard/${mlAppId}`);
    }

    showCreateAppModal() {
        this.props.showModal((
            <NewAppForm onSumbit={(userData) => {
                this.newAppFormSubmited(userData)
                    .then(() => this.props.closeModal())
            }
            } />));
    }

    renderAppPreviewCards() {
        return this.props.mlApps.map((userApp, i) => {
            return (
                <AppPreviewCard
                    onCardSelected={() => { this.openApp(userApp.id); } }
                    key={userApp.id}
                    appId={userApp.id}
                    name={userApp.appName}
                    onDeleteClicked={this.props.removeApp}
                    />)
        });
    }

    render() {
        let shouldHideBgImg = (this.props.mlApps.length > 0) || this.props.isFetchingApps;
        return (
            <div className="sq-apps-page" style={{opacity: (this.props.isFetchingApps ? 0 : 1)}}>
                <Nav />
                <div className="sq-apps-page--content">
                    <div className="sq-apps-page--header sq-text__xlarge">
                        <div>All apps</div>
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
    console.log(isFetchingApps);
    return {
        mlApps,
        isFetchingApps
    };
}

export default connect(
    mapStateToProps,
    { ...actions, loadApps, removeApp }
)(MlAppsPage)