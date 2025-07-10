const data = [
  {
    submissionID: "12345678",
    userName: "cyr0x",
    language: "cpp",
    problem: "A",
    status: "Accepted",
    time: 348,
    memory: 3848,
  },
  {
    submissionID: "12345678",
    userName: "cyr0x",
    language: "py",
    problem: "B",
    status: "In Queue",
    time: null,
    memory: null,
  },
  {
    submissionID: "12345678",
    userName: "cyr0x",
    language: "java",
    problem: "C",
    status: "Judging",
    time: null,
    memory: null,
  },
  {
    submissionID: "12345678",
    userName: "cyr0x",
    language: "py",
    problem: "D",
    status: "Wrong Answer",
    time: null,
    memory: null,
  },
];

const SubmissionDataModule = {};

SubmissionDataModule.getSubmissions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
};

export default SubmissionDataModule;
