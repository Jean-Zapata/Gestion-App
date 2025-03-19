import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SidebarProps {
  navigation: any;
  currentRoute: string;
}

export default function Sidebar({ navigation, currentRoute }: SidebarProps) {
  const { isDarkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: 'Dashboard' },
    { name: 'Proyectos', icon: 'folder', route: 'Projects' },
    { name: 'Tareas', icon: 'assignment', route: 'Tasks' },
    { name: 'Calendario', icon: 'event', route: 'Calendar' },
    { name: 'Chat', icon: 'chat', route: 'Chat' },
  ];

  return (
    <View style={[
      styles.container,
      isDarkMode && { backgroundColor: '#1a1a1a', borderRightColor: '#333' },
      isCollapsed && styles.collapsedContainer
    ]}>
      <View style={styles.header}>
        {!isCollapsed && <Text style={styles.title}>Gestión Pro</Text>}
        <TouchableOpacity 
          style={styles.collapseButton}
          onPress={() => setIsCollapsed(!isCollapsed)}
        >
          <MaterialIcons 
            name={isCollapsed ? 'chevron-right' : 'chevron-left'} 
            size={24} 
            color={isDarkMode ? '#fff' : '#666'}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            style={[
              styles.menuItem,
              currentRoute === item.route && styles.activeMenuItem
            ]}
            onPress={() => navigation.navigate(item.route)}
          >
            <MaterialIcons
              name={item.icon}
              size={24}
              color={currentRoute === item.route ? '#2196F3' : '#666'}
            />
            {!isCollapsed && (
              <Text style={[
                styles.menuText,
                currentRoute === item.route && styles.activeMenuText
              ]}>
                {item.name}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    height: '100%',
    transition: 'width 0.3s ease',
  },
  collapsedContainer: {
    width: 70,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  collapseButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menu: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 10,
  },
  activeMenuItem: {
    backgroundColor: '#f5f5f5',
  },
  menuText: {
    fontSize: 16,
    color: '#666',
  },
  activeMenuText: {
    color: '#2196F3',
    fontWeight: '600',
  },
});