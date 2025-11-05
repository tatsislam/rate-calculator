import React, { useState } from "react";
import "./App.css";
import Button from "@atlaskit/button/new";
import { Box, Pressable, Stack, Text } from "@atlaskit/primitives";
import RetryIcon from "@atlaskit/icon/core/retry";
import Heading from "@atlaskit/heading";

function App() {
  const [counts, setCounts] = useState<Array<number>>([]);
  const [rate, setRate] = useState<number>(0);

  const addCount = () => {
    const newCounts =  [...counts, Date.now()];
    
    const intervals = newCounts.map((value, index) => {
      if (index === 0) return;
      return value - newCounts[index - 1];
    });
    
    const validIntervals = intervals.filter(
      (interval): interval is number => interval !== undefined
    );
    
    if (validIntervals.length > 0) {
      const averageInterval =
      validIntervals.reduce((a, b) => a + b, 0) / validIntervals.length;
      const calculatedRate = 60000 / averageInterval; // Convert to counts per minute
      setRate(calculatedRate);
    }
    console.log({ newCounts, intervals, validIntervals, rate });
    setCounts(newCounts);
  };

  const resetCounts = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCounts([]);
    setRate(0);
  };

  return (
    <Pressable
      onClick={addCount}
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Box padding="space.100">
        {counts.length === 0 ? (
          <Heading size={"small"}>Click anywhere to start counting!</Heading>
        ) : (
          <Stack>
            <Text>{counts.length} total counts</Text>
            <Text>{Math.round(rate)} counts per minute</Text>
            <Text>{Math.round(rate * 60)} counts per hour</Text>
          </Stack>
        )}
      </Box>
      <Box padding="space.100">
        <Button
          appearance="primary"
          onClick={resetCounts}
          iconBefore={RetryIcon}
        >
          Reset
        </Button>
      </Box>
      <Box>
        <Text as="p" color="color.text.subtle">
          Made by Tanvee
        </Text>
      </Box>
    </Pressable>
  );
}

export default App;
