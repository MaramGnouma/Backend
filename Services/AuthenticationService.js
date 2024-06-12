
/*
const User = require('../Models/AgentMission');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const JWT_SECRET = "secret";

class AuthenticationService {
  constructor() {}

  async registerUser(userData) {
    const { name, genre, dateBirth, identificationMilitaire, adressePersonnelle, numeroTelephone, etatCivil, email, image, cv, dateEngagement, unitAffectation, experiences, specializations, certifications, competences, role, status, password } = userData;
  
    try {
      // Check if the user already exists
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        throw new Error("User already exists");
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = await User.create({
        name,
        genre,
        dateBirth,
        identificationMilitaire,
        adressePersonnelle,
        numeroTelephone,
        etatCivil,
        email,
        image,
        cv,
        dateEngagement,
        unitAffectation,
        experiences,
        specializations,
        certifications,
        competences,
        role,
        status,
        password: hashedPassword
    });
  
      // Remove the password from the sent result
      const { password: userPassword, ...data } = newUser.toJSON();
  
      // Return user data (without the password)
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  async loginUser(req, res) {
    const user = await User.findOne({email: req.body.email})
  
    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }
  
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }
  
    const token = jwt.sign({_id: user._id}, "secret")
  
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    const {...data } = user.toJSON();
    res.send({
        message: 'success',
        user:data
    })
  }
  

  async forgotPassword(email) {
    try {
      const oldUser = await User.findOne({ email });

      if (!oldUser) {
        return { status: "User Not Exists!!" };
      }

      const secret = process.env.JWT_SECRET + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "5m",
      });
      const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
      
      // You will send the email with the password reset link here

      return { status: "Email sent with reset link" };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(id, token, newPassword) {
    try {
      const oldUser = await User.findOne({ _id: id });
  
      if (!oldUser) {
        return { status: "User Not Exists!!" };
      }
  
      // Récupérer le mot de passe de l'utilisateur pour créer la clé secrète
      const secret = oldUser.password + process.env.JWT_SECRET;
  
      // Vérifier le token
      const verify = jwt.verify(token, secret);
  
      // Hasher le nouveau mot de passe
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
  
      // Mettre à jour le mot de passe de l'utilisateur dans la base de données
      await User.updateOne(
        { _id: id },
        { $set: { password: encryptedPassword } }
      );
  
      return { status: "Password reset successfully" };
    } catch (error) {
      throw error;
    }
  }
  
  async logout(req, res) {
    try {
        // Supprimer le cookie jwt
        res.clearCookie('jwt');

        res.send({
            message: 'Logout successful'
        });
    } catch (error) {
        res.status(500).send({
            message: 'An error occurred while logging out'
        });
    }
}

 
}

module.exports = AuthenticationService;
*/

const User = require('../Models/AgentMission');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const JWT_SECRET = "secret";

class AuthenticationService {
  constructor() {}

  async registerUser(userData) {
    const { name, genre, datebirth, idMilitaire, adresse, telephone, etatCivil, email, image, cv, dateEngagement, unitAffectation, experiences, specializations, certifications, competences, role, status, password } = userData;
  
    try {
      // Check if the user already exists
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        throw new Error("User already exists");
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = await User.create({
        name,
        genre,
        datebirth,
        idMilitaire,
        adresse,
        telephone,
        etatCivil,
        email,
        image,
        cv,
        dateEngagement,
        unitAffectation,
        experiences,
        specializations,
        certifications,
        competences,
        role,
        status,
        password: hashedPassword
    });
  
      // Remove the password from the sent result
      const { password: userPassword, ...data } = newUser.toJSON();
  
      // Return user data (without the password)
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  async loginUser(req, res) {
    const user = await User.findOne({email: req.body.email})
  
    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }
  
    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }
  
    const token = jwt.sign({_id: user._id}, "secret")
  
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    const {...data } = user.toJSON();
    res.send({
        message: 'success',
        user:data
    })
  }
  

  async forgotPassword(email) {
    try {
      const oldUser = await User.findOne({ email });

      if (!oldUser) {
        return { status: "User Not Exists!!" };
      }

      const secret = process.env.JWT_SECRET + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "5m",
      });
      const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
      
      // You will send the email with the password reset link here

      return { status: "Email sent with reset link" };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(id, token, newPassword) {
    try {
      const oldUser = await User.findOne({ _id: id });
  
      if (!oldUser) {
        return { status: "User Not Exists!!" };
      }
  
      // Récupérer le mot de passe de l'utilisateur pour créer la clé secrète
      const secret = oldUser.password + process.env.JWT_SECRET;
  
      // Vérifier le token
      const verify = jwt.verify(token, secret);
  
      // Hasher le nouveau mot de passe
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
  
      // Mettre à jour le mot de passe de l'utilisateur dans la base de données
      await User.updateOne(
        { _id: id },
        { $set: { password: encryptedPassword } }
      );
  
      return { status: "Password reset successfully" };
    } catch (error) {
      throw error;
    }
  }
  
  async logout(req, res) {
    try {
        // Supprimer le cookie jwt
        res.clearCookie('jwt');

        res.send({
            message: 'Logout successful'
        });
    } catch (error) {
        res.status(500).send({
            message: 'An error occurred while logging out'
        });
    }
}

 
}

module.exports = AuthenticationService;