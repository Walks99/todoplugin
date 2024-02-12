// React imports
import React, { memo, useEffect, useState } from "react";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Strapi design system imports
import { Layout, BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import { EmptyStateLayout } from "@strapi/design-system";
import { Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Strapi Pluggin imports
import { LoadingIndicatorPage, useFetchClient } from "@strapi/helper-plugin";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Component Imports
import { Illo } from "../../components/Illo/index.js";
import TodoCount from "../../components/ToDoCount/index.js";
import TodoTable from "../../components/ToDoTable/index.js";
import todo from "../../../../server/controllers/todo.js";
import TodoModal from "../../components/ToDoModal/index.js";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


const HomePage = () => {
  /**
   * 
   */
  const [todoData, setTodoData] = useState([]);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  /**
   * 
   */
  const [showModal, setShowModal] = useState(false);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  /**
   * 
   */
  const [isLoading, setIsLoading] = useState(true);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  /**
   * 
   */
  const { get, put, del, post } = useFetchClient();
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

/**
 * The useEffect function is used to call the fetchData function when the component mounts.
 * The fetchData function is an async function that makes a GET request to the /todo/find endpoint
 * and updates the todoData state with the response data.
 * If the request is successful, it sets the isLoading state to false.
 * If an error occurs, it logs the error to the console.
 */

  const fetchData = async () => {
    /**
     * The isLoading state is set to true when the fetchData function is called.
     */
    if (isLoading === false) setIsLoading(true);
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  /**
  * The addTodo function is an async function that makes a POST request to the /todo/create endpoint.
  * It takes a data object as an argument and passes it to the request body.
  * After the request is complete, it calls the fetchData function to update the todoData state.
  */
  async function addTodo(data) {
    await post("/todo/create", {
      data: data,
    });
    fetchData();
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  /**
   * The toggleTodo function is an async function that makes a PUT request to the /todo/toggle/:id endpoint.
   * It takes an id as an argument and passes it to the request URL.
   * After the request is complete, it calls the fetchData function to update the todoData state.
   */
  async function toggleTodo(id) {
    await put(`/todo/toggle/${id}`);
    fetchData();
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  /**
   * The deleteTodo function is an async function that makes a DELETE request to the /todo/delete/:id endpoint.
   * It takes an id as an argument and passes it to the request URL.
   * After the request is complete, it calls the fetchData function to update the todoData state.
   */
  async function deleteTodo(id) {
    await del(`/todo/delete/${id}`);
    await fetchData();
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  /** 
   * The editTodo function is an async function that makes a PUT request to the /todo/update/:id endpoint.
   * It takes an id and a data object as arguments and passes them to the request URL and body, respectively.
   * After the request is complete, it calls the fetchData function to update the todoData state.
  */
  async function editTodo(id, data) {
    await put(`/todo/update/${id}`, {
      data: data,
    });
    await fetchData();
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


  /**
   * The isLoading state is used to display a loading indicator while the data is being fetched.
   * If the isLoading state is true, the LoadingIndicatorPage component is rendered.
   * Otherwise, the content of the page is rendered.
   */
  if (isLoading) return <LoadingIndicatorPage />;
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/**
 * The TodoCount component is used to display the number of todos in the todoData state.
 * The TodoTable component is used to display the todoData state in a table format.
 * The TodoModal component is used to add new todos to the todoData state.
 * If the showModal state is true, the TodoModal component is rendered.
 * Otherwise, the TodoModal component is not rendered.
 * The setShowModal function is passed to the TodoModal component to update the showModal state.
 * The addTodo function is passed to the TodoModal component to add new todos to the todoData state.
 * The toggleTodo function is passed to the TodoTable component to update the status of a todo.
 * The deleteTodo function is passed to the TodoTable component to delete a todo.
 * The editTodo function is passed to the TodoTable component to edit a todo.
 * The Layout component is used to render the page layout.
 * The BaseHeaderLayout component is used to render the page header.
 * The ContentLayout component is used to render the page content.
 * The EmptyStateLayout component is used to render an empty state message when there are no todos in the todoData state.
 * The Button component is used to render the add todo button and sets the showModal state to true when clicked.
 * The Plus icon is used to render the add todo button icon.
 *
 */
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

