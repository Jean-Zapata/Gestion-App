import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const mockTasks = [
  {
    id: '1',
    title: 'Diseñar mockups',
    project: 'Proyecto Alfa',
    priority: 'high',
    dueDate: '2025-03-20',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Implementar API',
    project: 'Proyecto Beta',
    priority: 'medium',
    dueDate: '2025-03-25',
    status: 'in_progress',
  },
  {
    id: '3',
    title: 'Testing',
    project: 'Proyecto Alfa',
    priority: 'low',
    dueDate: '2025-03-30',
    status: 'pending',
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return '#f44336';
    case 'medium':
      return '#ff9800';
    case 'low':
      return '#4caf50';
    default:
      return '#666';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return 'schedule';
    case 'in_progress':
      return 'trending-up';
    case 'completed':
      return 'check-circle';
    default:
      return 'help';
  }
};

import { useTheme } from './ThemeContext';
export default function TasksList() {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);
  const renderTask = ({ item }: any) => (
    <TouchableOpacity style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
          <Text style={styles.priorityText}>{item.priority}</Text>
        </View>
      </View>
      
      <View style={styles.taskDetails}>
        <View style={styles.detailItem}>
          <MaterialIcons name="folder" size={16} color="#666" />
          <Text style={styles.detailText}>{item.project}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialIcons name="event" size={16} color="#666" />
          <Text style={styles.detailText}>{item.dueDate}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialIcons name={getStatusIcon(item.status)} size={16} color="#666" />
          <Text style={styles.detailText}>{item.status.replace('_', ' ')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={mockTasks}
      renderItem={renderTask}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: isDarkMode ? '#1E1E1E' : 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDarkMode ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: isDarkMode ? 1 : 0,
    borderColor: isDarkMode ? '#333' : 'transparent',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: isDarkMode ? '#fff' : '#333',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  taskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailText: {
    fontSize: 12,
    color: isDarkMode ? '#888' : '#666',
  },
});