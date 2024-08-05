"use client";

import Navbar from "./components/navbar";
import PantryItem from "./components/pantryitem";
import { Box, Stack, Typography } from "@mui/material";

export default function Home() {
  const pantryItems = [
    { name: "milk" },
    { name: "water" },
    { name: "onion" },
    { name: "tomato" },
    { name: "apple" },
  ];

  return (
    <Box>
      <Navbar />
      <Box display={"flex"} alignItems="center" justifyContent="center">
        <Stack
          margin="20px"
          width="70%"
          border="1px black solid"
          boxShadow={10}
          borderRadius={2}
        >
          <Typography
            bgcolor="lightblue"
            padding="5px"
            textAlign="center"
            variant="h2"
            borderRadius={[2, 2, 0, 0]}
          >
            Pantry Manager
          </Typography>
          <Stack margin="10px" gap={2} overflow="auto">
            {pantryItems.map((item, index) => (
              <PantryItem key={index} item={item} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
