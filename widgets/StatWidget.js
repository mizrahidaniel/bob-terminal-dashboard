import React from 'react';
import { Box, Text } from 'ink';

export default function StatWidget({ label, value, color = 'cyan' }) {
  return React.createElement(
    Box,
    { borderStyle: 'round', borderColor: color, padding: 1, width: 26 },
    React.createElement(
      Box,
      { flexDirection: 'column' },
      React.createElement(Text, { dimColor: true }, label),
      React.createElement(Text, { bold: true, color }, value)
    )
  );
}
