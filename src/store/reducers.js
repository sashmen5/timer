import { handleActions } from 'redux-actions';
import { get, set } from 'lodash/fp';
import { TIMER_ACTIONS } from './actions';

const initialState = {
  tasks: {},
  runningTaskId: null,
  startedAt: null,
  startedAtDuration: null
};

export const reducer = handleActions({
  [TIMER_ACTIONS.TICK]: (state, { payload }) => {
    if (state.runningTaskId) {
      return set(
        ['tasks', state.runningTaskId, 'duration'],
        state.startedAtDuration + payload - state.startedAt,
        state
      );
    }
    return state;
  },
  [TIMER_ACTIONS.ADD_TASK]: (state, { payload }) => set(['tasks', payload.id], payload, state),
  [TIMER_ACTIONS.PLAY_TASK]: (state, { payload }) => {
    const currentTask = get(['tasks', payload.id], state);

    return {
      ...state,
      runningTaskId: payload.id,
      startedAt: payload.startedAt,
      startedAtDuration: currentTask.duration
    };
  },
  [TIMER_ACTIONS.PAUSE_TASK]: (state, { payload }) =>
    state.runningTaskId === payload
    ? { ...state, runningTaskId: null, startedAt: null, startedAtDuration: null }
    : state
}, initialState);
