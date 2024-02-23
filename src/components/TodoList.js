import { VStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import TodoItem from "./TodoItem";
import TotalCount from "./TotalCount";
import { ALL_TODO, DELETE_TODO, UPDATE_TODO } from "../apollo/todos";

const TodoList = () => {
  const { loading, error, data } = useQuery(ALL_TODO);
  const [toggleTodo, { error: updateError }] = useMutation(UPDATE_TODO);
  const [deleteTodo, { error: deleteError }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              (todo) => todo.__ref !== `Todo:${removeTodo.id}`
            );
          },
        },
      });
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error || updateError || deleteError) {
    return <h2>Error...</h2>;
  }

  return (
    <>
      <VStack>
        {data.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            {...todo}
          />
        ))}
      </VStack>
      <TotalCount />
    </>
  );
};

export default TodoList;
