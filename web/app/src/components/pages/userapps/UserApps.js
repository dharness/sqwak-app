import React, {Component} from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Nav from './../../shared/Nav';
import PlushButton from './../../shared/PlushButton';
import FullPageModal from './../../shared/FullPageModal';
import Warning from './../../shared/Warning';
import AppPreviewCard from './AppPreviewCard';
import NewAppForm from './NewAppForm';
import {createApp, fetchApps, deleteApp} from './../../../services/api';


class UserApps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newAppModalOpen: false,
            newAppFormStatus: 0,
            warnings: []
        };
    }
    
    closeModal() {
        this.setState({
            newAppModalOpen: false,
            // newAppFormStatus is used to refresh the form component when needed
            newAppFormStatus: !(this.state.newAppFormStatus)
        });
    }

    newAppFormSubmited(formData) {
        createApp({appName: formData.newAppName}).then((newApp) => {
            if(newApp) {
                this.closeModal();
                this.props.addApp(newApp);
            }
        });
    }

    componentWillMount() {
        fetchApps().then(userAppsList => {
            userAppsList.forEach(userApp => {
                this.props.addApp(userApp);
            });
        });
    }

    deleteApp(appId) {
        this.setState({
            warnings: [1]
        })
    }

    confirmDelete() {
        deleteApp(appId).then(() => {
            this.props.removeApp(appId);
        });
    }

    openApp(appId) {
        browserHistory.push(`/dashboard/${appId}`);
    }

    render () {
        return (
            <div className="sq-apps-page">
                <Warning isOpen={this.state.warnings.length > 0} warnings={this.state.warnings} onConfirm={this.confirmDelete.bind(this)} onDeny={this.denyDelete}/>
                <FullPageModal isOpen={this.state.newAppModalOpen} onCloseEvent={this.closeModal.bind(this)}>
                    <NewAppForm
                        formStatus={this.state.newAppFormStatus}
                        key={this.state.newAppFormStatus}
                        onSumbit={this.newAppFormSubmited.bind(this)}
                    />
                </FullPageModal>
                <Nav/>
                <div className="sq-apps-page--content">
                    <div className="sq-apps-page--header">
                        <div>All apps</div>
                        <PlushButton buttonText="New app" onClick={()=> {this.setState({newAppModalOpen: true})}}/>
                    </div>
                    <div className="sq-apps-page--app-grid">
                        {this.props.userApps.map((userApp, i) => {
                            return (
                            <AppPreviewCard
                                onCardSelected={()=> {this.openApp(userApp.id);}}
                                key={userApp.id}
                                appId={userApp.id}
                                name={userApp.appName}
                                onDeleteClicked={this.deleteApp.bind(this)}
                            />)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userApps: state.userApps
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
    },
    removeApp(appId) {
        dispatch({
            type: 'REMOVE_APP',
            id: appId
        })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserApps)