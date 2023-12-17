import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState } from "react";

import Button from "./components/Button";
import Phase from "./components/Phase";
import { createStackNavigator } from "@react-navigation/stack";
import phasesData from "./data/phases.json";

const Stack = createStackNavigator();
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const App = () => {
  const [phases, setPhases] = useState(phasesData);

  const handleEditCard = (phaseId, editedCard) => {
    setPhases((prevPhases) =>
      prevPhases.map((phase) =>
        phase.id === phaseId
          ? { ...phase, cards: phase.cards.map((card) => (card.id === editedCard.id ? editedCard : card)) }
          : phase
      )
    );
  };

  const handleAddPhase = () => {
    const newPhase = {
      id: phases.length > 0 ? Math.max(...phases.map((phase) => phase.id)) + 1 : 1,
      title: 'New Phase',
      cards: [],
    };
    setPhases((prevPhases) => [...prevPhases, newPhase]);
  };

  const handleRemoveCard = (phaseId, cardId) => {
    setPhases((prevPhases) =>
      prevPhases.map((phase) =>
        phase.id === phaseId
          ? {
              ...phase,
              cards: phase.cards.filter((card) => card.id !== cardId),
            }
          : phase
      )
    );
  };

  const handleRemovePhase = (phaseId) => {
    setPhases((prevPhases) =>
      prevPhases.filter((phase) => phase.id !== phaseId)
    );
  };

  const handleAddCard = (phaseId, newCard) => {
    setPhases((prevPhases) =>
      prevPhases.map((phase) =>
        phase.id === phaseId ? { ...phase, cards: [...phase.cards, { ...newCard, id: phase.cards?.length + 1 }] } : phase
      )
    );
  };

  return (
    <ImageBackground
      source={require("./assets/background.jpg")}
      style={styles.backgroundImage}
      resizeMode="stretch"
    >
      <Text style={styles.title}>MW - TODO</Text>
      <ScrollView horizontal style={styles.container}>
      {phases.map((phase) => (
  <Phase key={phase.id} phase={phase} onEditCard={handleEditCard} onRemovePhase={handleRemovePhase} onAddCard={handleAddCard} onRemoveCard={handleRemoveCard} />
))}
        <Button title={"+ Add phase"} onPress={handleAddPhase} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 48,
    marginBottom: 6,
  },
  container: {
    margin: 5,
    gap: 10,
    marginRight: 16,
  },
  backgroundImage: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
