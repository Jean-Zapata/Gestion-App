import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext'; // Asegúrate de que la ruta sea la correcta

// Componente TaskForm
type TaskPriority = 'low' | 'medium' | 'high';

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (task: any) => void;
  initialValues?: any;
}

function TaskForm({ onClose, onSubmit, initialValues }: TaskFormProps) {
  const { isDarkMode } = useTheme();
  const styles = getFormStyles(isDarkMode);

  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(initialValues?.priority || 'medium');
  const [dueDate, setDueDate] = useState(initialValues?.dueDate || '');

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      priority,
      dueDate,
      status: initialValues?.status || 'pending',
      createdAt: initialValues?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {initialValues ? 'Editar Tarea' : 'Nueva Tarea'}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Título de la tarea"
          placeholderTextColor={isDarkMode ? "#ccc" : "#999"}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción de la tarea"
          placeholderTextColor={isDarkMode ? "#ccc" : "#999"}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Prioridad</Text>
        <View style={styles.priorityContainer}>
          <TouchableOpacity
            style={[
              styles.priorityButton,
              priority === 'low' && styles.priorityButtonActive,
              { backgroundColor: priority === 'low' ? '#8BC34A' : '#f0f0f0' }
            ]}
            onPress={() => setPriority('low')}
          >
            <Text style={[
              styles.priorityButtonText,
              priority === 'low' && styles.priorityButtonTextActive
            ]}>Baja</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.priorityButton,
              priority === 'medium' && styles.priorityButtonActive,
              { backgroundColor: priority === 'medium' ? '#FFC107' : '#f0f0f0' }
            ]}
            onPress={() => setPriority('medium')}
          >
            <Text style={[
              styles.priorityButtonText,
              priority === 'medium' && styles.priorityButtonTextActive
            ]}>Media</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.priorityButton,
              priority === 'high' && styles.priorityButtonActive,
              { backgroundColor: priority === 'high' ? '#F44336' : '#f0f0f0' }
            ]}
            onPress={() => setPriority('high')}
          >
            <Text style={[
              styles.priorityButtonText,
              priority === 'high' && styles.priorityButtonTextActive
            ]}>Alta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Fecha de vencimiento</Text>
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="DD/MM/YYYY"
          placeholderTextColor={isDarkMode ? "#ccc" : "#999"}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.submitButton, !title && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!title}
          >
            <Text style={styles.submitButtonText}>
              {initialValues ? 'Actualizar' : 'Crear'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Componente TasksScreen
export default function TasksScreen({ navigation }: any) {
  const { isDarkMode } = useTheme();
  const styles = getScreenStyles(isDarkMode);
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tareas</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Nueva Tarea</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.activeFilterText}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Pendientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>En Progreso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Completadas</Text>
        </TouchableOpacity>
      </View>

      {/* Aquí se mostraría la lista de tareas */}
      {/* <TasksList /> */}

      <Modal
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TaskForm 
          onClose={() => setModalVisible(false)}
          onSubmit={(task) => {
            // Aquí implementarías la lógica para crear la tarea
            console.log('Nueva tarea:', task);
            setModalVisible(false);
          }}
        />
      </Modal>
    </View>
  );
}

// Estilos para TasksScreen
const getScreenStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
  },
  activeFilter: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    color: '#666',
  },
  activeFilterText: {
    color: 'white',
  }
});

// Estilos para TaskForm
const getFormStyles = (isDarkMode: boolean) => StyleSheet.create({
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#333',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    color: isDarkMode ? '#ddd' : '#333',
  },
  input: {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    borderWidth: 1,
    borderColor: isDarkMode ? '#444' : '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: isDarkMode ? '#fff' : '#333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  priorityButtonActive: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  priorityButtonText: {
    fontWeight: '600',
    color: '#333',
  },
  priorityButtonTextActive: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: isDarkMode ? '#333' : '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: isDarkMode ? '#fff' : '#333',
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#90CAF9',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
