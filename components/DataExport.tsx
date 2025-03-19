import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { toast } from 'sonner-native';

interface ExportData {
  projects: any[];
  tasks: any[];
  stats: any;
  teamMembers?: any[];
  calendar?: any[];
  activityLog?: any[];
  settings?: any;
  customReports?: any[];
}

export const exportData = async (data: ExportData) => {
  try {
    const exportDate = new Date().toISOString().split('T')[0];
    const fileName = `project_management_export_${exportDate}.json`;
    const filePath = `${FileSystem.documentDirectory}${fileName}`;
    
    const jsonData = JSON.stringify(data, null, 2);
    await FileSystem.writeAsStringAsync(filePath, jsonData);
    
    await Sharing.shareAsync(filePath, {
      mimeType: 'application/json',
      dialogTitle: 'Exportar datos',
      UTI: 'public.json'
    });

    toast.success('Datos exportados exitosamente');
  } catch (error) {
    console.error('Error exporting data:', error);
    toast.error('Error al exportar datos');
  }
};

export default function DataExportButton({ data }: { data: ExportData }) {
  const handleExport = () => {
    exportData(data);
  };

  return (
    <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
      <MaterialIcons name="download" size={24} color="white" />
      <Text style={styles.exportButtonText}>Exportar Datos</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  exportButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});