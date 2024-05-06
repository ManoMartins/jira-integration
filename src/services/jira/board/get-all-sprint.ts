import api from '../../api';
import GetAllSprint from './get-all-sprint.interface';

async function getAllSprint(
  boardId: number,
): Promise<GetAllSprint | undefined> {
  try {
    const response = await api.get<GetAllSprint>(
      `/rest/agile/1.0/board/${boardId}/sprint`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default getAllSprint;
