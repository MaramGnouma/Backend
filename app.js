const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Import des routes
//const cameraRoutes = require('./Routes/cameraRoutes');
//const montreRoutes = require('./Routes/montreRoutes');
const userRoutes = require('./Routers/AgentMissionRouter');
const equipementsRoutes = require('./Routers/equipementsRoutes');
const intervenantRoutes = require('./Routers/IntervenantRouter');
const notificationRoutes = require('./Routers/NotificationRouter');
const missionRoutes = require('./Routers/MissionEnCoursRouter');
const missionTRoutes = require('./Routers/MissionTermineeRouter');
const statistiquesRoutes = require('./Routers/StatistiqueRoutes');
const AuthentificationRoutes = require('./Routers/AuthentificationRouter');
const RapportRoutes = require('./Routers/RapportRouter');
const CameraRouter = require('./Routers/CameraRouter');
const MontreRouter = require('./Routers/MontreRouter');
const AdministrateurRouter = require('./Routers/AdministrateurRouter');


const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_URL = `${process.env.MONGO_URL}${MONGO_DB_NAME}?retryWrites=true&w=majority`;



// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}));
app.use(express.static('public'));

// Middleware pour configurer les en-têtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Autorise uniquement l'origine localhost:4200
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Configurations MongoDB
// Configurations MongoDB
mongoose.connect(MONGO_URL, { useNewUrlParser: true,  useUnifiedTopology: true });

// Écouter l'événement 'connected' pour afficher un message de succès
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Écouter l'événement 'error' pour afficher un message en cas d'erreur
mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB:', err);
});mongoose.set('strictQuery', false);

// Swagger Configuration
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:5000/' }]
  },
  apis: ['./Routers/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
//app.use(montreRoutes);
app.use(userRoutes);
app.use(equipementsRoutes);
app.use(intervenantRoutes);
app.use(notificationRoutes);
app.use(missionRoutes);
app.use(missionTRoutes);
app.use(statistiquesRoutes);
app.use(AuthentificationRoutes);
app.use(RapportRoutes);
app.use(CameraRouter);
app.use(MontreRouter);
app.use(AdministrateurRouter);

// Serveur HTTP écoute sur le port 4200
app.listen(PORT, () => {
  console.log("Server Started on port", PORT);
});


const Admin = require('./Models/Administrateur'); 
app.post("/login-admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.json({ error: "Admin Not found" });
    }
    if (await bcrypt.compare(password, admin.password)) {
      const token = jwt.sign({ email: admin.email }, JWT_SECRET, {
        expiresIn: "15m",
      });

      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    } else {
      res.json({ status: "error", error: "Invalid Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const heartbeatRoutes = require('./Routers/DonneesBiometriquesRouter');

app.use(express.json());

// Serveur Socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const heartbeatService = require('./Services/DonneesBiometriquesService');

// Middleware pour les fichiers statiques
app.use(express.static('public'));

// Routes
app.use('/', heartbeatRoutes);

// Serveur HTTP écoute sur le port 4200
server.listen(4200, () => {
  console.log('Serveur démarré sur le port 4200');
});
