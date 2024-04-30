
import authRouter from './auth/auth.router.js';
import connectDB from '../../DB/connection.js';
import { globalerrorhandler } from '../utils/errorHanding.js';

const initapp = async (app, express) => {
  app.use(express.json());
  connectDB();
  app.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome.." });
  });
  app.use('/auth', authRouter);
  app.get('*', (req, res) => {
    return res.status(500).json({ message: "Page not found.." });
  });
  app.use(globalerrorhandler);
}
export default initapp;