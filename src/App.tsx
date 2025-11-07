import React, { useState } from "react";
import "./App.css";
import Button from "@atlaskit/button/new";
import { Box, Pressable, Stack, Text, xcss } from "@atlaskit/primitives";
import RetryIcon from "@atlaskit/icon/core/retry";
import Heading from "@atlaskit/heading";

const pageContainerStyle = xcss({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  position: "relative",
});

const clickContainerStyle = xcss({
  position: "absolute",
  top: "space.0",
  left: "space.0",
  height: "100%",
  width: "100%",
  zIndex: "1",
});

const contentContainerStyle = xcss({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const dataContainerStyle = xcss({
  zIndex: "card",
  padding: "space.200",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  pointerEvents: "none",
  gap: "space.200",
});

const buttonContainerStyle = xcss({
  pointerEvents: "auto",
});

const stackStyle = xcss({
  gap: "space.025",
  alignItems: "center",
});

const footerStyle = xcss({
  position: "absolute",
  bottom: "space.100",
  alignSelf: "center",
  zIndex: "card",
});

function App() {
  const [counts, setCounts] = useState<Array<number>>([]);
  const [rate, setRate] = useState<number>(0);

  const addCount = () => {
    const newCounts = [...counts, Date.now()];

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

    setCounts(newCounts);
  };

  const resetCounts = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCounts([]);
    setRate(0);
  };

  return (
    <Box xcss={pageContainerStyle}>
      <Pressable onClick={addCount} xcss={clickContainerStyle} />

      <Box testId="content-container" xcss={contentContainerStyle}>
        <Box testId="data-container" xcss={dataContainerStyle}>
          {counts.length === 0 ? (
            <Heading size={"small"}>Click anywhere to start counting!</Heading>
          ) : (
            <Stack xcss={stackStyle}>
              <Text>{counts.length} total counts</Text>
              <Text>{Math.round(rate * 10) / 10} counts per minute</Text>
              <Text>{Math.round(rate * 60)} counts per hour</Text>
            </Stack>
          )}
          <Box xcss={buttonContainerStyle}>
            <Button
              appearance="primary"
              onClick={resetCounts}
              iconBefore={RetryIcon}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
      <Box xcss={footerStyle}>
        <Text as="p" color="color.text.subtle">
          Made by Tanvee
        </Text>
      </Box>
    </Box>
  );
}

export default App;
