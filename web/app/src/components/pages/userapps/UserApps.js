import React, {Component} from 'react'
import { connect } from 'react-redux'
import Nav from './../../shared/Nav';
import PlushButton from './../../shared/PlushButton';
import FullPageModal from './../../shared/FullPageModal';
import AppPreviewCard from './AppPreviewCard';
import NewAppForm from './NewAppForm';
import {createApp, fetchApps} from './../../../services/api';


class UserApps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newAppModalOpen: false,
            newAppFormStatus: 0
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
        createApp({appName: formData.newAppName}).then((data) => {
            if(data) {
                this.closeModal();
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

    render () {
        return (
            <div className="sq-apps-page">
                <FullPageModal isOpen={this.state.newAppModalOpen} onCloseEvent={this.closeModal.bind(this)}>
                    <NewAppForm key={this.state.newAppFormStatus} onSumbit={this.newAppFormSubmited.bind(this)}/>
                </FullPageModal>
                <Nav/>
                <div className="sq-apps-page--content">
                    <div className="sq-apps-page--header">
                        <div>All apps</div>
                        <PlushButton buttonText="New app" onClick={()=> {this.setState({newAppModalOpen: true})}}/>
                    </div>
                    <div className="sq-apps-page--app-grid">
                        {this.props.userApps.map(userApp => {
                            return <AppPreviewCard key={userApp.id} name={userApp.appName}/>
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserApps)