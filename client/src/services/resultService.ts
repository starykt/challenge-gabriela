import { api } from "../configs/axios";
import { IResult } from "../interfaces/result";


export class ResultService {

  private apiURL = "v1/results";

  public async fetchAllResults() {
    try {
      const fetchQuery = await api.get<IResult[]>(`${this.apiURL}`);
      return fetchQuery.data;
    } catch(err) {
      throw err;
    }
  }

}