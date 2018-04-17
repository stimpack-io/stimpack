import * as React from "react";
import * as _ from "lodash";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateDiagramEngine} from '../actions/index'

import { DefaultNodeModel } from "storm-react-diagrams";
import { DefaultPortLabel } from "storm-react-diagrams";
import { DiagramEngine } from "storm-react-diagrams";
import { BaseWidget, BaseWidgetProps } from "storm-react-diagrams";
import Modal from 'react-modal';

export default class BaseManipulator extends BaseWidget {
	constructor(className, props) {
        super("srd-default-node", props);                
        Modal.setAppElement('#main')        
	}

	generatePort(port) {
		return <DefaultPortLabel model={port} key={port.id} />;
    }

	render() {        
		return (
            
			<div onDoubleClick={this.openModal.bind(this)} {...this.getProps()}>
                {this.renderNode()}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
                    onRequestClose={this.closeModal.bind(this)}
                    contentLabel="Example Modal"
                    overlayClassName="no-overlay"
                    className="settings-modal medium"
                >                
                    {this.renderSettings()}
                    <div className="container settings-modal-buttons">                    
                        <button className="btn btn-stimpack" onClick={this.closeModal.bind(this)}>Close</button>
                    </div>                    
                </Modal>
			</div> 
		);
    }

    renderNode() {
        return (
            <wrapper>
                
                <div className={this.bem("__title")}>
                    <div className={this.bem("__name")}>{this.props.node.manipulator.name}</div>
                </div>
                <div className={this.bem("__ports")}>
                    <div className={this.bem("__in")}>
                        {_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
                    </div>
                    <div className={this.bem("__out")}>
                        {_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
                    </div>
                </div>
            </wrapper>
        );
    }

    openModal() {
        this.setState({
            modalIsOpen: true,
        });
    }
    
    afterOpenModal() {
        // 
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
        //console.log(JSON.stringify(this.props.diagramEngine.diagramModel.serializeDiagram(), null, 4));        
    }

    isStarter() {
        return typeof this.state.isStarter !== 'undefined' && this.state.isStarter;
    }

    manipulator() {
        return this.props.node.state.manipulator;
    }
    
    static mapStateToProps(state) {
        return {
            engine: state.engine,
            foo: state.foo
        };
    }
    
    static matchDispatchToProps(dispatch){
        return bindActionCreators(
            {
                updateDiagramEngine: updateDiagramEngine
            }, dispatch);
    }    
}