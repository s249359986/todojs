export interface Todo {
  id? : string|number;
  [propName: string]: unknown;
}
export interface TodoStorage {
  uid? : string|number;
  [propName: string]: unknown;
}
// export interface Filters {
//   // (todos: Array<Todo>): Array<Todo>;
//   [propName: string]: unknown;
// }
