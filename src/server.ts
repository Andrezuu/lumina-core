import app from './app';
import { ENV } from './config/env';

app.listen(ENV.PORT, () => {
  console.log(`\n🚀  Server running in [${ENV.NODE_ENV}] mode`);
  console.log(`📡  Listening on http://localhost:${ENV.PORT}${ENV.API_PREFIX}`);
});
