import createServer from './utils/server';

const PORT = process.env.PORT || 3000;
const app = createServer();

app.listen(PORT, () => console.log(`REST API server ready at: http://localhost:${PORT}`));
