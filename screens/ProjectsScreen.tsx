import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
 
interface Project {
  id: number;
  name: string;
  description: string;
  deadline: string;
}
 
export default function ProjectsScreen({ navigation }: any) {
  const [projects, setProjects] = useState<Project[]>([]);
 
  useEffect(() => {
    // TODO: Fetch projects from your backend API
    const dummyProjects: Project[] = [
      { id: 1, name: 'Proyecto Alfa', description: 'Descripción del proyecto Alfa', deadline: '2025-04-30' },
      { id: 2, name: 'Proyecto Beta', description: 'Descripción del proyecto Beta', deadline: '2025-05-15' },
    ];
    setProjects(dummyProjects);
  }, []);
 
  const renderItem = ({ item }: { item: Project }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProjectDetail', { project: item })}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.deadline}>{`Plazo: ${item.deadline}`}</Text>
    </TouchableOpacity>
  );
 
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{`Proyectos`}</Text>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  deadline: { marginTop: 8, color: 'red' },
});