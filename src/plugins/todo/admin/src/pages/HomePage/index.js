// React imports
import React, { memo, useEffect, useState } from "react";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Strapi design system
import { Layout, BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import { EmptyStateLayout } from "@strapi/design-system";
import { Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Strapi Pluggin imports
import { LoadingIndicatorPage, useFetchClient } from "@strapi/helper-plugin";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// import todoRequests from "../../api/todo.js";
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
  const { get, put, del, post } = useFetchClient();

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);

    try {
      const {data} = await get("/todo/find");
      setTodoData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  async function addTodo(data) {
    await post("/todo/create", {
      data: data,
    });
    fetchData();
  }

  async function toggleTodo(id) {
    await put(`/todo/toggle/${id}`);
    fetchData();
  }

  async function deleteTodo(id) {
    await del(`/todo/delete/${id}`);
    await fetchData();
  }

  async function editTodo(id, data) {
    await put(`/todo/update/${id}`, {
      data: data,
    });
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
          addTodo={addTodo}
        />
      )}
    </Layout>
  );
};

export default HomePage;

// ^^^^^^^^^^^^^^^^^ My original code above ^^^^^^^^^^^^^^^