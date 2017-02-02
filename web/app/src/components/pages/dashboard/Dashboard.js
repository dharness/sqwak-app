import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nav from './../../shared/Nav';
import SubNav from './SubNav';
import Sidebar from './sidebar/Sidebar';
import ModelView from './modelView/ModelView';
import getCurrentMlApp from './../../../selectors/currentMlApp';
import * as actions from './../../../actions';
import { loadApps } from './../../../actions/mlApps';
import ClassUploadForm from './../../shared/ClassUploadForm'

class DashboardPage extends Component {

    componentWillMount() {
        const currentAppId = this.props.params.appId;
        this.props.setCurrentMlApp(currentAppId);
        this.props.loadApps();
    }

    onEditCardSelected(classId) {
        const allClasses = [
            ...this.props.currentMlApp.mlClasses,
            ...this.props.currentMlApp.mlModel.mlClasses,
        ]
        const selectedClass = allClasses
            .find(mlClass => classId === mlClass._id);

        console.log(selectedClass)
        
        this.props.showModal((
            <ClassUploadForm editMode={true} mlClass={selectedClass} currentAppId={this.props.currentMlApp._id}/>
        ))
    }

    render () {
        return (
            <div className="sq-full-page">
                <Nav></Nav>
                <div className="sq-dashboard--content">
                    <Sidebar
                        currentAppId={this.props.currentMlApp._id}
                        customMlClasses={this.props.currentMlApp.mlClasses}
                        premadeMlClasses={[]}
                        onEditCardSelected={this.onEditCardSelected.bind(this)}
                    />
                    <div className="sq-dashboard--workspace">
                        <SubNav/>
                        <ModelView
                            currentAppId={this.props.currentMlApp._id}
                            mlModel={this.props.currentMlApp.mlModel}
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
    const mlApps = Object.keys(state.mlApps).map(key => state.mlApps[key]);
    return {
        mlApps,
        currentMlApp
    }
}

export default connect(
  mapStateToProps,
  {...actions, loadApps}
)(DashboardPage)