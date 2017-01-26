import React, {Component} from 'react'
import Nav from './../../shared/Nav';
import PlushButton from './../../shared/PlushButton';
import AppPreviewCard from './AppPreviewCard';

class UserApps extends Component {
    render () {
        return (
            <div className="sq-apps-page">
                <Nav/>
                <div className="sq-apps-page--content">
                    <div className="sq-apps-page--header">
                        <div>All apps</div>
                        <PlushButton buttonText="New app"/>
                    </div>
                    <AppPreviewCard/>
                </div>
            </div>
        )
    }
}

export default UserApps