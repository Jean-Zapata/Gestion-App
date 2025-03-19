import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (task: any) => void;
  initialData?: any;
}

export default function TaskForm({ onClose, onSubmit, initialData }: TaskFormProps) {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    project: initialData?.project || '',
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate || '',
    assignedTo: initialData?.assignedTo || '',
    estimatedHours: initialData?.estimatedHours || '',
  });

  const priorities = [
    { value: 'high', label: 'Alta', color: '#f44336' },
    { value: 'medium', label: 'Media', color: '#ff9800' },
    { value: 'low', label: 'Baja', color: '#4caf50' },
  ];

  const handleSubmit = () => {
    if (!formData.title || !formData.project || !formData.dueDate) {
      toast.error('Por favor completa los campos requeridos');
      return;
    }

    onSubmit(formData);
    onClose();
    toast.success(`Tarea ${initialData ? 'actualizada' : 'creada'} exitosamente`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {initialData ? 'Editar Tarea' : 'Nueva Tarea'}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => setFormData({...formData, title: text})}
            placeholder="Ingresa el título de la tarea"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({...formData, description: text})}
            placeholder="Describe la tarea"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Proyecto *</Text>
          <TextInput
            style={styles.input}
            value={formData.project}
            onChangeText={(text) => setFormData({...formData, project: text})}
            placeholder="Selecciona el proyecto"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Prioridad</Text>
          <View style={styles.priorityContainer}>
            {priorities.map((priority) => (
              <TouchableOpacity
                key={priority.value}
                style={[
                  styles.priorityButton,
                  formData.priority === priority.value && { backgroundColor: priority.color }
                ]}
                onPress={() => setFormData({...formData, priority: priority.value})}
              >
                <Text style={[
                  styles.priorityText,
                  formData.priority === priority.value && styles.priorityTextSelected
                ]}>
                  {priority.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha límite *</Text>
          <TextInput
            style={styles.input}
            value={formData.dueDate}
            onChangeText={(text) => setFormData({...formData, dueDate: text})}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Asignado a</Text>
          <TextInput
            style={styles.input}
            value={formData.assignedTo}
            onChangeText={(text) => setFormData({...formData, assignedTo: text})}
            placeholder="Nombre del responsable"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Horas estimadas</Text>
          <TextInput
            style={styles.input}
            value={formData.estimatedHours}
            onChangeText={(text) => setFormData({...formData, estimatedHours: text})}
            placeholder="Ej: 8"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <MaterialIcons name="check" size={24} color="white" />
          <Text style={styles.submitButtonText}>
            {initialData ? 'Actualizar Tarea' : 'Crear Tarea'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const getStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : 'white',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#333',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#2C2C2C' : 'white',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  priorityText: {
    color: '#666',
  },
  priorityTextSelected: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    gap: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});