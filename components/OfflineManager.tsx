import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'sonner-native';

export const useOfflineManager = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineData, setOfflineData] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const online = state.isConnected && state.isInternetReachable;
      setIsOnline(!!online);
      if (online) {
        syncOfflineData();
      }
    });

    loadOfflineData();
    return () => unsubscribe();
  }, []);

  const loadOfflineData = async () => {
    try {
      const stored = await AsyncStorage.getItem('@offline_data');
      if (stored) {
        setOfflineData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  };

  const saveOfflineData = async (data: any) => {
    try {
      const newOfflineData = [...offlineData, { ...data, timestamp: Date.now() }];
      await AsyncStorage.setItem('@offline_data', JSON.stringify(newOfflineData));
      setOfflineData(newOfflineData);
      toast.info('Datos guardados para sincronización');
    } catch (error) {
      console.error('Error saving offline data:', error);
      toast.error('Error al guardar datos offline');
    }
  };

  const syncOfflineData = async () => {
    if (offlineData.length === 0) return;

    try {
      // Aquí implementarías la lógica de sincronización con tu backend
      toast.success(`Sincronizando ${offlineData.length} elementos...`);
      setOfflineData([]);
      await AsyncStorage.removeItem('@offline_data');
    } catch (error) {
      console.error('Error syncing offline data:', error);
      toast.error('Error al sincronizar datos');
    }
  };

  return {
    isOnline,
    saveOfflineData,
    offlineData,
    syncOfflineData
  };
};

export const OfflineIndicator = () => {
  const { isOnline } = useOfflineManager();

  if (isOnline) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Modo sin conexión</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f44336',
    padding: 8,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});