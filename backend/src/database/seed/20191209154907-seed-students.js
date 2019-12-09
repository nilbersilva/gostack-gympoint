module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          creator_id: 1,
          name: 'Darius Cummings',
          email: 'example1@example.com.br',
          age: 18,
          weight: 78,
          height: 1.7,
        },
        {
          creator_id: 1,
          name: 'Carmelita Marsham',
          email: 'example2@example.com.br',
          age: 19,
          weight: 60,
          height: 1.65,
        },
        {
          creator_id: 1,
          name: 'Chomkwan Wattana',
          email: 'example3@example.com.br',
          age: 20,
          weight: 78,
          height: 1.75,
        },
        {
          creator_id: 1,
          name: 'Gibby Radki',
          email: 'example4@example.com.br',
          age: 21,
          weight: 78,
          height: 1.73,
        },
        {
          creator_id: 1,
          name: 'Harmen Porter',
          email: 'example5@example.com.br',
          age: 22,
          weight: 78,
          height: 1.74,
        },
        {
          creator_id: 1,
          name: 'Jube Bowman',
          email: 'example6@example.com.br',
          age: 23,
          weight: 80,
          height: 1.76,
        },
      ],
      {}
    );
  },

  down: () => {},
};
