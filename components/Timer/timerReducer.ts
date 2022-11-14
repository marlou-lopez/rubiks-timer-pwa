export interface StopwatchState {
  running: boolean;
  currentTime: number;
  lastTime: number;
  splitTimes: number[];
}
type StopwatchActions =
  | { type: 'stop' }
  | { type: 'start' }
  | { type: 'reset' }
  | { type: 'tick' }
  | { type: 'split' };

export function StopwatchReducer(state: StopwatchState, action: StopwatchActions): StopwatchState {
  switch (action.type) {
    case 'reset':
      return { running: false, currentTime: 0, lastTime: 0, splitTimes: [] };
    case 'start':
      return { ...state, running: true, lastTime: Date.now() };
    case 'stop':
      return { ...state, running: false };
    case 'split': {
      return { ...state, splitTimes: [...state.splitTimes, state.currentTime] };
    }
    case 'tick':
      if (!state.running) return state;
      return {
        ...state,
        currentTime: state.currentTime + (Date.now() - state.lastTime),
        lastTime: Date.now(),
      };
  }
}
