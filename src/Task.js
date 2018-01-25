import React from 'react';
import { connect } from 'react-redux';
import {ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import { playTask, pauseTask } from './store/actions';
import { getTask, isTaskRunning, getDurationStr } from './store/selectors';

class Task extends React.Component {
  onToggle = () => {
    const { isTaskRunning, taskId, playTask, pauseTask } = this.props;

    isTaskRunning ? pauseTask(taskId) : playTask(taskId);
  }

  render() {
    const { isTaskRunning, task } = this.props;
    const { title, duration } = task;

    return (
      <ListItem
        primaryText={ title }
        secondaryText={ getDurationStr(duration) }
        rightToggle={
          <Toggle toggled={ isTaskRunning } onToggle={ this.onToggle } />
        }>
      </ListItem>
    );
  }
}  

const mapStateToProps = (state, ownProps) => ({
  task: getTask(ownProps.taskId)(state),
  isTaskRunning: isTaskRunning(ownProps.taskId)(state)
});

export default connect(
  mapStateToProps,
  {
    playTask,
    pauseTask
  }
)(Task);
