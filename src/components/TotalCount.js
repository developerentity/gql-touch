import { useQuery } from "@apollo/client";
import { ALL_TODO } from "../apollo/todos";
import { Flex } from "@chakra-ui/react";

const TotalCount = () => {
  const { data } = useQuery(ALL_TODO);

  return (
    <Flex justifyContent={"center"} borderTop={"2px"} mt="5">
      {data?.todos && <b>Total todos: {data.todos.length}</b>}
    </Flex>
  );
};

export default TotalCount;
