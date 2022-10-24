interface StopwatchState {
  running: boolean;
  currentTime: number;
  lastTime: number;
}
type StopwatchActions =
  | { type: 'stop' }
  | { type: 'start' }
  | { type: 'reset' }
  | { type: 'tick' };

export function StopwatchReducer(
  state: StopwatchState,
  action: StopwatchActions
): StopwatchState {
  switch (action.type) {
    case 'reset':
      return { running: false, currentTime: 0, lastTime: 0 };
    case 'start':
      return { ...state, running: true, lastTime: Date.now() };
    case 'stop':
      return { ...state, running: false };
    case 'tick':
      if (!state.running) return state;
      return {
        ...state,
        currentTime: state.currentTime + (Date.now() - state.lastTime),
        lastTime: Date.now(),
      };
  }
}
