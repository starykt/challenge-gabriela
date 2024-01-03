import { api } from "../configs/axios";
import { IResult } from "../interfaces/result";


export class ResultService {

  private apiURL = "v1/results";

  public async fetchAllResults() {
    try {
      const fetchQuery = await api.get<IResult[]>(`${this.apiURL}`);
      const results = fetchQuery.data;

      // Organizando os resultados por bimestre
      const resultsByBimestre: { [key: string]: IResult[] } = {};

      results.forEach(result => {
        const bimestre = result.bimester!.toString(); // Converte para string se necessário

        if (!resultsByBimestre[bimestre]) {
          resultsByBimestre[bimestre] = [];
        }

        resultsByBimestre[bimestre].push(result);
      });

      return resultsByBimestre;
    } catch(err) {
      throw err;
    }
  }

  public async fetchNewResult(result: IResult) {
    try {
      await api.post<IResult[]>(`${this.apiURL}`, result);
    } catch(err) {
      throw err;
    }
  }

  public async deleteResult(id: string) {
    try {
      const responseDelete = await api.delete<string>(`${this.apiURL}/${id}`);
      return responseDelete;
    } catch(err) {
      throw err;
    }
  }

}