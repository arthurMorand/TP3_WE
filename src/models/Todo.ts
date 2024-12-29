export class Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  dueDate?: Date;

  constructor(id: number, title: string, dueDate?: Date, isCompleted: boolean = false) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
  }
}
