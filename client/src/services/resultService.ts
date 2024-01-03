import { api } from "../configs/axios";
import { IResult } from "../interfaces/result";


export class ResultService {

  private apiURL = "v1/results";

  public async fetchAllResults() {
    try {
      const fetchQuery = await api.get<IResult[]>(`${this.apiURL}`);
      const results = fetchQuery.data;

      // Organize os resultados por bimestre
      const resultsByBimestre: { [key: string]: IResult[] } = {};

      results.forEach(result => {
        const bimestre = result.bimester!.toString(); // Converte para string se necessário

        if (!resultsByBimestre[bimestre]) {
          resultsByBimestre[bimestre] = [];
        }

        resultsByBimestre[bimestre].push(result);
      });
      console.log(resultsByBimestre);

      // Agora, você tem os resultados organizados por bimestre em resultsByBimestre
      console.log(resultsByBimestre);
      return resultsByBimestre;
    } catch(err) {
      throw err;
    }
  }

  public async fetchNewResult(result: IResult) {
    try {
      console.log(result);
      await api.post<IResult[]>(`${this.apiURL}`, result);
    } catch(err) {
      throw err;
    }
  }

}