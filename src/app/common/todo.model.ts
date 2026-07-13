export type BaseTodo = {
  todoName: string;
  creationDate: string;
};

export type OpenTodo = BaseTodo;

export type CompletedTodo = BaseTodo & {
  dateCompleted: string;
};
