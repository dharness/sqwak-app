import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from './../../shared/Nav';
import SubNav from './SubNav';
import Sidebar from './sidebar/Sidebar';
import ModelView from './modelView/ModelView';
import getCurrentMlApp from './../../../selectors/currentMlApp';
import getMlModel from './../../../selectors/mlModel';
import getCustomMlClasses from './../../../selectors/customMlClasses';
import * as actions from './../../../actions';
import { loadApp, loadApps } from './../../../actions/mlApps';
import { loadPremadeClasses } from './../../../actions/premadeClasses';
import { setCurrentUser } from './../../../actions/user';
import ClassUploadForm from './../../shared/ClassUploadForm';


class DashboardPage extends Component {

    componentWillMount() {
        const currentAppId = this.props.params.appId;
        const userId = this.props.params.userId;
        this.props.setCurrentUser({userId});
        this.props.setCurrentMlApp(currentAppId);
        this.props.loadApps(userId);
        this.props.loadApp(userId, currentAppId);
    }

    onEditCardSelected(classId) {
        const allClasses = [
            ...this.props.currentMlApp.mlClasses,
            ...this.props.currentMlApp.mlModel.mlClasses,
        ]
        const selectedClass = allClasses
            .find(mlClass => classId === mlClass._id);
        
        this.props.showModal((
            <ClassUploadForm editMode={true} mlClass={selectedClass} currentAppId={this.props.currentMlApp._id}/>
        ))
    }

    render () {
        return (
            <div className="sq-full-page">
                <Nav currentUserId={this.props.params.userId}></Nav>
                <div className="sq-dashboard--content">
                    <Sidebar
                        currentAppId={this.props.currentMlApp.id}
                        customMlClasses={this.props.customMlClasses}
                        premadeMlClasses={this.props.premadeClasses}
                        onEditCardSelected={this.onEditCardSelected.bind(this)}
                    />
                    <div className="sq-dashboard--workspace">
                        <SubNav appName={this.props.currentMlApp.app_name}/>
                        <ModelView
                            currentAppId={this.props.currentMlApp.id}
                            mlModel={this.props.mlModel}
                            onEditCardSelected={this.onEditCardSelected.bind(this)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const currentMlApp = getCurrentMlApp(state);
    const mlModel = getMlModel(state);
    const customMlClasses = getCustomMlClasses(state);

    const mlApps = Object.keys(state.mlApps).map(key => state.mlApps[key]);
    const { premadeClasses } = state;
    return {
        mlApps,
        currentMlApp,
        premadeClasses,
        mlModel,
        customMlClasses
    }
}

export default connect(
  mapStateToProps,
  {...actions, loadApp, loadApps, loadPremadeClasses, setCurrentUser}
)(DashboardPage)