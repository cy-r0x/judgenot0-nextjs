const data = {
  id: "1234",
  name: "Dumpling Dilemma",
  author: "",
  topic: "",
  description: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "After years of training, inner struggle, and more than one accidental nap in the middle of a meditation session, Master Shifu has finally granted Po access to the Sacred Dumpling Vault. Why? Because Po is ",
          },
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "this",
          },
          {
            type: "text",
            text: " close to achieving inner peace (he almost made it, but then... noodles happened. Again).",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Inside the Vault are $N$  ",
          },
          {
            type: "text",
            marks: [
              {
                type: "bold",
              },
            ],
            text: "different kinds of dumplings",
          },
          {
            type: "text",
            text: ", each with its own unique ",
          },
          {
            type: "text",
            marks: [
              {
                type: "bold",
              },
            ],
            text: "yumminess level of",
          },
          {
            type: "text",
            text: " $ y_i$ and ",
          },
          {
            type: "text",
            marks: [
              {
                type: "bold",
              },
            ],
            text: "stuffiness of",
          },
          {
            type: "text",
            text: " $si$ . These dumplings are rumored to contain the secret to unlocking true power… or just a very satisfied belly.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "But there's a catch. Po’s belly can only hold so much before he enters the dreaded food coma state — no one wants that, especially if you’re supposed to be saving the world and the ",
          },
          {
            type: "text",
            marks: [
              {
                type: "bold",
              },
            ],
            text: "limit is stuffiness of",
          },
          {
            type: "text",
            text: " $W$. Now, Po being too excited, he can’t decide which dumpling to eat and which one to leave behind. The more he stares at the dumplings, the hungrier he gets — but Po's belly limit is only so big. If he eats too many, it could be the end of his kung fu dreams (and his nap dreams).",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Seeing Po struggle, you — a true friend — step in to help him out. You’re going to help Po pick the best dumplings to eat, based on their yumminess, but also make sure not to push him into the dreaded food coma.",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Your task is simple, yet crucial: Help Po to pick the dumplings in such a way that he gets the ",
          },
          {
            type: "text",
            marks: [
              {
                type: "bold",
              },
            ],
            text: "maximum yumminess, but doesn’t exceed his belly limit!",
          },
        ],
      },
    ],
  },
  inputDescription: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The first line contains two integers:",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "$1≤N≤200$ — The number of different kinds of dumplings.",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "$1≤W≤10^5$ — Po's belly limit.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The next N",
          },
          {
            type: "text",
            marks: [
              {
                type: "italic",
              },
            ],
            text: "N",
          },
          {
            type: "text",
            text: "N lines, each containing two integers:",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "$1≤yi≤10^9$ — The yumminess $i−th$ dumpling",
                  },
                ],
              },
            ],
          },
          {
            type: "listItem",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "$1≤si≤W$ — The stuffiness of $i−th$ dumpling",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  outputDescription: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Print a single integer —the maximum yumminess Po can get.",
          },
        ],
      },
    ],
  },
  sampleTestCases: [
    {
      input: "6 30\n5 6\n6 5\n4 6\n6 2\n5 3\n2 6\n2 6",
      output: "28\n",
    },
  ],
  regularTestCases: [
    {
      input:
        "11 1932\n5661 590\n5592 377\n5901 1753\n5809 1167\n5827 271\n5150 1547\n5130 1277\n5694 1602\n5628 422\n5590 672\n5329 261",
      output: "28037",
    },
  ],
  timeLimit: 1000,
  memoryLimit: 256,
  solutions: [],
};

const problemDataModule = {};

problemDataModule.getProblem = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
};

export default problemDataModule;
