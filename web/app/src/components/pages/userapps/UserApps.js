import React, {Component} from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Nav from './../../shared/Nav';
import PlushButton from './../../shared/PlushButton';
import Warning from './../../shared/Warning';
import AppPreviewCard from './AppPreviewCard';
import NewAppForm from './NewAppForm';
import * as actions from './../../../actions';
import {createApp, fetchApps, deleteApp} from './../../../services/api';


class UserApps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
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
                this.setState({isLoading: false})
            });
        });
    }

    deleteApp(appId) {
        deleteApp(appId).then(() => {
            this.props.removeApp(appId);
        });
    }

    openApp(appId) {
        this.props.setCurrentMlApp(appId);
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
        let shouldHideBgImg = (this.props.userApps.length > 0);
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
                <div className={"sq-apps-page--bg-img" + (shouldHideBgImg ? " hiddden" : "")} style={{
                    transition: (shouldHideBgImg ? "none" : "")
                }}></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return { userApps: state.userApps }
}

export default connect(
  mapStateToProps,
  actions
)(UserApps)