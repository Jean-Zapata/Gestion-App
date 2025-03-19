import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Event {
  id: string;
  title: string;
  date: string;
  type: 'task' | 'deadline' | 'meeting';
  description?: string;
}

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Reunión de proyecto',
      date: '2025-03-20',
      type: 'meeting',
      description: 'Revisión de avances del sprint'
    },
    {
      id: '2',
      title: 'Entrega de diseños',
      date: '2025-03-22',
      type: 'deadline',
      description: 'Mockups finales para el cliente'
    }
  ]);
  
  // Modal and form state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    type: 'task',
    description: ''
  });

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();
  
  // Array of day names
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Empty cells for the days before the first day of the month
  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getEventsForDay = (day: number) => {
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'task':
        return '#4CAF50';
      case 'deadline':
        return '#F44336';
      case 'meeting':
        return '#2196F3';
      default:
        return '#666';
    }
  };

  const handleDayPress = (day: number) => {
    setSelectedDay(day);
    setNewEvent({
      title: '',
      type: 'task',
      description: ''
    });
    setModalVisible(true);
  };

  const handleAddEvent = () => {
    if (!selectedDay || !newEvent.title) return;
    
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    
    const newEventData: Event = {
      id: Date.now().toString(),
      title: newEvent.title!,
      date: dateStr,
      type: newEvent.type as 'task' | 'deadline' | 'meeting',
      description: newEvent.description
    };
    
    setEvents([...events, newEventData]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            const newDate = new Date(selectedDate);
            newDate.setMonth(newDate.getMonth() - 1);
            setSelectedDate(newDate);
          }}
        >
          <MaterialIcons name="chevron-left" size={24} color="#666" />
        </TouchableOpacity>
        
        <Text style={styles.monthText}>
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
        
        <TouchableOpacity
          onPress={() => {
            const newDate = new Date(selectedDate);
            newDate.setMonth(newDate.getMonth() + 1);
            setSelectedDate(newDate);
          }}
        >
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Day names row */}
      <View style={styles.dayNamesRow}>
        {dayNames.map((dayName, index) => (
          <Text key={index} style={styles.dayNameText}>
            {dayName}
          </Text>
        ))}
      </View>

      <View style={styles.calendar}>
        {/* Empty cells for days before the first of the month */}
        {emptyCells.map((_, index) => (
          <View key={`empty-${index}`} style={styles.emptyDay} />
        ))}
        
        {/* Days of the month */}
        {days.map(day => {
          const dayEvents = getEventsForDay(day);
          const isCurrentDay = 
            day === new Date().getDate() && 
            selectedDate.getMonth() === new Date().getMonth() && 
            selectedDate.getFullYear() === new Date().getFullYear();
            
          return (
            <TouchableOpacity 
              key={day}
              style={[
                styles.day,
                dayEvents.length > 0 && styles.dayWithEvents,
                isCurrentDay && styles.currentDay
              ]}
              onPress={() => handleDayPress(day)}
            >
              <Text style={[
                styles.dayText,
                isCurrentDay && styles.currentDayText
              ]}>
                {day}
              </Text>
              {dayEvents.length > 0 && (
                <View style={styles.eventDotsContainer}>
                  {dayEvents.map((event, index) => (
                    index < 3 && (
                      <View 
                        key={event.id}
                        style={[
                          styles.eventDot,
                          { backgroundColor: getEventColor(event.type) }
                        ]}
                      />
                    )
                  ))}
                  {dayEvents.length > 3 && (
                    <Text style={styles.moreEventsText}>+{dayEvents.length - 3}</Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>Tareas</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
          <Text style={styles.legendText}>Deadlines</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#2196F3' }]} />
          <Text style={styles.legendText}>Reuniones</Text>
        </View>
      </View>

      {/* Add Event Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Añadir evento para el {selectedDay} de {selectedDate.toLocaleString('default', { month: 'long' })}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Título del evento"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({...newEvent, title: text})}
            />
            
            <Text style={styles.inputLabel}>Tipo de evento:</Text>
            <View style={styles.typeButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  newEvent.type === 'task' && styles.selectedTypeButton,
                  { backgroundColor: newEvent.type === 'task' ? '#4CAF50' : '#f5f5f5' }
                ]}
                onPress={() => setNewEvent({...newEvent, type: 'task'})}
              >
                <Text style={[
                  styles.typeButtonText,
                  newEvent.type === 'task' && styles.selectedTypeButtonText
                ]}>Tarea</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  newEvent.type === 'deadline' && styles.selectedTypeButton,
                  { backgroundColor: newEvent.type === 'deadline' ? '#F44336' : '#f5f5f5' }
                ]}
                onPress={() => setNewEvent({...newEvent, type: 'deadline'})}
              >
                <Text style={[
                  styles.typeButtonText,
                  newEvent.type === 'deadline' && styles.selectedTypeButtonText
                ]}>Deadline</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  newEvent.type === 'meeting' && styles.selectedTypeButton,
                  { backgroundColor: newEvent.type === 'meeting' ? '#2196F3' : '#f5f5f5' }
                ]}
                onPress={() => setNewEvent({...newEvent, type: 'meeting'})}
              >
                <Text style={[
                  styles.typeButtonText,
                  newEvent.type === 'meeting' && styles.selectedTypeButtonText
                ]}>Reunión</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descripción (opcional)"
              value={newEvent.description}
              onChangeText={(text) => setNewEvent({...newEvent, description: text})}
              multiline={true}
              numberOfLines={4}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddEvent}
              >
                <Text style={[styles.modalButtonText, styles.saveButtonText]}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dayNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dayNameText: {
    width: '13%',
    textAlign: 'center',
    fontWeight: '500',
    color: '#666',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  day: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    margin: '0.5%',
  },
  emptyDay: {
    width: '13%',
    aspectRatio: 1,
    margin: '0.5%',
    backgroundColor: 'transparent',
  },
  dayWithEvents: {
    backgroundColor: '#e3f2fd',
  },
  currentDay: {
    backgroundColor: '#bbdefb',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  currentDayText: {
    fontWeight: 'bold',
    color: '#1565c0',
  },
  eventDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  moreEventsText: {
    fontSize: 8,
    color: '#666',
    marginLeft: 2,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  typeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: 5,
  },
  selectedTypeButton: {
    borderWidth: 2,
    borderColor: '#333',
  },
  typeButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedTypeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButtonText: {
    color: 'white',
  }
});