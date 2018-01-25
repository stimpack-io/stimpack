import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModelTransformer from '../../ModelTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updatePseudoCode} from '../../actions/index';
import {updateTask} from '../../actions/index';
import Template from './../../Template';

class CreateMigrationsTask extends Component {
    componentDidMount() {
        this.setup();
        //this.test();        
    }

    test() {
        var modelTransformer = new ModelTransformer();        
        modelTransformer.transform("", function(phpCode) {
            console.assert(phpCode == "", {"message": "failed empty string"});                
        }.bind(this));                        
    }

    render() {
        return (
            <div className="container">                              
            <div className="card">
                <div className="card-header">
                    <span className="switch switch-sm">
                        <input type="checkbox" className="switch" id="CreateMigrationsTask-switch" checked={this.props.tasks.CreateMigrationsTask.enabled} onChange={this.enableTask.bind(this)} />
                        <label htmlFor="CreateMigrationsTask-switch">Create Migrations</label>                    
                    </span>
                </div>
                <div className="card-body">                    
                    <div id="pseudo-wrapper">
                        <div>
                            <ul>
                                <li><a href="#">Input</a></li>
                            </ul>
                        </div>
                        <div id="pseudo-editor" />
                    </div>
                    <div id="php-wrapper">
                        <div>
                            <ul>
                                {this.renderPhpTabs()}
                            </ul>
                        </div>

                        <div id="php-editor" />
                    </div>                                
                    
                    <button className="btn btn-default btn-cool">make:auth</button>
                </div>
                
            </div>                
            </div>
        );
    }

    renderPhpTabs() {        
        return this.props.tasks.CreateMigrationsTask.transformedModels.map((model) => {
            return (
                <li key={model.table}>
                    <a href="#">{model.model}</a>
                </li>
            );
        });
    }    
    //onClick={() => this.props.selectUser(user)}
    //{this.renderPhpTabs()}                                
    enableTask() {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateMigrationsTask.enabled = !updatedTasks.CreateMigrationsTask.enabled; // ^= 1
        this.props.updateTask(updatedTasks);
    }

    updatePseudoCode(pseudoCode) {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateMigrationsTask.pseudoCode = pseudoCode;
        this.props.updateTask(updatedTasks);        
    }

    updateTransformedModels(models) {
        var updatedTasks = this.props.tasks;
        updatedTasks.CreateMigrationsTask.transformedModels = models;
        this.props.updateTask(updatedTasks);        
    }

    setup() {
        this.pseudo = ace.edit("pseudo-editor");
        this.pseudo.$blockScrolling = Infinity;
        this.pseudo.setTheme("ace/theme/monokai");
        this.pseudo.getSession().setMode({
            path: "ace/mode/php",
            inline: true
        });        
        this.pseudo.setShowPrintMargin(false);
        this.pseudo.renderer.setShowGutter(false);        
        
        this.php = ace.edit("php-editor");
        this.php.$blockScrolling = Infinity;
        this.php.setTheme("ace/theme/monokai");
        this.php.getSession().setMode({
            path: "ace/mode/php",
            inline: true
        });        
        this.php.setShowPrintMargin(false);
        this.php.renderer.setShowGutter(false);        
        this.pseudo.getSession().on('change', function() {
            var pseudoCode = this.pseudo.getSession().getValue();
            //this.props.updatePseudoCode(pseudoCode);
            this.updatePseudoCode(pseudoCode);
            var modelTransformer = new ModelTransformer();
            modelTransformer.transform(pseudoCode, function(transformedModels) {
                this.updateTransformedModels(transformedModels);                                
                this.renderPhpCode(transformedModels);                
            }.bind(this));
        }.bind(this));
    }

    renderPhpCode(transformedModels) {
        // Split into tabs etc...
        var phpCode = Template.migration(transformedModels);
        this.php.setValue(phpCode, 1);
    }
    
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        pseudoCode: state.pseudoCode,
        tasks: state.tasks        
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            updatePseudoCode: updatePseudoCode,
            updateTask: updateTask
        }, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(CreateMigrationsTask);






