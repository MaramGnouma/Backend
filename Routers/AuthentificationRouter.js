const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../Models/AgentMission"); // Assurez-vous que le modèle User est correctement importé.

const AuthentificationController = require('../Controllers/AuthentificationController');
const JWT_SECRET = process.env.JWT_SECRET || "secret"; // Utilisez une variable d'environnement pour JWT_SECRET

const router = express.Router();
const authController = new AuthentificationController();

const authenticateToken = (req, res, next) => {
    const token = req.cookies['jwt'] || req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Missing token' });
    }
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.user = user;
      next();
    });
};

router.post('/register', async (req, res) => {
  await authController.register(req, res);
});

router.post('/login', async (req, res) => {
  await authController.login(req, res);
});

router.post('/logout', async (req, res) => {
  await authController.logout(req, res);
});

router.get('/user', authenticateToken, async (req, res) => {
    const user = req.user;
    res.json({ message: 'Authorized access', user });
});

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})
    res.send({ message: 'success' });
});

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = JWT_SECRET + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "5m" });
      const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "nourfarhat699@gmail.com",
          pass: "ezae cdix tqmu dgra",
        }, 
      });
  
      var mailOptions = {
        from: "nourghizaoui01@gmail.com",
        to: email,
        subject: "Password Reset",
        text: link,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ status: "Failed to send email" });
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ status: "Email sent successfully" });
        }
      });
      console.log(link);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "Internal Server Error" });
    }
});

router.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
});

router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.updateOne({ _id: id }, { $set: { password: encryptedPassword } });
      res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
      console.error(error);
      res.json({ status: "Something Went Wrong" });
    }
});


const Admin = require('../Models/Administrateur'); 
router.post('/loginAdmin', async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });

  if (!admin) {
    return res.status(404).send({
      message: 'Admin not found'
    });
  }

  if (!await bcrypt.compare(req.body.password, admin.password)) {
    return res.status(400).send({
      message: 'Invalid credentials'
    });
  }

  const token = jwt.sign({ _id: admin._id }, "secret");

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  const { ...data } = admin.toJSON();
  res.send({
    message: 'Success',
    admin: data,
    token: token
  });
});
function authenticateTokenAdmin(req, res, next) {
  // Récupérer le jeton JWT du cookie ou de l'en-tête Authorization
  const token = req.cookies['jwt'] || req.headers['authorization']?.split(' ')[1];

  // Si le jeton est manquant, renvoyer une réponse avec le statut 401 (Non autorisé)
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  // Vérifier si le jeton est valide
  jwt.verify(token, 'secret', async (err, decodedToken) => {
    // Si une erreur se produit ou si le jeton n'est pas valide, renvoyer une réponse avec le statut 403 (Interdit)
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    try {
      // Récupérer l'utilisateur à partir de votre source de données en utilisant l'ID stocké dans decodedToken
      const user = await User.findById(decodedToken._id);

      // Vérifier si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Ajouter les informations utilisateur (y compris fname) à l'objet req et passer à l'étape suivante du middleware
      req.user = user;
      next();
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
}

router.get('/userr', authenticateTokenAdmin, async (req, res) => {
  // Si le jeton est valide, vous pouvez accéder aux informations utilisateur à partir de req.user
  const user = req.user;
  res.json({ message: 'Authorized access' , user});
});

router.post('/logoutAdmin', (req, res) => {
  res.cookie('jwt', '', {maxAge: 0})

  res.send({
      message: 'success'
  })
})

module.exports = router;
