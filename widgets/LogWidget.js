import React from 'react';
import { Box, Text } from 'ink';

export default function LogWidget({ lines = [], maxLines = 10 }) {
  const displayLines = lines.slice(-maxLines);

  return React.createElement(
    Box,
    { borderStyle: 'round', borderColor: 'gray', padding: 1, width: 70, flexDirection: 'column' },
    React.createElement(Text, { bold: true, dimColor: true }, '📋 Logs'),
    React.createElement(Box, { marginTop: 1, flexDirection: 'column' },
      displayLines.length === 0
        ? React.createElement(Text, { dimColor: true }, 'No logs yet...')
        : displayLines.map((line, idx) =>
            React.createElement(
              Text,
              { key: idx, dimColor: idx < displayLines.length - 1 },
              line
            )
          )
    )
  );
}
