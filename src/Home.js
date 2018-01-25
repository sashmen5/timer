import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Task from './Task';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import { addTask, tick } from './store/actions';
import { getTasks, getTotal, getDurationStr } from './store/selectors';
import * as moment from 'moment';

class Home extends React.Component {
  state = {
    value: ''
  };

  onAdd = () => {
    this.props.addTask(this.state.value);
    this.setState({ value: '' });
  }

  componentDidMount() {
    this.checkInterval(this.props, {});
  }

  componentWillReceiveProps(nextProps) {
    this.checkInterval(nextProps, this.props);
  }

  checkInterval(nextProps, prevProps) {
    if (nextProps.runningTaskId && !prevProps.runningTaskId) {
      this.interval = setInterval(() => {
        nextProps.tick();
      }, 1000);
    } else if (!nextProps.runningTaskId && prevProps.runningTaskId) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { total, tasks } = this.props;

    return (
      <Fragment>
        <TextField
          onChange={ e => this.setState({ value: e.target.value }) }
          value={ this.state.value }
          name="title"
          placeholder="Task Title"/>
        <FloatingActionButton mini={true} style={ {marginLeft: 10 } }>
          <ContentAdd onClick={ this.onAdd } />
        </FloatingActionButton>
        <List>
          {
            tasks.map((item) => (
              <Task
                key={item.id}
                taskId={item.id}/>
            ))
          }
        </List>
        <Divider/>
        <ListItem
          primaryText="Total"
          secondaryText={ getDurationStr(this.props.total) }/>
      </Fragment>
    );
  }
}  

const mapStateToProps = (state) => ({
  tasks: getTasks(state),
  total: getTotal(state),
  runningTaskId: state.runningTaskId
});

export default connect(
  mapStateToProps,
  {
    addTask,
    tick
  }
)(Home);
