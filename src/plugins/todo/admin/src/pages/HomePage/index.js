/*
 *
 * HomePage
 *
 */
import { Layout, BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import React, { memo, useState } from "react";
import { nanoid } from "nanoid";

import TodoModal from "../../components/ToDoModal/index.js";

import { EmptyStateLayout } from "@strapi/design-system";
import { Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { Illo } from "../../components/Illo/index.js";
import TodoCount from "../../components/ToDoCount/index.js";
import TodoTable from "../../components/ToDoTable/index.js";

const HomePage = () => {
  const [todoData, setTodoData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function addTodo(data) {
    setTodoData([...todoData, { ...data, id: nanoid(), isDone: false }]);
  }

  async function toggleTodo(data) {
    alert("Add Toggle Todo in API");
  }

  async function deleteTodo(data) {
    alert("Add Delete Todo in API");
  }

  async function editTodo(id, data) {
    alert("Add Edit Todo in API");
  }

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
