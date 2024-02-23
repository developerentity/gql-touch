import { useMutation } from "@apollo/client";
import { FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import { ADD_TODO, ALL_TODO } from "../apollo/todos";

const AddTodo = () => {
  const [text, setText] = useState("");
  const [addTodo, { error }] = useMutation(ADD_TODO, {
    // refetchQueries: [{ query: ALL_TODO }],
    update(cache, { data: { newTodo } }) {
      const { todos } = cache.readQuery({ query: ALL_TODO });

      cache.writeQuery({
        query: ALL_TODO,
        data: {
          todos: [newTodo, ...todos],
        },
      });
    },
  });

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({
        variables: {
          title: text,
          completed: false,
          userId: 144,
        },
      });
      setText("");
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") handleAddTodo();
  };

  if (error) {
    return <h2>Error...</h2>;
  }

  return (
    <FormControl>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKey}
      />
    </FormControl>
  );
};

export default AddTodo;
