interface Value {
  id: number;
  self: string;
  state: string;
  name: string;
  startDate: string;
  endDate: string;
  completeDate?: string;
  createdDate: string;
  originBoardId: number;
  goal?: string;
}

interface GetAllSprint {
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: Value[];
}

export default GetAllSprint;
