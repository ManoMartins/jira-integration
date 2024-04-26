import api from "../../api";
import GetAllSprint from "./get-all-sprint.interface";

async function getAllSprint() {
  try {
    const response = await api.get<GetAllSprint>(
      // "/rest/agile/1.0/board/3/sprint",
      "/rest/agile/1.0/board/3/sprint",
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default getAllSprint
