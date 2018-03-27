import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PseudoCodeTransformer from '../../../PseudoCodeTransformer';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTasks} from '../../../actions/index';
import Template from './../../../Template';
import BaseTask from '../BaseTask'
import CreateFilesTask from '../CreateFilesTask'

class CreateMigrations extends CreateFilesTask {
    componentDidMount() {
        this.setupEditor();
    }

    body() {
        return (
            <div id="php-wrapper">
                    <ul className="editor-tabs">
                        {this.renderPhpTabs()}
                    </ul>
                <div id={this.editorName()} className="result-editor" />
            </div>            
        );
    }

    static getDefaultParameters() {
        return {
            name: "CreateMigrations",
            enabled: true,
            transformedPseudoCode: new PseudoCodeTransformer(),
            files: [],
            activeTab: null,
            shouldDisplayFilesOfType: ["MODEL", "TABLE_ONLY", "MANY_TO_MANY"],
            fileTypeToGenerate: "migration"
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.tasks != nextProps.tasks)
            this.task().files = Template.migrations(this.props.tasks.SetObjectModel.transformedPseudoCode.safeSort());
            this.renderPhpCode();
    }    
}

export default connect(BaseTask.mapStateToProps, BaseTask.matchDispatchToProps)(CreateMigrations);





