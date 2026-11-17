export function hello() {
  return 'demo-project-app';
}

// Minimal HTTP server to expose available slots
import http from 'node:http';
import { URL } from 'node:url';
import { getAvailableSlots } from './slots.js';

if (import.meta.url === `file://${process.argv[1]}`) {
  // When run directly, first log hello (existing behavior)
  console.log(hello());

  const PORT = 3000;
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      if (req.method !== 'GET' || url.pathname !== '/slots') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'error', message: 'Not found' }));
        return;
      }
      const durationParam = url.searchParams.get('duration');
      const durationMs = Number(durationParam);
      if (!durationParam || Number.isNaN(durationMs) || durationMs <= 0) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: 'error', message: 'Invalid duration' }));
        return;
      }
      const slots = await getAvailableSlots(durationMs);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: 'ok', data: slots }));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: 'error', message: err.message }));
    }
  });

  server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}
