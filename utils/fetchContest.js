const dummyData = [
  {
    name: "CodeSprint Challenge",
    start_time: "2025-03-18T10:00:00Z",
    duration: "02:00:00",
    status: "Finished",
  },
  {
    name: "Algo Marathon",
    start_time: "2025-03-19T14:00:00Z",
    duration: "03:00:00",
    status: "Running",
  },
  {
    name: "HackFest 2023",
    start_time: "2025-03-20T18:30:00Z",
    duration: "04:00:00",
    status: "To be held",
  },
  {
    name: "BugSmash",
    start_time: "2025-03-21T09:30:00Z",
    duration: "01:30:00",
    status: "Finished",
  },

];

const contestDataModule = {};

contestDataModule.getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyData;
};

export default contestDataModule;
