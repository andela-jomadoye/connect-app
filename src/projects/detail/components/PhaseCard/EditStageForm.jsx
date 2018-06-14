import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

import './EditStageForm.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updatePhase as updatePhaseAPI } from '../../../actions/project'
import LoadingIndicator from '../../../../components/LoadingIndicator/LoadingIndicator'


class EditStageForm extends React.Component {
  constructor(props) {
    super(props)

    const today = moment(new Date())
    const todayStr = today.format('YYYY-MM-DD')
    this.state = {
      duration: '0',
      startDate: todayStr,
      spentBudget: '0',
      budget: '0',
      isUpdating: false
    }
    this.submitValue = this.submitValue.bind(this)
    this.onDurationChange = this.onDurationChange.bind(this)
    this.onStartDateChange = this.onStartDateChange.bind(this)
    this.onSpentChange = this.onSpentChange.bind(this)
    this.onBudgetChange = this.onBudgetChange.bind(this)
  }

  submitValue() {
    const props = this.props
    const phase = props.phase
    const endDate = moment(new Date(this.state.startDate)).add(this.state.duration, 'days').format('YYYY-MM-DD')
    const updateParam = {
      startDate: this.state.startDate,
      endDate: endDate || '',
      budget: Number(this.state.budget),
      spentBudget: Number(this.state.spentBudget),
      duration: Number(this.state.duration),
    }
    this.setState({isUpdating: true})
    props.updatePhaseAPI(phase.projectId, phase.id, updateParam, props.phaseIndex).then(() => {
      _.assign(phase, updateParam)
      props.update()
      this.setState({isUpdating: false})
    }).catch(() => {
      props.update()
      this.setState({isUpdating: false})
    })
  }

  onDurationChange (event) {
    event.stopPropagation()
    this.setState({duration: event.target.value})
  }

  onStartDateChange (event) {
    event.stopPropagation()
    this.setState({startDate: event.target.value})
  }

  onSpentChange(event) {
    event.stopPropagation()
    this.setState({spentBudget: event.target.value})
  }

  onBudgetChange(event) {
    event.stopPropagation()
    this.setState({budget: event.target.value})
  }

  render() {
    const props = this.props
    const opts = {}
    if (!(this.state.duration && this.state.duration !== '0' && this.state.startDate && this.state.spentBudget && this.state.spentBudget !== '0' && this.state.budget && this.state.budget !== '0')) {
      opts['disabled'] = 'disabled'
    }
    return (
      <div styleName="container">
        {this.state.isUpdating && (<LoadingIndicator />)}
        {!this.state.isUpdating && (<div>
          <div styleName="label-title">{'Edit Stage'}</div>
          <div />
          <div styleName="form">
            <div styleName="label-layer">
              <div styleName={'label-title'}>{'Start Date'}</div>
              <input styleName="input" onChange={this.onStartDateChange} value={this.state.startDate} type="date" placeholder={'Start Date'}/>
              <div styleName={'label-title'}>{'Duration'}</div>
              <input styleName="input" onChange={this.onDurationChange} value={this.state.duration} type="number" placeholder={'Duration'}/>
            </div>
            <div styleName="label-layer">
              <div styleName={'label-title'}>{'Spent'}</div>
              <input styleName="input" onChange={this.onSpentChange} value={this.state.spentBudget} type="number" placeholder={'Spent'}/>
              <div styleName={'label-title'}>{'Budget'}</div>
              <input styleName="input" onChange={this.onBudgetChange} value={this.state.budget} type="number" placeholder={'Budget'}/>
            </div>
            <div styleName="group-bottom">
              <button onClick={props.cancel} className="tc-btn tc-btn-default"><strong>{'Cancel'}</strong></button>
              <button onClick={this.submitValue} {...opts} className="tc-btn tc-btn-primary"><strong>{'Update Stage'}</strong></button>
            </div>
          </div>
        </div>)}
      </div>
    )
  }
}

EditStageForm.defaultProps = {
  cancel: () => {},
  update: () => {}
}

EditStageForm.propTypes = {
  cancel: PT.func,
  update: PT.func,
  phase: PT.object,
  phaseIndex: PT.number
}

const mapStateToProps = () => ({})

const actionCreators = {updatePhaseAPI}

export default withRouter(connect(mapStateToProps, actionCreators)(EditStageForm))