
import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => {
  return (
    <div className="flex items-center gap-2">
      {isConnected ? (
        <>
          <div className="flex items-center">
            <Wifi className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-500">Connected</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <WifiOff className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-sm text-red-500">Disconnected</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;
