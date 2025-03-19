/*
  MODELO DE DATOS Y ESTRUCTURA DE LA BASE DE DATOS

  // Modelo de Evento
  interface Event {
    id: string;          // Identificador único del evento
    title: string;       // Título del evento
    date: string;        // Fecha en formato "YYYY-MM-DD"
    type: string;        // Tipo: 'task', 'deadline', 'meeting'
    description: string; // Descripción opcional
    createdAt: number;   // Timestamp de creación
    updatedAt: number;   // Timestamp de actualización
  }

  // OPCIONES DE IMPLEMENTACIÓN DE BASE DE DATOS:
  
  // 1. AsyncStorage (solución simple para almacenamiento local)
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const saveEvents = async (events) => {
    try {
      await AsyncStorage.setItem('calendar_events', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };
  
  const loadEvents = async () => {
    try {
      const eventsJson = await AsyncStorage.setItem('calendar_events');
      return eventsJson ? JSON.parse(eventsJson) : [];
    } catch (error) {
      console.error('Error loading events:', error);
      return [];
    }
  };

  // 2. SQLite (para una base de datos más robusta)
  // Requiere: npm install expo-sqlite
  import * as SQLite from 'expo-sqlite';
  
  const db = SQLite.openDatabase('calendar.db');
  
  // Crear tabla de eventos
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        created_at INTEGER,
        updated_at INTEGER
      );`
    );
  });

  // Funciones para CRUD de eventos
  const addEvent = (event) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO events (id, title, date, type, description, created_at, updated_at) 
          VALUES (?, ?, ?, ?, ?, ?, ?);`,
          [
            event.id,
            event.title,
            event.date,
            event.type,
            event.description || '',
            Date.now(),
            Date.now()
          ],
          (_, result) => resolve(result),
          (_, error) => reject(error)
        );
      });
    });
  };

  const getEvents = () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM events ORDER BY date;',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
  };

  // Funciones adicionales para actualizar y eliminar eventos...
*/