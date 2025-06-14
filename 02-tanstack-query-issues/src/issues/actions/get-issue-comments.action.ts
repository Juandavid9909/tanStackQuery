import { githubApi } from "../../api/github.api";
import { GithubIssue } from "../interfaces";
import { sleep } from "../../helpers";

export const getIssueComments = async (issueNumber: number): Promise<GithubIssue[]> => {
    await sleep(1500);
      
    const { data } = await githubApi.get<GithubIssue[]>(`/issues/${ issueNumber }/comments`);
    
    return data;
};