// React imports
import React, { useState } from "react";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Strapi design system imports
import {
  Table,
  Thead,
  TFooter,
  Tbody,
  Tr,
  Td,
  Th,
} from "@strapi/design-system";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";
import { IconButton } from "@strapi/design-system/IconButton";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { BaseCheckbox } from "@strapi/design-system/BaseCheckbox";
import { TextInput } from "@strapi/design-system/TextInput";
import { Pencil, Trash, Plus } from "@strapi/icons";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/** TODO CHECKBOX FUNCTION
 * the TodoCheckbox function is a custom checkbox component that takes a value, checkboxID, callback, and disabled prop.
 * It returns a BaseCheckbox component that has an onChange event handler which calls the handleChange() function.
 * The handleChange()function sets the isChecked state to the opposite of its current value.
 * It then calls the callback function and passes an object with the checkboxID and the opposite of the isChecked state as an argument.
 * The disabled prop is used to disable the checkbox.
 * If the disabled prop is true, the checkbox is disabled.
 * If the disabled prop is false, the checkbox is enabled.
 */
function TodoCheckbox({ value, checkboxID, callback, disabled }) {
  const [isChecked, setIsChecked] = useState(value);

  function handleChange() {
    setIsChecked(!isChecked);
    {
      callback && callback({ id: checkboxID, value: !isChecked });
    }
  }

  return (
    <BaseCheckbox
      checked={isChecked}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/**
 * The TodoInput component is a custom input component that takes a value and onChange prop.
 * It returns a TextInput component that has an error prop.
 * The error prop is used to display an error message when the input value is longer than 40 characters.
 * The onChange prop is used to update the value of the input field.
 * The value prop is used to set the value of the input field.
 * 
 */
function TodoInput({ value, onChange }) {
  return (
    <TextInput
      type="text"
      aria-label="todo-input"
      name="todo-input"
      error={value.length > 40 ? "Text should be less than 40 characters" : ""}
      onChange={onChange}
      value={value}
    />
  );
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/** TODO TABLE COMPONENT
 * The TodoTable component is a table that displays a list of todo items.
 * It takes a todoData, toggleTodo, deleteTodo, editTodo, and setShowModal prop.
 * The todoData prop is an array of todo items.
 * The toggleTodo prop is a function that toggles the status of a todo item.
 * The deleteTodo prop is a function that deletes a todo item.
 * The editTodo prop is a function that edits a todo item.
 * The setShowModal prop is a function that shows the modal.
 */
export default function TodoTable({
  todoData,
  toggleTodo,
  deleteTodo,
  editTodo,
  setShowModal,
}) {
  /**
   * The inputValue state is used to store the value of the input field.
   * The editId state is used to store the ID of the todo item being edited.
   * The isEdit state is used to check if the todo item is being edited.
   */
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  return (
    // The Box component is used to add styles to the table.
    <Box
      background="neutral0"
      hasRadius={true}
      shadow="filterShadow"
      padding={8}
      style={{ marginTop: "10px" }}
    >
      {/**
       * The Table component is used to display the todo items in a table format.
       * It has a colCount prop that is used to set the number of columns in the table.
       * It has a rowCount prop that is used to set the number of rows in the table.
       * The TFooter component is used to display the add todo button.
       */}
      <Table
        colCount={4}
        rowCount={10}
        footer={
          <TFooter onClick={() => setShowModal(true)} icon={<Plus />}>
            Add a todo
          </TFooter>
        }
      >
        {/**
         * The Thead component is used to display the table header.
         * The Tr component is used to display a row in the table.
         * The Th component is used to display a header cell in the table.
         * The Typography component is used to display the header text.
          */}
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Todo</Typography>
            </Th>

            <Th>
              <Typography variant="sigma">Status</Typography>
            </Th>

            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
          {/**
           * The Tbody component is used to display the table body.
           * Inside the Tbody component, we use the map() function to loop through the todoData array.
           * The Tr component is used to display a row in the table.
           * The Td component is used to display a cell in the table.
           * The Typography component is used to display the todo item. We use todo.id to display the ID of the todo item.
           * The TodoCheckbox component displays the checkbox. The callback prop calls the toggleTodo function and on the todo that has been clicked.
           * The IconButton component is used to display the edit and delete buttons.
           * The edit Icon Button calls the setEditId function, passes todo.id as an argument, and sets the editId state to the ID of the todo item being edited.
           * The Button component is used to display the save button.
           * The Flex component is used to add styles to the buttons.
           * The Box component is used to add padding to the delete button.
           * 
            */}
        <Tbody>
          {todoData.map((todo) => {
            const isEditing = todo.id === editId;

            return (
              <Tr key={todo.id}>
                <Td>
                  <Typography textColor="neutral800">{todo.id}</Typography>
                </Td>

                <Td>
                  {isEditing ? (
                    <TodoInput
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  ) : (
                    <Typography textColor="neutral800">{todo.name}</Typography>
                  )}
                </Td>

                <Td>
                  <TodoCheckbox
                    value={todo.isDone}
                    checkboxID={todo.id}
                    callback={() => toggleTodo(todo.id)}
                    disabled={isEditing}
                  />
                </Td>

                <Td>
                  {isEditing ? (
                    <Flex style={{ justifyContent: "end" }}>
                      <Button
                        onClick={() => {
                          editTodo(todo.id, { name: inputValue });
                          setEditId(null); // Reset editId when done editing
                          setInputValue(""); // Reset input value when done editing
                        }}
                      >
                        Save
                      </Button>
                    </Flex>
                  ) : (
                    <Flex style={{ justifyContent: "end" }}>
                      <IconButton
                        onClick={(e) => {
                          setEditId(todo.id);
                          setInputValue(todo.name);
                        }} // Set editId to the current todo item's ID when the edit button is clicked
                        label="Edit"
                        noBorder
                        icon={<Pencil />}
                      />

                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => deleteTodo(todo.id)}
                          label="Delete"
                          noBorder
                          icon={<Trash />}
                        />
                      </Box>
                    </Flex>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
