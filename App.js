import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim().length === 0) {
      Alert.alert("Eroare", "Te rog introdu un task valid!");
      return;
    }

    console.log("Adding task:", task);

    setTasks([...tasks, { id: Date.now().toString(), text: task }]);
    setTask("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.text}</Text>
      <TouchableOpacity
        onPress={() => handleDeleteTask(item.id)}
        style={styles.deleteButton}>
        <Text style={styles.deleteText}>Sterge</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <Text style={styles.title}>Lista mea de sarcini</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Adauga o sarcina noua"
          placeHolderTextColor="#eee"
        />
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    height: 50,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontWeight: "bold",
  },
  addButton: {
    width: 50, // Facem butonul pătrat
    height: 50, // Aceeași înălțime ca input-ul
    backgroundColor: "#007AFF",
    borderRadius: 8, // Același border radius ca input-ul
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between", // adăugăm asta pentru spațiere bună
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    marginRight: 10,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 6,
    minWidth: 60, // setăm o lățime minimă pentru buton
  },
  deleteText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center", // centrăm textul în buton
  },
});
