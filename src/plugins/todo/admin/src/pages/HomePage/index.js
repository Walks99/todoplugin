// React imports
import React, { memo, useEffect, useState } from "react";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Dependency imports
import { nanoid } from "nanoid";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Strapi design system
import { Layout, BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import { EmptyStateLayout } from "@strapi/design-system";
import { Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// API Imports
import todoRequests from "../../api/todo.js";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Component Imports
import { Illo } from "../../components/Illo/index.js";
import TodoCount from "../../components/ToDoCount/index.js";
import TodoTable from "../../components/ToDoTable/index.js";
import todo from "../../../../server/controllers/todo.js";
import TodoModal from "../../components/ToDoModal/index.js";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const HomePage = () => {
  const [todoData, setTodoData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);

    try {
      const todo = await todoRequests.getAllTodos();
      setTodoData(todo.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initFetchData = async () => {
      await fetchData();
    };

    initFetchData();
  }, []);


  async function addTodo(data) {
    await todoRequests.addTodo(data);
    await fetchData();
  }

  async function toggleTodo(data) {
    await todoRequests.toggleTodo(data.id);
  }

  async function deleteTodo(data) {
    await todoRequests.deleteTodo(data.id);
    await fetchData();
  }

  async function editTodo(id, data) {
    await todoRequests.editTodo(id, data);
    await fetchData();
  }

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <Layout sideNav={null}>
      <BaseHeaderLayout
        title="Todo Plugin"
        subtitle="All your todos in one place."
        as="h2"
      />
      <ContentLayout>
        

        {todoData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any todos yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first todo
              </Button>
            }
          />
        ) : (
          <>
          <TodoCount count={todoData.length} />
          <TodoTable
              todoData={todoData}
              setShowModal={setShowModal}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          </>
        )}
      </ContentLayout>
      {showModal && (
        <TodoModal
          setShowModal={setShowModal}
          addTodo={(todo) => setTodoData([...todoData, todo])}
        />
      )}
    </Layout>
  );
};

export default HomePage;

// ^^^^^^^^^^^^^^^^^ My original code above ^^^^^^^^^^^^^^^
