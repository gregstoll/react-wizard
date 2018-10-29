import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Alert from 'react-bootstrap/lib/Alert';

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      advanceDisabled: false,
      retreatDisabled: false,
    }
  }

  onAdvance(err) {
    var self = this;
    if(err){
      self.setState({
        advanceDisabled: false,
        retreatDisabled: false,
        currentError: err
      });
    }else{
      this.props.onAdvance();
    }
  }

  onSubmit() {
    var self = this;
    self.setState({
      advanceDisabled: true,
      retreatDisabled: true
    });
    this.props.onSubmit.apply(this, [this.onAdvance]);
  }

  onBack() {
    if(this.props.onBack){
      this.props.onBack.apply(this, [this.props.onRetreat]);
    }else{
      this.props.onRetreat();
    }
  }

  render() {
    var AdvanceButton;
    if(!this.props.lastStep){
      AdvanceButton = <Button
        onClick={this.onSubmit}
        disabled={this.state.advanceDisabled}
        bsStyle="primary">Onward</Button>;
    }

    var RetreatButton;
    if(!this.props.lastStep){
      RetreatButton = <Button
        onClick={this.onBack}
        disabled={this.props.firstStep || this.state.retreatDisabled}>back</Button>;
    }

    var ComponentClass = this.props.component;

    var Error;
    if(this.state.currentError){
      Error = <Alert bsStyle="danger">
                <p>{this.state.currentError.message}</p>
              </Alert>;
    }

    return <div className="step">
              <ComponentClass data={this.props.data}/>
              <ButtonToolbar>
                {RetreatButton}
                {AdvanceButton}
              </ButtonToolbar>
              {Error}
           </div>;
  }
}

export default class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: this.props.start || 0,
      currentError: null,
      data: this.props,
      advanceDisabled: false,
      retreatDisabled: false
    };
  }

  advance(e) {
    var self = this;
    self.setState({
      advanceDisabled: true,
      retreatDisabled: true
    });
  }

  retreat(e) {
    var self = this;
    self.setState({
      currentStep: self.state.currentStep-1,
    });
  }

  navigate(e) {
    console.log(e);
  }

  render() {
    var self = this;

    //TODO
    var items=[];
    //var items = this.props.steps.map(function(step, idx){
    //  return <ListGroup.Item key={'nav' + idx} onClick={self.navigate} active={idx === self.state.currentStep ? 'active' : ''}>{step.name}</ListGroup.Item>;
    //});

    var step = this.props.steps[this.state.currentStep];
    var stepOnAdvance = function(){
        self.setState({
          currentError: null,
          currentStep: self.state.currentStep+1
        });
    };
    var stepOnRetreat = function(){
        self.setState({
          currentError: null,
          currentStep: self.state.currentStep-1
        });
    };
 
    var Component = <Step 
          key={'step' + this.state.currentStep}
          onSubmit={step.onSubmit}
          onBack={step.onBack}
          onAdvance={stepOnAdvance}
          onRetreat={stepOnRetreat}
          component={step.component}
          data={this.state.data}
          firstStep={this.state.currentStep === 0}
          lastStep={this.state.currentStep === this.props.steps.length-1} />

    return <div className="wizard">
            <div className="wizard-nav col-xs-2">
              <ListGroup>
                {items}
              </ListGroup>
            </div>
            <div className="wizard-content col-xs-4">
              {Component}
            </div>
           </div>;
  }
}

Wizard.defaultProps = {steps: []};
