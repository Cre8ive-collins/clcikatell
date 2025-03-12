
import { Activity } from '../types/activity';

export interface ActivityState {
  activities: Activity[];
  isConnected: boolean;
  error: string | null;
  searchTerm: string;
}

export type ActivityAction =
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'SET_CONNECTED'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'CLEAR_ACTIVITIES' };


export const initialState: ActivityState = {
  activities: [],
  isConnected: false,
  error: null,
  searchTerm: '',
};


export const activityReducer = (
  state: ActivityState,
  action: ActivityAction
): ActivityState => {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [action.payload, ...state.activities].slice(0, 100),
      };
    case 'SET_CONNECTED':
      return {
        ...state,
        isConnected: action.payload,
        error: null, 
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'CLEAR_ACTIVITIES':
      return {
        ...state,
        activities: [],
      };
    default:
      return state;
  }
};
