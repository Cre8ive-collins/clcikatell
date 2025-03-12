
import { activityReducer, initialState, ActivityState, ActivityAction } from './activityReducer';
import { Activity } from '../types/activity';

describe('activityReducer', () => {
  it('should return the initial state', () => {
    const state = activityReducer(initialState, {} as ActivityAction);
    expect(state).toEqual(initialState);
  });

  it('should handle ADD_ACTIVITY', () => {
    const activity: Activity = {
      id: '1',
      userId: 'user123',
      username: 'testuser',
      type: 'login',
      timestamp: new Date(),
      details: 'Logged in successfully',
    };

    const state = activityReducer(initialState, {
      type: 'ADD_ACTIVITY',
      payload: activity,
    });

    expect(state.activities).toHaveLength(1);
    expect(state.activities[0]).toEqual(activity);
  });

  it('should prepend new activities and limit to 100', () => {
    // Create initial state with 100 activities
    let state: ActivityState = { ...initialState, activities: [] };
    
    for (let i = 0; i < 100; i++) {
      const activity: Activity = {
        id: `activity-${i}`,
        userId: 'user123',
        username: 'testuser',
        type: 'login',
        timestamp: new Date(),
        details: `Activity ${i}`,
      };
      
      state = activityReducer(state, {
        type: 'ADD_ACTIVITY',
        payload: activity,
      });
    }
    
    expect(state.activities).toHaveLength(100);
    
    const newActivity: Activity = {
      id: 'new-activity',
      userId: 'user123',
      username: 'testuser',
      type: 'login',
      timestamp: new Date(),
      details: 'New activity',
    };
    
    state = activityReducer(state, {
      type: 'ADD_ACTIVITY',
      payload: newActivity,
    });
    
    expect(state.activities).toHaveLength(100);
    expect(state.activities[0]).toEqual(newActivity);
  });

  it('should handle SET_CONNECTED', () => {
    const state = activityReducer(initialState, {
      type: 'SET_CONNECTED',
      payload: true,
    });

    expect(state.isConnected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle SET_ERROR', () => {
    const errorMessage = 'Connection error';
    const state = activityReducer(initialState, {
      type: 'SET_ERROR',
      payload: errorMessage,
    });

    expect(state.error).toBe(errorMessage);
  });

  it('should handle CLEAR_ERROR', () => {
    const stateWithError: ActivityState = {
      ...initialState,
      error: 'Some error',
    };

    const state = activityReducer(stateWithError, {
      type: 'CLEAR_ERROR',
    });

    expect(state.error).toBeNull();
  });

  // Test SET_SEARCH_TERM action
  it('should handle SET_SEARCH_TERM', () => {
    const searchTerm = 'test search';
    const state = activityReducer(initialState, {
      type: 'SET_SEARCH_TERM',
      payload: searchTerm,
    });

    expect(state.searchTerm).toBe(searchTerm);
  });

  it('should handle CLEAR_ACTIVITIES', () => {
    const stateWithActivities: ActivityState = {
      ...initialState,
      activities: [
        {
          id: '1',
          userId: 'user123',
          username: 'testuser',
          type: 'login',
          timestamp: new Date(),
          details: 'Logged in successfully',
        },
      ],
    };

    const state = activityReducer(stateWithActivities, {
      type: 'CLEAR_ACTIVITIES',
    });

    expect(state.activities).toHaveLength(0);
  });
});
