#!/usr/bin/env node
import React, { useState, useEffect } from 'react';
import { render } from 'ink';
import { Dashboard, StatWidget, TableWidget, LogWidget } from './index.js';

function LiveDashboard() {
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  const [requests, setRequests] = useState(0);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([
    { name: 'Alice', status: 'Online', requests: 42 },
    { name: 'Bob', status: 'Away', requests: 17 },
    { name: 'Charlie', status: 'Online', requests: 28 },
  ]);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random CPU/Memory
      setCpu(Math.floor(Math.random() * 100));
      setMemory((Math.random() * 4 + 1).toFixed(1));

      // Increment requests
      setRequests((prev) => prev + Math.floor(Math.random() * 10));

      // Add log entry
      const logMessages = [
        'Request received from 192.168.1.1',
        'Database query executed in 42ms',
        'Cache hit for user profile',
        'New connection established',
        'Response sent (200 OK)',
      ];
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${randomLog}`]);

      // Update user requests
      setUsers((prev) =>
        prev.map((user) => ({
          ...user,
          requests: user.requests + Math.floor(Math.random() * 3),
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const config = {
    title: '🚀 Live System Dashboard',
    layout: 'grid',
    widgets: [],
  };

  return React.createElement(
    Dashboard,
    { config },
    React.createElement(StatWidget, {
      label: 'CPU Usage',
      value: `${cpu}%`,
      color: cpu > 80 ? 'red' : 'green',
    }),
    React.createElement(StatWidget, {
      label: 'Memory',
      value: `${memory}GB`,
      color: 'yellow',
    }),
    React.createElement(StatWidget, {
      label: 'Requests',
      value: requests.toLocaleString(),
      color: 'cyan',
    }),
    React.createElement(TableWidget, { data: users }),
    React.createElement(LogWidget, { lines: logs, maxLines: 8 })
  );
}

render(React.createElement(LiveDashboard));
