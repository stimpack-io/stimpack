import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'

class GitInitTask extends Component {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="GitInitTask-switch" checked={this.props.tasks.GitInitTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="GitInitTask-switch">git init</label>                    
                        </span>
                    </div>
                </div>                
            </div>
        );
    }
    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.GitInitTask.enabled = !updatedTasks.GitInitTask.enabled; // ^= 1
        this.props.updateTasks(updatedTasks);
    }     
}

function mapStateToProps(state) {
    return {
        tasks: state.tasks 
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            updateTasks: updateTasks
        }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(GitInitTask);