const MissionTerminees = require('../Models/MissionTerminee');

class StatistiquesService {
  constructor() {}

  async getMissionStatsByType() {
    try {
      const statsByType = await MissionTerminees.aggregate([
        { $group: { _id: '$typemission', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
      return statsByType;
    } catch (error) {
      console.error('Error getting mission statistics by type:', error);
      throw error;
    }
  } 
  async getMissionStatsByResponsableAndResult() {
    try {
      const statsByResponsableAndResult = await MissionTerminees.aggregate([
        { 
          $group: { 
            _id: { responsable: '$Responsable', result: '$resultat' }, 
            count: { $sum: 1 } 
          } 
        },
        {
          $lookup: {
            from: 'agentmissions', // Nom de la collection des utilisateurs
            localField: '_id.responsable',
            foreignField: '_id',
            as: 'responsableData'
          }
        },
        {
          $addFields: {
            responsableName: { $arrayElemAt: ['$responsableData.name', 0] }
          }
        },
        {
          $project: {
            _id: 0, // Exclure l'identifiant de la réponse
            responsable: '$_id.responsable',
            responsableName: 1,
            results: [{ result: '$_id.result', count: '$count' }]
          }
        },
        {
          $group: {
            _id: { responsable: '$responsable', responsableName: '$responsableName' },
            results: { $push: '$results' }
          }
        },
        {
          $project: {
            _id: 0,
            responsable: '$_id.responsable',
            responsableName: '$_id.responsableName',
            results: 1
          }
        },
        { $sort: { responsable: 1 } }
      ]);
      return statsByResponsableAndResult;
    } catch (error) {
      console.error('Error getting mission statistics by responsable and result:', error);
      throw error;
    }
  }
  
  

  async getAverageMissionDuration() {
    try {
      const missions = await MissionTerminees.find();
      const totalDuration = missions.reduce((acc, mission) => {
        const duration = mission.dateFin - mission.datedebut; // Durée en millisecondes
        return acc + duration;
      }, 0);
      const averageDuration = totalDuration / missions.length; // Durée moyenne en millisecondes
      return averageDuration;
    } catch (error) {
      console.error('Error calculating average mission duration:', error);
      throw error;
    }
  }
  async getAverageSuccessRateByType() {
    try {
        const averageSuccessAndFailureRateByType = await MissionTerminees.aggregate([
            // Regrouper les missions par type de mission
            {
                $group: {
                    _id: '$typemission',
                    totalSuccess: { $sum: '$rate' }, // Somme des taux de succès pour chaque type de mission
                    totalFailure: { $sum: { $subtract: [100, '$rate'] } }, // Somme des taux d'échec pour chaque type de mission
                    totalMissions: { $sum: 1 } // Total des missions pour chaque type de mission
                }
            },
            // Calculer le taux de succès et le taux d'échec pour chaque type de mission
            {
                $project: {
                    _id: 1,
                    successRate: { $multiply: [{ $divide: ['$totalSuccess', '$totalMissions'] }, 1] }, // Calcul du taux de succès en pourcentage
                    failureRate: { $multiply: [{ $divide: ['$totalFailure', '$totalMissions'] }, 1] }, // Calcul du taux d'échec en pourcentage
                    totalMissions: 1 // Inclure le nombre total de missions pour chaque type de mission
                }
            }
        ]);
        return averageSuccessAndFailureRateByType;
    } catch (error) {
        console.error('Error calculating average success and failure rate by mission type:', error);
        throw error;
    }
}

  
  
   
  
  
  async getResultsDistributionByPeriod(period) {
    try {
      const missions = await MissionTerminees.find();
      
      // Filtrer les missions selon le période spécifié (mois ou trimestre)
      const filteredMissions = missions.filter(mission => {
        const missionDate = mission.dateFin;
        if (period === 'month') {
          // Extraire le mois de la date de fin de la mission
          return missionDate.getMonth() + 1; // Les mois sont indexés à partir de 0, donc on ajoute 1
        } else if (period === 'quarter') {
          // Extraire le trimestre de la date de fin de la mission
          return Math.floor((missionDate.getMonth() + 3) / 3); // Calculer le trimestre
        }
      });
  
      // Grouper les missions filtrées par résultat et période
      const resultsDistribution = filteredMissions.reduce((acc, mission) => {
        const periodKey = period === 'month' ? mission.dateFin.getMonth() + 1 : Math.floor((mission.dateFin.getMonth() + 3) / 3);
        const result = mission.result;
        const key = `${result}-${periodKey}`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
  
      return resultsDistribution;
    } catch (error) {
      console.error('Error calculating results distribution by period:', error);
      throw error;
    }
  }
  
  
}

module.exports = StatistiquesService;