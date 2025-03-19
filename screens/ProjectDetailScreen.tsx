import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
export default function ProjectDetailScreen({ route }: any) {
  const { project } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{project.name}</Text>
      <Text style={styles.description}>{project.description}</Text>
      <Text style={styles.deadline}>{`Plazo: ${project.deadline}`}</Text>
      {/* Additional project details and tasks can be added here */}
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  description: { fontSize: 16, marginBottom: 16 },
  deadline: { fontSize: 16, color: 'red' },
});