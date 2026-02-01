import React from 'react';
import { Box, Text } from 'ink';
import StatWidget from './widgets/StatWidget.js';
import TableWidget from './widgets/TableWidget.js';
import LogWidget from './widgets/LogWidget.js';

export { StatWidget, TableWidget, LogWidget };

export function Dashboard({ config, children }) {
  const { title, widgets = [], layout = 'grid' } = config;

  return React.createElement(
    Box,
    { flexDirection: 'column', padding: 1 },
    title &&
      React.createElement(
        Box,
        { marginBottom: 1, borderStyle: 'bold', borderColor: 'cyan', paddingX: 2 },
        React.createElement(Text, { bold: true, color: 'cyan' }, title)
      ),
    React.createElement(
      Box,
      { flexDirection: layout === 'grid' ? 'row' : 'column', flexWrap: 'wrap', gap: 1 },
      widgets.map((widget, idx) => React.createElement(Box, { key: idx }, renderWidget(widget))),
      children
    )
  );
}

function renderWidget(widget) {
  switch (widget.type) {
    case 'stat':
      return React.createElement(StatWidget, {
        label: widget.label,
        value: widget.value,
        color: widget.color,
      });
    case 'table':
      return React.createElement(TableWidget, { data: widget.data });
    case 'log':
      return React.createElement(LogWidget, { lines: widget.lines, maxLines: widget.maxLines });
    default:
      return React.createElement(Text, { color: 'red' }, `Unknown widget: ${widget.type}`);
  }
}
