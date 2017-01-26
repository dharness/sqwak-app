import React, {Component} from 'react'
import Nav from './../../shared/Nav';
import PlushButton from './../../shared/PlushButton';
import FullPageModal from './../../shared/FullPageModal';
import AppPreviewCard from './AppPreviewCard';


class UserApps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newAppModalOpen: false
        };
    }
    
    closeModal() {
        this.setState({newAppModalOpen: false});
    }

    render () {
        return (
            <div className="sq-apps-page">
                <FullPageModal isOpen={this.state.newAppModalOpen} onCloseEvent={this.closeModal.bind(this)}/>
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