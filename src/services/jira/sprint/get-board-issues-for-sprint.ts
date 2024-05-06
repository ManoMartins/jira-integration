import api from '../../api';
import GetBoardIssuesForSprint from './get-board-issues-for-sprint.interface';

async function getBoardIssuesForSprint(
  boardId: number,
  sprintId: number,
): Promise<GetBoardIssuesForSprint | undefined> {
  try {
    const response = await api.get<GetBoardIssuesForSprint>(
      `/rest/agile/1.0/board/${boardId}/sprint/${sprintId}/issue?jql=type in (Story, Task) and status = Concluído ORDER BY created DESC&expand=names`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default getBoardIssuesForSprint;
