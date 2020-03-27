const request = require('request');
const privateToken = process.env.OAUTH_TOKEN;
const projectId = process.env.CI_PROJECT_ID;
const mergeRequestId = process.env.PR_ID;
const jobId = process.env.CI_CI_JOB_ID
const message = `
Checkout the documentation for this merge request here https://foci-solutions.gitlab.io/-/research/angular/angular-demo/-/jobs/${jobId}/artifacts/documentation/index.html
`;
const path = 'https://gitlab.com/api/v4/projects/' + projectId + '/merge_requests/' +
 mergeRequestId + '/notes?private_token=' + privateToken;
request.post(path, { form: { body: message } });
