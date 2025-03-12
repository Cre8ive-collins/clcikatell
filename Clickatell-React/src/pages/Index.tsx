
import React, { useEffect, useReducer } from 'react';
import { socketService } from '@/services/socketService';
import { Activity } from '@/types/activity';
import { activityReducer, initialState } from '@/reducers/activityReducer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import ActivityItem from '@/components/ActivityItem';
import SearchBar from '@/components/SearchBar';
import ConnectionStatus from '@/components/ConnectionStatus';
import { AlertCircle, RefreshCw } from 'lucide-react';

const Index = () => {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  const { activities, isConnected, error, searchTerm } = state;

  useEffect(() => {
    socketService.connect();
    dispatch({ type: 'SET_CONNECTED', payload: true });

    const handleActivity = (activity: Activity) => {
      console.log(activity)
      dispatch({ type: 'ADD_ACTIVITY', payload: activity });
    };

    socketService.on('activity', handleActivity);

    return () => {
      socketService.off('activity', handleActivity);
      socketService.disconnect();
    };
  }, []);

  // Filter activities based on the search term
  const filteredActivities = activities.filter(activity => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      activity.username.toLowerCase().includes(lowerCaseSearchTerm) ||
      (activity.details && activity.details.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  // Handle search term changes
  const handleSearch = (term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  // Handle clear activities button
  const handleClearActivities = () => {
    dispatch({ type: 'CLEAR_ACTIVITIES' });
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 min-h-screen">
      <Card className="bg-card border-secondary shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle className="text-2xl font-bold">Activity Tracker</CardTitle>
            <ConnectionStatus isConnected={isConnected} />
          </div>
          <p className="text-muted-foreground mt-1">
            Real-time user activity monitoring
          </p>
        </CardHeader>
        <Separator className="bg-secondary" />
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-full md:w-2/3">
              <SearchBar onSearch={handleSearch} />
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="whitespace-nowrap"
              onClick={handleClearActivities}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Activities
            </Button>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2 mt-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                {searchTerm ? 'No activities match your search' : 'No activities yet'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
