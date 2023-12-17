import { ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "./Button";
import Card from "./Card";
import React from "react";
import { Button as RnButton } from "react-native";

const Phase = ({
  phase,
  onEditCard,
  onRemovePhase,
  onAddCard,
  onRemoveCard,
}) => {
  const handleRemoveCard = (cardId) => {
    onRemoveCard(phase.id, cardId);
  };
  const handleAddCard = () => {
    const newCard = {
      id: phase.cards.length + 1,
      title: "Card Name",
      description: "Card Description",
    };
    onAddCard(phase.id, newCard);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{phase.title}</Text>
          <RnButton
            title="..."
            color={"#fff"}
            onPress={() => onRemovePhase(phase.id)}
          />
        </View>

        <ScrollView>
          {phase.cards?.map((card) => (
            <Card
              key={card.id}
              card={card}
              onEdit={(editedCard) => onEditCard(phase.id, editedCard)}
              onRemove={handleRemoveCard}
            />
          ))}
          <Button title={"+ Add card"} onPress={handleAddCard} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  option: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Phase;
