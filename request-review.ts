import axios from 'axios';

const url: string = process.env.SLACK_WEBHOOK_URL;
const prNum: string = process.env.PULL_REQUEST_NUMBER;
const prTitle: string = process.env.PULL_REQUEST_TITLE;
const prUrl: string = process.env.PULL_REQUEST_URL;
const prBody: string = process.env.PULL_REQUEST_BODY || "No description provided.";
const authorName: string = process.env.PULL_REQUEST_AUTHOR_NAME;
const repo: string = process.env.REPO_NAME;

// Return early if the author is 'pactflow-renovate-bot[bot]'
if (authorName && authorName.indexOf("pactflow-renovate-bot") >= 0) {
    console.log("Skipping Slack notification for Renovate bot PR.");
    process.exit(0);
}

const message: Object = {
    attachments: [
        {
            color: "#00ff00",
            blocks: [
                {
                    type: "section",
                    block_id: "commit_title",
                    text: {
                        type: "mrkdwn",
                        text: authorName + " has requested a review of " + repo + ": " + "<" + prUrl + "|" + prTitle + "> (#" + prNum + ")"

                    }
                }
            ]
        }
    ]
}
axios.post(url, message)
    .catch(error => {
        console.error("Error sending Slack notification:", error);
    });
