
/*
const User = require('../Models/AgentMission');
const Mission = require('../Models/MissionEnCours');
const MissionTerminee = require('../Models/MissionTerminee');
const bcrypt = require("bcryptjs");

class AgentMissionService {

    // Crée un nouvel utilisateur avec les données fournies et retourne un statut
    async createUser(userData) {
        const { name, genre, datebirth, idMilitaire, adresse, numeroTelephone, etatCivil, email, image, cv, dateEngagement, unitAffectation, experiences, specializations, certifications, competences, role, status, password } = userData;

        const encryptedPassword = await bcrypt.hash(password, 10);
        try {
            const oldUser = await User.findOne({ email });

            if (oldUser) {
                return { status: "error", message: "User Exists" };
            }

            const newUser = new User({
                name,
                genre,
                datebirth,
                idMilitaire,
                adresse,
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
                password: encryptedPassword
            });

            await newUser.save();

            return { status: "ok" };
        } catch (error) {
            return { status: "error", message: error.message };
        }
    }

    // Accepte un utilisateur en mettant à jour son statut à "Accepted"
    async acceptUser(userId) {
        try {
            const user = await User.findByIdAndUpdate(userId, { status: 'Accepted' }, { new: true });
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
    
            const missionsDeleted = await Mission.deleteMany({ 
                $or: [
                    { Responsable: userId }, 
                    { user: userId }
                ]
            });
            console.log(`${missionsDeleted.deletedCount} missions directes supprimées pour l'utilisateur ${userId}`);    

            const deletedMissions = await MissionTerminee.deleteMany({ 
                $or: [
                    { Responsable: userId }, 
                    { user: userId }
                ]
            });
            console.log(`${deletedMissions.deletedCount} missions terminées supprimées pour l'utilisateur ${userId}`);    
            return { user };
        } catch (error) {
            throw error;
        }
    }
    
    // Met à jour un utilisateur avec les nouvelles données fournies
    async updateUser(userId, userData) {
        try {
            const user = await User.findByIdAndUpdate(userId, userData, { new: true });
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Récupère tous les utilisateurs sans leurs mots de passe
    async getAllUsers() {
        try {
            const users = await User.find({}).select('-password');
            return users;
        } catch (error) {
            throw error;
        }
    }

    // Récupère un utilisateur par son ID sans son mot de passe
    async getUserById(userId) {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Récupère tous les utilisateurs ayant un rôle spécifique
    async getUsersByRole(role) {
        try {
            const users = await User.find({ role });
            return users;
        } catch (error) {
            throw error;
        }
    }

    // Recherche des utilisateurs par nom avec une expression régulière
    async searchUser(query) {
        try {
            const users = await User.find({ name: { $regex: new RegExp(query, 'i') } });
            return users;
        } catch (error) {
            console.error('Erreur lors de la recherche de user :', error);
            throw new Error('Erreur interne du serveur');
        }
    }

    // Récupère les notifications d'un utilisateur par son ID
    async getUserNotifications(userId) {
        try {
            const user = await User.findById(userId).populate('notifications');
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            const notifications = user.notifications;
            return notifications;
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications:', error);
            throw error;
        }
    }

    // Récupère les missions associées à un utilisateur par son ID
    async getMissionsByUser(id) {
        try {
            const missions = await Mission.find({ 
                $or: [
                    { controller: id },
                    { Responsable: id },
                    { intervenants: id }
                ]
            }).populate('controller').populate('Responsable').populate('intervenants').populate('equipements.equipementId');
            return missions;
        } catch (error) {
            console.error('Error retrieving missions by user:', error);
            throw error;
        }
    }
}

module.exports = new AgentMissionService();

*/

const User = require('../Models/AgentMission');
const Mission = require('../Models/MissionEnCours');
const MissionTerminee = require('../Models/MissionTerminee');
const bcrypt = require("bcryptjs");

class AgentMissionService {

    // Crée un nouvel utilisateur avec les données fournies et retourne un statut
    async createUser(userData) {
        const { name, genre, datebirth, idMilitaire, adresse, telephone, etatCivil, email, image, cv, dateEngagement, unitAffectation, experiences, specializations, certifications, competences, role, status, password } = userData;

        const encryptedPassword = await bcrypt.hash(password, 10);
        try {
            const oldUser = await User.findOne({ email });

            if (oldUser) {
                return { status: "error", message: "User Exists" };
            }

            const newUser = new User({
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
                password: encryptedPassword
            });

            await newUser.save();

            return { status: "ok" };
        } catch (error) {
            return { status: "error", message: error.message };
        }
    }
  

    // Accepte un utilisateur en mettant à jour son statut à "Accepted"
    async acceptUser(userId) {
        try {
            const user = await User.findByIdAndUpdate(userId, { status: 'Accepted' }, { new: true });
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
    
            const missionsDeleted = await Mission.deleteMany({ 
                $or: [
                    { Responsable: userId }, 
                    { user: userId }
                ]
            });
            console.log(`${missionsDeleted.deletedCount} missions directes supprimées pour l'utilisateur ${userId}`);    

            const deletedMissions = await MissionTerminee.deleteMany({ 
                $or: [
                    { Responsable: userId }, 
                    { user: userId }
                ]
            });
            console.log(`${deletedMissions.deletedCount} missions terminées supprimées pour l'utilisateur ${userId}`);    
            return { user };
        } catch (error) {
            throw error;
        }
    }
    
    // Met à jour un utilisateur avec les nouvelles données fournies
    async updateUser(userId, userData) {
        try {
            const user = await User.findByIdAndUpdate(userId, userData, { new: true });
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Récupère tous les utilisateurs sans leurs mots de passe
    async getAllUsers() {
        try {
            const users = await User.find({}).select('-password');
            return users;
        } catch (error) {
            throw error;
        }
    }

    // Récupère un utilisateur par son ID sans son mot de passe
    async getUserById(userId) {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Récupère tous les utilisateurs ayant un rôle spécifique
    async getUsersByRole(role) {
        try {
            const users = await User.find({ role });
            return users;
        } catch (error) {
            throw error;
        }
    }

    // Recherche des utilisateurs par nom avec une expression régulière
    async searchUser(query) {
        try {
            const users = await User.find({ name: { $regex: new RegExp(query, 'i') } });
            return users;
        } catch (error) {
            console.error('Erreur lors de la recherche de user :', error);
            throw new Error('Erreur interne du serveur');
        }
    }

    // Récupère les notifications d'un utilisateur par son ID
    async getUserNotifications(userId) {
        try {
            const user = await User.findById(userId).populate('notifications');
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            const notifications = user.notifications;
            return notifications;
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications:', error);
            throw error;
        }
    }

    // Récupère les missions associées à un utilisateur par son ID
    async getMissionsByUser(id) {
        try {
            const missions = await Mission.find({ 
                $or: [
                    { controller: id },
                    { Responsable: id },
                    { intervenants: id }
                ]
            }).populate('controller').populate('Responsable').populate('intervenants').populate('equipements.equipementId');
            return missions;
        } catch (error) {
            console.error('Error retrieving missions by user:', error);
            throw error;
        }
    }
}

module.exports = new AgentMissionService();