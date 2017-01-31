import React, {Component} from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Nav from './../../shared/Nav';
import PlushButton from './../../shared/PlushButton';
import Warning from './../../shared/Warning';
import AppPreviewCard from './AppPreviewCard';
import NewAppForm from './NewAppForm';
import {createApp, fetchApps, deleteApp} from './../../../services/api';


class UserApps extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        return createApp({appName: formData.newAppName}).then((newApp) => {
            if(newApp) {
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
        deleteApp(appId).then(() => {
            this.props.removeApp(appId);
        });
    }

    openApp(appId) {
        browserHistory.push(`/dashboard/${appId}`);
    }

    showCreateAppModal() {
        this.props.showModal((
            <NewAppForm onSumbit={(userData)=> {
                this.newAppFormSubmited(userData)
                    .then(()=> this.props.closeModal())
            }
        }/>));
    }

    render () {
        return (
            <div className="sq-apps-page">
                <Warning isOpen={false}/>
                <Nav/>
                <div className="sq-apps-page--content">
                    <div className="sq-apps-page--header sq-text__xlarge">
                        <div>All apps</div>
                        <PlushButton buttonText="Create App" onClick={this.showCreateAppModal.bind(this)}/>
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
                <div className={"sq-apps-page--bg-img" + (this.props.userApps.length > 0 ? " hiddden" : "")} style={{
                    transition: (this.props.userApps.length > 0 ? "none" : "")
                }}></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return { userApps: state.userApps }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showModal(component) {
        dispatch({
            type: 'SHOW_MODAL',
            component
        })
    },
    closeModal() {
        dispatch({ type: 'CLOSE_MODAL' })
    },
    addApp(userApp) {
        dispatch({
            type: 'ADD_APP',
            appName: userApp.appName,
            classes: userApp.model.classes,
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