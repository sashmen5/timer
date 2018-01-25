import * as uuid from 'uuid';

export const TIMER_ACTIONS = {
  TICK: '[Timer] tick',
  ADD_TASK: '[Timer] add task',
  PLAY_TASK: '[Timer] play task',
  PAUSE_TASK: '[Timer] pause task'
};

export const tick = () => ({
  type: TIMER_ACTIONS.TICK,
  payload: (new Date()).getTime()
});

export const addTask = (title) => ({
  type: TIMER_ACTIONS.ADD_TASK,
  payload: {
    id: uuid.v4(),
    title,
    duration: 0
  }
});

export const playTask = (id) => ({
  type: TIMER_ACTIONS.PLAY_TASK,
  payload: {
    id,
    startedAt: (new Date()).getTime()
  }
});

export const pauseTask = (id) => ({
  type: TIMER_ACTIONS.PAUSE_TASK,
  payload: id
});
