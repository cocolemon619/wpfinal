import TodoItem, { TodoItemProps } from "./TodoItem";

// propsにdataという名前で受け皿を作っとく
type TodoItemListProps = {
	data: Array<TodoItemProps>;
};

const TodoItemList = (props: TodoItemListProps) => {
	return props.data.map((todoItem: TodoItemProps, i) => {
		return <TodoItem key={i} {...todoItem} />;
	});
};

export default TodoItemList;

