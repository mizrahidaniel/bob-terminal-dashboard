import React from 'react';
import { Box, Text } from 'ink';

export default function TableWidget({ data = [] }) {
  if (data.length === 0) {
    return React.createElement(
      Box,
      { borderStyle: 'round', padding: 1 },
      React.createElement(Text, { dimColor: true }, 'No data')
    );
  }

  const keys = Object.keys(data[0]);
  const colWidth = 15;

  return React.createElement(
    Box,
    { borderStyle: 'round', borderColor: 'blue', padding: 1, flexDirection: 'column' },
    // Header
    React.createElement(
      Box,
      null,
      keys.map((key) =>
        React.createElement(
          Box,
          { key, width: colWidth },
          React.createElement(Text, { bold: true, color: 'blue' }, key.toUpperCase())
        )
      )
    ),
    // Rows
    ...data.map((row, idx) =>
      React.createElement(
        Box,
        { key: idx },
        keys.map((key) =>
          React.createElement(Box, { key, width: colWidth }, React.createElement(Text, null, String(row[key])))
        )
      )
    )
  );
}
