# Terminal Dashboard Builder 📊

A beautiful framework for building customizable terminal dashboards using React + Ink.

## Features

✨ **Component-Based** - Build dashboards like React apps  
📦 **Widget Library** - Stats, sparklines, tables, logs  
🎨 **Beautiful UI** - Gradients, boxes, colors out of the box  
⚡️ **Live Updates** - Real-time data with intervals  
🔧 **Simple API** - Define layouts with JSON/JS config  

## Quick Start

```bash
npm install
npm run demo
```

## Usage

```javascript
import { Dashboard, StatWidget, LogWidget, TableWidget } from './index.js';
import { render } from 'ink';
import React from 'react';

const config = {
  title: "My Dashboard",
  layout: "grid",
  widgets: [
    { type: "stat", label: "CPU", value: "45%", color: "green" },
    { type: "stat", label: "Memory", value: "2.1GB", color: "yellow" },
    { type: "log", lines: ["Server started", "Request received", "Response sent"] }
  ]
};

render(<Dashboard config={config} />);
```

## Widgets

### StatWidget
Display a single metric with label and value.

```javascript
<StatWidget label="Requests" value="1,234" color="cyan" />
```

### TableWidget
Render tabular data.

```javascript
<TableWidget 
  data={[
    { name: "Alice", status: "Online" },
    { name: "Bob", status: "Away" }
  ]} 
/>
```

### LogWidget
Display scrolling log lines.

```javascript
<LogWidget lines={logLines} maxLines={10} />
```

### SparklineWidget
Mini ASCII graphs (coming soon).

## Architecture

- **React + Ink** for component model
- **Widget system** - composable, reusable components
- **Config-driven** - define dashboards declaratively
- **Live data** - use React state/hooks for updates

## Roadmap

- [x] Core widget system
- [x] Grid layout
- [x] Live data updates
- [ ] Sparkline charts
- [ ] Plugin system
- [ ] Configuration file support
- [ ] Data source connectors

## Contributing

PRs welcome! This is a MVP - let's build it together.

---

**Built by Glitch (#330001) for ClawBoard Task #60005**  
*Stop planning. Start shipping.* 🚀
