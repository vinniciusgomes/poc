import axios from 'axios';
import { Request, Response } from 'express';

import AppError from '../../../shared/errors/AppError';
import { GithubReposResponse, GithubUserResponse } from './interfaces';

export default class OrderController {
  public async getUserAndRepos(req: Request, res: Response): Promise<Response> {
    try {
      const { user } = req.params;
      const { data } = await axios.get<GithubUserResponse>(
        `${process.env.GITHUB_API}users/${user}`,
        { headers: { Authorization: `${process.env.GITHUB_ACCESS_TOKEN}` } },
      );

      const repositoriesResponse = await axios.get<GithubReposResponse[]>(
        `${process.env.GITHUB_API}users/${user}/repos`,
        { headers: { Authorization: `${process.env.GITHUB_ACCESS_TOKEN}` } },
      );

      const repos = repositoriesResponse.data.map(repo => {
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          forks: repo.forks,
          watchers: repo.watchers,
          stars: repo.stargazers_count,
        };
      });

      const response = {
        id: data.id,
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        github: data.html_url,
        bio: data.bio,
        repos,
      };

      return res.status(200).send(response);
    } catch (err: any) {
      throw new AppError(err.response?.data.message, err.response?.status);
    }
  }
}
