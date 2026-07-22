type BaseTodo = {
  todoName: string;
};

export type OpenTodo = BaseTodo & {
  dateCompleted?: string;
};

export type ClosedTodo = BaseTodo & {
  id: number;
  dateCompleted: string;
};
