const AuthenticationService = require('../Services/AuthenticationService'); 

class AuthentificationController {
    constructor() {
      this.authenticationService = new AuthenticationService(); 
    }
  
    async register(req, res) {
      try {
        const userData = req.body;
        const user = await this.authenticationService.registerUser(userData); 
        res.json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async login(req, res) {
        try {
          const { email, password } = req.body;
          await this.authenticationService.loginUser(req, res); 
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }
  
    async forgotPassword(req, res) {
      const { email } = req.body;
      try {
        const result = await this.authenticationService.forgotPassword(email); 
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async resetPassword(req, res) {
      const { id, token } = req.params;
      const { password } = req.body;
      try {
        const result = await this.authenticationService.resetPassword(id, token, password); 
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    async logout(req, res) {
      try {
          await this.authenticationService.logout(req, res);
      } catch (error) {
          console.error(error);
          res.status(500).send({
              message: 'An error occurred while logging out'
          });
      }
  }
  
  }
  module.exports = AuthentificationController;
