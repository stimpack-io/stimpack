import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index'
import BaseTask from '../BaseTask'

class CreateEpicSplashPageTask extends BaseTask {
    render() {
        return (
            <div className="container">                              
                <div className="card">
                    <div className="card-header">
                        <span className="switch switch-sm">
                            <input type="checkbox" className="switch" id="CreateEpicSplashPageTask-switch" checked={this.props.tasks.CreateEpicSplashPageTask.enabled} onChange={this.enableTask.bind(this)} />
                            <label htmlFor="CreateEpicSplashPageTask-switch">Create Epic Splash Page</label>                    
                        </span>
                    </div>
                    <div className="card-body">                    
                        <div className="form-group">                            
                            <input onChange={this.updateBackgroundImage.bind(this)} type="text" className="form-control" id="usr" placeholder="bg-image-url" />
                        </div>
                    </div>
                </div>                
            </div>
        );
    }

    updateBackgroundImage(event) {
        this.props.tasks.CreateEpicSplashPageTask.imageUrl = event.target.value
        this.props.updateTasks(this.props.tasks);
    }
    
    static getDefaultParameters() {
        return {
            taskName: "CreateEpicSplashPageTask",
            enabled: true,
            imageUrl: "https://img.wallpapersafari.com/desktop/1920/1080/16/65/JDGTWx.jpg"
        }
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

export default connect(mapStateToProps, matchDispatchToProps)(CreateEpicSplashPageTask);