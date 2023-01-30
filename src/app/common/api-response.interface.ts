export interface IAPIResponse<T> {
  payload: { [key: number]: T };
}
