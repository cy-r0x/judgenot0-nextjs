// Mock data for submission details
const submissionDetails = {
  submissionID: "12345678",
  userName: "cyr0x",
  language: "cpp",
  problem: "A",
  status: "Accepted",
  time: 348,
  memory: 3848,
  code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n, w;
  cin >> n >> w;
  
  vector<int> yumminess(n);
  vector<int> stuffiness(n);
  
  for (int i = 0; i < n; i++) {
    cin >> yumminess[i] >> stuffiness[i];
  }
  
  // Dynamic programming approach to solve the knapsack problem
  vector<int> dp(w + 1, 0);
  
  for (int i = 0; i < n; i++) {
    for (int j = w; j >= stuffiness[i]; j--) {
      dp[j] = max(dp[j], dp[j - stuffiness[i]] + yumminess[i]);
    }
  }
  
  cout << dp[w] << endl;
  return 0;
}`,
};

const SubmissionIdModule = {};

SubmissionIdModule.getSubmissionId = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    ...submissionDetails,
    submissionID: id || submissionDetails.submissionID,
  };
};

export default SubmissionIdModule;
