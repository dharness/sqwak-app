import React, { Component } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Nav from './../../shared/Nav';
import PlushButton from './../../shared/PlushButton';
import AppPreviewCard from './AppPreviewCard';
import NewAppForm from './NewAppForm';
import * as actions from './../../../actions';
import { loadApps, removeApp, addApp } from './../../../actions/mlApps';


class MlAppsPage extends Component {

    newAppFormSubmited(formData) {
        this.props.createApp({ appName: formData.newAppName })
    }

    componentWillMount() {
        this.props.loadApps();
    }

    openApp(mlAppId) {
        this.props.setCurrentMlApp(mlAppId);
        browserHistory.push(`/dashboard/${mlAppId}`);
    }

    showConfirmDeleteWarning(appName, id) {
        const warning = {
            message: `Are you sure you want to delete the app ${appName}?`,
            onConfirm: () => {this.props.removeApp(id);}
        }
        this.props.showWarning(warning);
    }

    showCreateAppModal() {
        this.props.showModal((
            <NewAppForm onSumbit={(appData) => {
                this.props.addApp({ appName: appData.newAppName })
            }
        } />));
    }

    renderAppPreviewCards() {
        return this.props.mlApps.map((userApp, i) => {
            return (
                <AppPreviewCard
                    onCardSelected={() => { this.openApp(userApp._id); } }
                    key={userApp._id}
                    appId={userApp._id}
                    name={userApp.appName}
                    onDeleteClicked={(id) => {this.showConfirmDeleteWarning(userApp.appName, id)}}
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
    return {
        mlApps,
        isFetchingApps
    };
}

export default connect(
    mapStateToProps,
    { ...actions, loadApps, removeApp, addApp }
)(MlAppsPage)