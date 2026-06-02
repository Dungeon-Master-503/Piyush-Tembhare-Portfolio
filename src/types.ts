/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
}

export interface PortfolioData {
  userName: string;
  aboutText: string;
  skills: string[];
  projects: Project[];
  stats: {
    projectsDone: number;
    skillsCount: number;
    yearsLearning: number;
  };
  portraitImageUrl?: string;
}
