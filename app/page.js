"use client";

import Navbar from "./components/navbar";
import PantryItem from "./components/pantryitem";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { firestore, auth } from "./firebaseconfig";

export default function Home() {
  const [user, setUser] = useState(null);
  const [pantryItems, setPantryItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const pantryDoc = firestore.collection("pantries").doc(user.uid);
        pantryDoc.onSnapshot((doc) => {
          if (doc.exists) {
            setPantryItems(doc.data().pantryItems);
          }
        });
      } else {
        setUser(null);
        setPantryItems([]);
      }
    });
    return unsubscribe;
  }, []);

  const handleCheckboxChange = (itemId) => {
    const newSelectedItems = {
      ...selectedItems,
    };
    if (newSelectedItems[itemId]) {
      delete newSelectedItems[itemId];
    } else {
      newSelectedItems[itemId] = true;
    }
    setSelectedItems(newSelectedItems);
  };

  const handleUpdateItem = (item, newItemName) => {
    const newPantryItems = pantryItems.map((i) => {
      if (i.id === item.id) {
        return {
          ...i,
          name: newItemName,
        };
      }
      return i;
    });
    setPantryItems(newPantryItems);
    const pantryDoc = firestore.collection("pantries").doc(user.uid);
    pantryDoc.update({
      pantryItems: newPantryItems,
    });
  };

  return (
    <Box>
      <Navbar />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Stack
          margin={20}
          width="70%"
          border="1px solid black"
          boxShadow={10}
          borderRadius="2"
        >
          <Typography
            bgcolor="lightblue"
            padding="5px"
            textAlign="center"
            variant="h2"
            borderRadius="2"
          >
            Pantry Manager
          </Typography>
          {user ? (
            <Stack>
              <Stack
                direction="row"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
                margin="10px"
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "lightblue",
                    color: "black",
                    ":hover": { bgcolor: "#9cc7d5" },
                  }}
                >
                  Add Item
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "lightblue",
                    color: "black",
                    ":hover": { bgcolor: "#9cc7d5" },
                  }}
                >
                  Remove Selected
                </Button>
              </Stack>
              <Stack margin="10px" gap={2} overflow="auto">
                {pantryItems.map((item, index) => (
                  <PantryItem
                    key={index}
                    item={item}
                    isSelected={selectedItems[item.id]}
                    onChange={() => handleCheckboxChange(item.id)}
                    updateItem={(item, newItemName) =>
                      handleUpdateItem(item, newItemName)
                    }
                  />
                ))}
              </Stack>
            </Stack>
          ) : (
            <Stack margin="10px" gap={2} overflow="auto">
              <Typography variant="h4" textAlign="center">
                Welcome to your Pantry Manager
              </Typography>
              <Typography variant="body1" textAlign="center">
                Please log in to access your pantry.
              </Typography>
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
