const data = {
  problemCount: 6,
  leaderboardStat: [
    {
      userId: "1234",
      userName: "cyr0x",
      problemStatus: {
        A: {
          isSolved: true,
          isFirstSolve: true,
          wrongSubmissionCount: 2,
          penalty: 40,
        },
        B: {
          isSolved: false,
          isFirstSolve: false,
          wrongSubmissionCount: 4,
          penalty: 0,
        },
        C: {
          isSolved: false,
          isFirstSolve: false,
          wrongSubmissionCount: 4,
          penalty: 0,
        },
        D: {
          isSolved: false,
          isFirstSolve: false,
          wrongSubmissionCount: 4,
          penalty: 0,
        },
        E: {
          isSolved: false,
          isFirstSolve: false,
          wrongSubmissionCount: 4,
          penalty: 0,
        },
        F: {
          isSolved: false,
          isFirstSolve: false,
          wrongSubmissionCount: 4,
          penalty: 0,
        },
        B: {
          isSolved: false,
          isFirstSolve: false,
          wrongSubmissionCount: 4,
          penalty: 0,
        },
        B: {
          isSolved: false,
          isFirstSolve: false,
          wrongSubmissionCount: 4,
          penalty: 0,
        },
      },
    },
    {
      userId: "1234",
      userName: "cyr0x001",
      problemStatus: {
        A: {
          isSolved: true,
          isFirstSolve: false,
          wrongSubmissionCount: 4,
          penalty: 100 + 40,
        },
      },
    },
  ],
};

const LeaderboardDataModule = {};

LeaderboardDataModule.getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
};

export default LeaderboardDataModule;
