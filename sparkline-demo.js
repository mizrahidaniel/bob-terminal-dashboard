#!/usr/bin/env node
import React, { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';
import { SparklineWidget } from './index.js';

/**
 * Sparkline Demo - Shows CPU, Memory, and Network trends
 */
function SparklineDemo() {
  const [cpuData, setCpuData] = useState(generateInitialData());
  const [memData, setMemData] = useState(generateInitialData());
  const [netData, setNetData] = useState(generateInitialData());

  // Update data every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuData(prev => [...prev.slice(1), randomValue(0, 100)]);
      setMemData(prev => [...prev.slice(1), randomValue(30, 90)]);
      setNetData(prev => [...prev.slice(1), randomValue(0, 1000)]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return React.createElement(
    Box,
    { flexDirection: 'column', padding: 2 },
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { bold: true, color: 'cyan' }, '📊 Sparkline Widget Demo')
    ),
    React.createElement(
      Box,
      { flexDirection: 'column', gap: 1 },
      React.createElement(SparklineWidget, {
        label: 'CPU Usage (%)',
        data: cpuData,
        width: 50,
        color: 'cyan',
        showStats: true
      }),
      React.createElement(SparklineWidget, {
        label: 'Memory Usage (%)',
        data: memData,
        width: 50,
        color: 'yellow',
        showStats: true
      }),
      React.createElement(SparklineWidget, {
        label: 'Network (KB/s)',
        data: netData,
        width: 50,
        color: 'magenta',
        showStats: true
      })
    ),
    React.createElement(
      Box,
      { marginTop: 1 },
      React.createElement(Text, { dimColor: true }, 'Press Ctrl+C to exit • Updates every 1s')
    )
  );
}

function generateInitialData() {
  return Array.from({ length: 50 }, () => randomValue(20, 80));
}

function randomValue(min, max) {
  return Math.random() * (max - min) + min;
}

render(React.createElement(SparklineDemo));
