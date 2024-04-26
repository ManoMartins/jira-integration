import api from "../../api";
import GetBoardIssuesForSprint from "./get-board-issues-for-sprint.interface";

async function getBoardIssuesForSprint(sprintId: number) {
  try {
    const response = await api.get<GetBoardIssuesForSprint>(
      // `/rest/agile/1.0/board/3/sprint/${sprintId}/issue?jql=type in (Story, Task) and status = Done ORDER BY created DESC&expand=names`,
      `/rest/agile/1.0/board/3/sprint/${sprintId}/issue?jql=type in (Story, Task) and status = Done ORDER BY created DESC&expand=names`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default getBoardIssuesForSprint;