import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface StatsProps {
  stats: {
    totalProjects: number;
    activeProjects: number;
    pendingTasks: number;
    completedTasks: number;
    totalHours: number;
    completedHours: number;
    teamMembers: number;
    upcomingDeadlines: number;
    overdueTasks: number;
    projectProgress: number;
  };
}

export default function DashboardStats({ stats }: StatsProps) {
  return (    <View style={styles.statsContainer}>
      <View style={styles.row}>
        <View style={styles.statCard}>
          <MaterialIcons name="folder" size={24} color="#2196F3" />
          <Text style={styles.statNumber}>{stats.totalProjects}</Text>
          <Text style={styles.statLabel}>Proyectos Totales</Text>
        </View>
        
        <View style={styles.statCard}>
          <MaterialIcons name="play-circle-filled" size={24} color="#4CAF50" />
          <Text style={styles.statNumber}>{stats.activeProjects}</Text>
          <Text style={styles.statLabel}>Proyectos Activos</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.statCard}>
          <MaterialIcons name="assignment-late" size={24} color="#FF9800" />
          <Text style={styles.statNumber}>{stats.pendingTasks}</Text>
          <Text style={styles.statLabel}>Tareas Pendientes</Text>
        </View>
        
        <View style={styles.statCard}>
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
          <Text style={styles.statNumber}>{stats.completedTasks}</Text>
          <Text style={styles.statLabel}>Tareas Completadas</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.statCard}>
          <MaterialIcons name="access-time" size={24} color="#9C27B0" />
          <Text style={styles.statNumber}>{stats.totalHours}h</Text>
          <Text style={styles.statLabel}>Horas Totales</Text>
        </View>
        
        <View style={styles.statCard}>
          <MaterialIcons name="timer" size={24} color="#009688" />
          <Text style={styles.statNumber}>{stats.completedHours}h</Text>
          <Text style={styles.statLabel}>Horas Completadas</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.statCard}>
          <MaterialIcons name="group" size={24} color="#3F51B5" />
          <Text style={styles.statNumber}>{stats.teamMembers}</Text>
          <Text style={styles.statLabel}>Miembros del Equipo</Text>
        </View>
        
        <View style={styles.statCard}>
          <MaterialIcons name="warning" size={24} color="#F44336" />
          <Text style={styles.statNumber}>{stats.overdueTasks}</Text>
          <Text style={styles.statLabel}>Tareas Vencidas</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.progressTitle}>Progreso General</Text>
        <View style={styles.progressContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${stats.projectProgress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{`${stats.projectProgress}%`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    padding: 15,
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  progressSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 16,
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
});