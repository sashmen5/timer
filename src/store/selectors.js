import { createSelector } from 'reselect';
import { get, sumBy, values, round } from 'lodash/fp';

export const getTasks = (state) => values(get('tasks', state));
export const getTask = (id) => get(['tasks', id]);
export const isTaskRunning = (id) => (state) => id === state.runningTaskId;

export const getTotal = createSelector(
  getTasks,
  sumBy('duration')
);

export const getDurationStr = (duration) => {
  const hours = round(duration / 1000 / 3600);
  const minutes = round(duration / 1000 / 60);
  const seconds = round(duration / 1000);

  return `${hours}:${minutes}:${seconds}`;
}
