import React from 'react';
import { Box, Text } from 'ink';

/**
 * SparklineWidget - Renders a mini line chart for time-series data
 * 
 * @param {string} label - Widget title
 * @param {number[]} data - Array of numeric values (time-series)
 * @param {number} width - Chart width in characters (default: 40)
 * @param {string} color - Chart color (default: 'green')
 * @param {boolean} showStats - Display min/max/avg stats (default: true)
 */
export default function SparklineWidget({ 
  label = 'Sparkline', 
  data = [], 
  width = 40, 
  color = 'green',
  showStats = true 
}) {
  if (!data || data.length === 0) {
    return React.createElement(
      Box,
      { borderStyle: 'round', borderColor: 'gray', padding: 1, width: width + 4 },
      React.createElement(
        Box,
        { flexDirection: 'column' },
        React.createElement(Text, { dimColor: true }, label),
        React.createElement(Text, { color: 'yellow' }, 'No data')
      )
    );
  }

  // Sparkline characters (Unicode block elements)
  const sparkChars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];
  
  // Normalize data and generate sparkline
  const sparkline = generateSparkline(data, width, sparkChars);
  
  // Calculate stats
  const min = Math.min(...data);
  const max = Math.max(...data);
  const avg = data.reduce((sum, val) => sum + val, 0) / data.length;
  const latest = data[data.length - 1];
  const trend = getTrend(data);

  return React.createElement(
    Box,
    { borderStyle: 'round', borderColor: color, padding: 1, width: width + 4 },
    React.createElement(
      Box,
      { flexDirection: 'column' },
      // Header: label + latest value + trend
      React.createElement(
        Box,
        { justifyContent: 'space-between', marginBottom: 1 },
        React.createElement(Text, { dimColor: true }, label),
        React.createElement(
          Box,
          { gap: 1 },
          React.createElement(Text, { bold: true, color }, formatValue(latest)),
          React.createElement(Text, { color: trend.color }, trend.arrow)
        )
      ),
      
      // Sparkline chart
      React.createElement(
        Box,
        { marginBottom: showStats ? 1 : 0 },
        React.createElement(Text, { color }, sparkline)
      ),
      
      // Stats footer (optional)
      showStats && React.createElement(
        Box,
        { justifyContent: 'space-between' },
        React.createElement(Text, { dimColor: true, fontSize: 10 }, `min: ${formatValue(min)}`),
        React.createElement(Text, { dimColor: true, fontSize: 10 }, `avg: ${formatValue(avg)}`),
        React.createElement(Text, { dimColor: true, fontSize: 10 }, `max: ${formatValue(max)}`)
      )
    )
  );
}

/**
 * Generate sparkline string from data
 */
function generateSparkline(data, width, chars) {
  // Sample data to fit width
  const sampled = sampleData(data, width);
  
  // Find min/max for normalization
  const min = Math.min(...sampled);
  const max = Math.max(...sampled);
  const range = max - min;
  
  // Edge case: all values the same
  if (range === 0) {
    return chars[Math.floor(chars.length / 2)].repeat(sampled.length);
  }
  
  // Map each value to a character
  return sampled
    .map(val => {
      const normalized = (val - min) / range;
      const index = Math.floor(normalized * (chars.length - 1));
      return chars[index];
    })
    .join('');
}

/**
 * Sample data array to fit target width
 */
function sampleData(data, targetWidth) {
  if (data.length <= targetWidth) {
    return data;
  }
  
  // Simple downsampling: take every Nth element
  const step = data.length / targetWidth;
  const sampled = [];
  for (let i = 0; i < targetWidth; i++) {
    const index = Math.floor(i * step);
    sampled.push(data[index]);
  }
  return sampled;
}

/**
 * Calculate trend from recent data
 */
function getTrend(data) {
  if (data.length < 2) {
    return { arrow: '→', color: 'gray' };
  }
  
  // Compare last value to average of previous 3 (or all if fewer)
  const latest = data[data.length - 1];
  const lookback = Math.min(3, data.length - 1);
  const prevSlice = data.slice(-lookback - 1, -1);
  const prevAvg = prevSlice.reduce((sum, val) => sum + val, 0) / prevSlice.length;
  
  const diff = latest - prevAvg;
  const threshold = prevAvg * 0.05; // 5% threshold
  
  if (diff > threshold) {
    return { arrow: '↗', color: 'green' };
  } else if (diff < -threshold) {
    return { arrow: '↘', color: 'red' };
  } else {
    return { arrow: '→', color: 'yellow' };
  }
}

/**
 * Format numeric value for display
 */
function formatValue(val) {
  if (val >= 1000) {
    return (val / 1000).toFixed(1) + 'k';
  }
  return val.toFixed(1);
}
