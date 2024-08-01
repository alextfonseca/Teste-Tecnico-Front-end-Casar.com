import axios from "axios";

export const github_api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `token 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`,
  },
});
