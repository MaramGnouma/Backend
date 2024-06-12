const mongoose = require('mongoose');
const StatistiquesService = require('../Services/StatistiquesMissions');
const MissionTerminees = require('../Models/MissionTerminees');

jest.mock('../Models/MissionTerminees');

describe('StatistiquesService', () => {
  let statistiquesService;

  beforeEach(() => {
    statistiquesService = new StatistiquesService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMissionStatsByType', () => {
    it('should return mission statistics by type', async () => {
      const mockData = [
        { _id: 'Type 1', count: 10 },
        { _id: 'Type 2', count: 5 },
      ];

      MissionTerminees.aggregate.mockResolvedValue(mockData);

      const statsByType = await statistiquesService.getMissionStatsByType();

      expect(statsByType).toEqual(mockData);
      expect(MissionTerminees.aggregate).toHaveBeenCalledWith([
        { $group: { _id: '$typemission', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]);
    });
  });



  describe('getAverageMissionDuration', () => {
    it('should return the average mission duration', async () => {
      const mockData = [
        { datedebut: new Date('2024-01-01'), dateFin: new Date('2024-01-03') },
        { datedebut: new Date('2024-02-01'), dateFin: new Date('2024-02-02') },
      ];

      MissionTerminees.find.mockResolvedValue(mockData);

      const averageDuration = await statistiquesService.getAverageMissionDuration();

      // Calculer manuellement la durée moyenne pour vérification
      const totalDuration = mockData.reduce((acc, mission) => acc + (mission.dateFin - mission.datedebut), 0);
      const expectedAverageDuration = totalDuration / mockData.length;

      expect(averageDuration).toBeCloseTo(expectedAverageDuration);
    });
  });

 

  describe('getResultsDistributionByPeriod', () => {
    it('should return the results distribution by month', async () => {
      const mockData = [
        { result: 'Success', dateFin: new Date('2024-01-01') },
        { result: 'Failure', dateFin: new Date('2024-01-15') },
        { result: 'Success', dateFin: new Date('2024-02-01') },
      ];

      MissionTerminees.find.mockResolvedValue(mockData);

      const result = await statistiquesService.getResultsDistributionByPeriod('month');

      const expectedResult = {
        'Success-1': 1,
        'Failure-1': 1,
        'Success-2': 1,
      };

      expect(result).toEqual(expectedResult);
    });
  });
});
