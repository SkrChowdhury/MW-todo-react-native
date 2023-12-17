import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Card = ({ card, onEdit, onRemove }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const [editedDescription, setEditedDescription] = useState(card.description);

  const handleEdit = () => {
    if (isEditing) {
      // Save changes and update the card
      onEdit({ ...card, title: editedTitle, description: editedDescription });
    }
    setEditing(!isEditing);
  };

  const handleRemove = () => {
    onRemove(card.id);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={editedTitle}
            onChangeText={setEditedTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={editedDescription}
            onChangeText={setEditedDescription}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{card.title}</Text>
          <Text style={styles.description}>{card.description}</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop:10
        }}
      >
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Text style={styles.textStyle}>{isEditing ? "Save" : "Edit"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
          <Text style={styles.textStyle}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 12,
  },
  editButton: {
    backgroundColor: "green",
    padding: 5,
    flexGrow: 1,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  removeButton: {
    backgroundColor: "red",
    padding: 5,
    flexGrow: 1,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  textStyle:{
textAlign:'center',
color:"#fff"
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
  },
});
export default Card;
