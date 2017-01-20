import React, {Component} from 'react';
import Upload from './../shared/Upload';
import getFeatures from './../../services/api';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    testApi() {
        getFeatures().then(res => {
            this.setState({message: res.data})
        }).catch(err => {
            console.log(err);
        });
    }


    render () {
        return (
            <div>
                <h1> Welcom to sqwak </h1>
                <button onClick={this.testApi.bind(this)}>Test API</button>
                <br />
                {this.state.message}
                <Upload/>
            </div>
        )
    }
}

export default DashboardPage