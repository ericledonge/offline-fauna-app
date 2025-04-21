import { useEffect, useState } from "react";
import * as Network from "expo-network";

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(false);

  const fetchNetworkStatus = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState?.isConnected ?? false);
    } catch (error) {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    fetchNetworkStatus();

    const intervalId = setInterval(fetchNetworkStatus, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return isConnected;
};
