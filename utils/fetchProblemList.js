const problemList = [
  {
    title: "Add One",
    id:"A",
  },
  {
    title: "Sum of Two",
    id:"B",
  },
  {
    title: "Product of Three",
    id:"C",
  },
  {
    title: "Find Maximum",
    id:"D",
  },
  {
    title: "Count Digits",
    id:"E",
  },
];

const problemListData = {};

problemListData.getProblems = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return problemList;
};

export default problemListData;
