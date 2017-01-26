import React, {Component} from 'react'
import Nav from './../../shared/Nav';
import PlushButton from './../../shared/PlushButton';
import FullPageModal from './../../shared/FullPageModal';
import AppPreviewCard from './AppPreviewCard';
import NewAppForm from './NewAppForm';
import {createApp} from './../../../services/api';


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
                    <AppPreviewCard />
                </div>
            </div>
        )
    }
}

export default UserApps