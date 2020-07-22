function isGitHubActions() {
  return process.env.GITHUB_ACTIONS === "true";
}

if (isGitHubActions()) {
  console.log("in github actions");
} else {
  console.log("NOT in github actions");
}

if (isGitHubActions() && process.env.GITHUB_HEAD_REF !== undefined) {
  console.log("In fork");
  console.log('value: "' + process.env.GITHUB_HEAD_REF + '"');
} else {
  console.log("not in fork");
}
