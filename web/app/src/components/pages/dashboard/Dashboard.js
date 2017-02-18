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
import { renameMlClass } from './../../../actions/mlClasses';
import { loadPremadeClasses } from './../../../actions/premadeClasses';
import { setCurrentUser } from './../../../actions/user';
import EditClassForm from './EditClassForm';


class DashboardPage extends Component {

    componentWillMount() {
        const currentAppId = this.props.params.appId;
        const userId = this.props.params.userId;
        this.props.setCurrentUser({userId});
        this.props.setCurrentMlApp(currentAppId);
        this.props.loadApp(userId, currentAppId);
        this.props.loadPremadeClasses();
    }

    onEditCardSelected(classId) {
        const allClasses = [
            ...this.props.customMlClasses,
            ...this.props.mlModel.mlClasses,
        ];
        const selectedClass = allClasses
            .find(mlClass => classId === mlClass.id);
        
        this.props.showModal((
            <EditClassForm mlClass={selectedClass} onSubmit={this.onEditClassFormSubmit.bind(this)}/>
        ))
    }

    onEditClassFormSubmit({className, files, classId}) {
        const mlClassData = {
            appId: this.props.currentMlApp.id,
            userId: this.props.userId,
            classId,
            className
        };
        this.props.renameMlClass(mlClassData);
    }

    render () {
        return (
            <div className="sq-full-page">
                <div
                    className={"sq-dashboard--loading" + (this.props.pageIsLoaded ? " hidden" : "")}>
                </div>
                <Nav currentUserId={this.props.params.userId}></Nav>
                <div className="sq-dashboard--content">
                    <Sidebar
                        currentAppId={this.props.currentMlApp.id}
                        customMlClasses={this.props.customMlClasses}
                        premadeMlClasses={this.props.premadeClasses}
                        onEditCardSelected={this.onEditCardSelected.bind(this)}
                    />
                    <div className="sq-dashboard--workspace">
                        <SubNav 
                            mlModel={this.props.mlModel}
                            modelIsEdited={this.props.currentMlApp.workingModelDirty}
                            appName={this.props.currentMlApp.app_name} 
                            openModal={this.props.location.query.modal}/>
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
    const userId = state.user.id;

    const mlApps = Object.keys(state.mlApps).map(key => state.mlApps[key]);
    const { premadeClasses } = state;

    return {
        userId,
        mlApps,
        currentMlApp,
        premadeClasses,
        mlModel,
        customMlClasses,
        pageIsLoaded: !state.statuses.isFetchingApps
    }
}

export default connect(
  mapStateToProps,
  {...actions, loadApp, loadApps, loadPremadeClasses, setCurrentUser, renameMlClass}
)(DashboardPage)