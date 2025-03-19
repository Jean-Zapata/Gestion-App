import React from 'react';
import { useTheme } from '../components/ThemeContext';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProjectSummaryCard() {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);
  // Mock data - replace with real data later
  const project = {
    name: 'Proyecto Alfa',
    progress: 65,
    tasksCompleted: 8,
    totalTasks: 12,
    dueDate: '2025-04-30',
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{project.name}</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${project.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{`${project.progress}%`}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <MaterialIcons name="assignment" size={20} color="#666" />
          <Text style={styles.detailText}>
            {`${project.tasksCompleted}/${project.totalTasks} tareas`}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialIcons name="event" size={20} color="#666" />
          <Text style={styles.detailText}>{project.dueDate}</Text>
        </View>
      </View>
    </View>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  card: {
    backgroundColor: isDarkMode ? '#1E1E1E' : 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: isDarkMode ? 1 : 0,
    borderColor: isDarkMode ? '#333' : 'transparent',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#333',
  },
  detailText: {
    fontSize: 14,
    color: isDarkMode ? '#888' : '#666',
  },
  header: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
});