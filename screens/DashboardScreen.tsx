import React, { useEffect, useState } from 'react';
import { useTheme } from '../components/ThemeContext';
import DataExportButton from '../components/DataExport';
import NotificationCenter from '../components/NotificationCenter';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNotifications } from '../components/NotificationService';
import { MaterialIcons } from '@expo/vector-icons';
import ProjectSummaryCard from '../components/ProjectSummaryCard';
import TasksList from '../components/TasksList';
import DashboardStats from '../components/DashboardStats';
import CalendarView from '../components/CalendarView';

export default function DashboardScreen({ navigation }: any) {
  const { addNotification, getUnreadCount } = useNotifications();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isNotificationCenterVisible, setNotificationCenterVisible] = useState(false);
  
  const styles = getStyles(isDarkMode);
  
  const stats = {
    totalProjects: 5,
    activeProjects: 3,
    pendingTasks: 8,
    completedTasks: 12,
    totalHours: 160,
    completedHours: 89,
    teamMembers: 8,
    upcomingDeadlines: 4,
    overdueTasks: 2,
    projectProgress: 65
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bienvenido, Usuario</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.themeButton}
            onPress={toggleTheme}
          >
            <MaterialIcons 
              name={isDarkMode ? "light-mode" : "dark-mode"} 
              size={24} 
              color="#2196F3" 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => navigation.navigate('Chat')}
          >
            <MaterialIcons name="chat" size={24} color="#2196F3" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => setNotificationCenterVisible(true)}
          >
            <MaterialIcons name="notifications" size={24} color="#2196F3" />
            {getUnreadCount() > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{getUnreadCount()}</Text>
              </View>
            )}
          </TouchableOpacity>
          <DataExportButton 
            data={{
              projects: [], // Add your actual data here
              tasks: [],
              stats: stats
            }}
          />
          <TouchableOpacity onPress={() => {/* TODO: Implement logout */}}>
            <MaterialIcons name="logout" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <DashboardStats stats={stats} />

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Proyectos Activos</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Projects')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <ProjectSummaryCard />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tareas Pendientes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Tasks')}>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <TasksList />
      </View>

      {/* Ejemplo de uso de notificaciones */}
      <TouchableOpacity 
        style={styles.notificationTestButton}
        onPress={() => {
          addNotification({
            title: 'Nueva tarea asignada',
            message: 'Se te ha asignado una nueva tarea en el Proyecto Alfa',
            type: 'info'
          });
        }}
      >
        <MaterialIcons name="notifications" size={24} color="white" />
        <Text style={styles.notificationTestButtonText}>Probar Notificación</Text>
      </TouchableOpacity>
      <NotificationCenter 
        visible={isNotificationCenterVisible}
        onClose={() => setNotificationCenterVisible(false)}
      />
    </ScrollView>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#fff',
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333' : '#e0e0e0',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#333',
  },
  themeButton: {
    padding: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
    marginRight: 10,
  },
  chatButton: {
    padding: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
    marginRight: 15,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#f44336',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#333',
  },
  seeAll: {
    color: '#2196F3',
    fontSize: 14,
  },
  notificationTestButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationTestButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});