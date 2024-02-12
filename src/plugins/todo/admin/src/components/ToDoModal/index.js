// React imports
import React, { useState } from "react";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Strapi design system imports
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
} from "@strapi/design-system";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

/** 
 * The TodoModal component is a form that allows users to add a new todo item.
 * It takes a setShowModal prop and an addTodo prop. 
 * This allows the component to close the modal and add a new todo item to the list.
*/
export default function TodoModal({ setShowModal, addTodo }) {
  /**
   * The name state is used to store the value of the input field.
   */
  const [name, setName] = useState("");
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  /**
   * The handleSubmit function is used to submit the form.
   * It prevents the defaul form submission and stops the event from propagating to the parent form.
   * It then calls the addTodo function and passes the name state as an argument. 
   * If the addTodo function is successful, it closes the modal.
   * If the addTodo function fails, it logs the error to the console.
   */
  const handleSubmit = async (e) => {
    // Prevent submitting parent form
    e.preventDefault();
    e.stopPropagation();

    try {
      await addTodo({ name: name });
      setShowModal(false);
    } catch (e) {
      console.log("error", e);
    }
  };
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  /**
   * The getError function is used to validate the form.
   * It checks if the name state is longer than 40 characters.
   * If it is, it returns an error message.
   * If not, it returns null.
   * This error message is then passed to the TextInput component.
   * If the error is not null, the TextInput component will display the error message.
   * If the error is null, the TextInput component will not display an error message.
   */
  const getError = () => {
    // Form validation error

    if (name.length > 40) {
      return "Content is too long";
    }

    return null;
  };
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  /** MODAL LAYOUT COMPONENT
   * The TodoModal component returns a ModalLayout component.
   * The ModalLayout component is used to display the modal.
   * It has an onClose prop that is used to close the modal.
   * It has a labelledBy prop that is used to label the modal.
   */

  /** MODAL HEADER COMPONENT
   * The ModalHeader component is used to display the header of the modal.
   * It contains a Typography component that displays the title of the modal.
   * The ModalHeader container an AddTodo text title
   */

  /** MODAL BODY COMPONENT
   * The ModalBody component is used to display the body of the modal.
   * It contains a TextInput component that is used to take input from the user, which is their todo item.
   * It hints to the user that the maximum length of the todo item is 40 characters.
   * The TextInput component has a label prop that is used to label the input field.
   * It has a name prop that is used to identify the input field.
   * It has a hint prop that is used to display a hint below the input field.
   * It has an error prop which calls the getError() function when the text input is greater than 40 characters.
   * It has an onChange prop that calls the setName function. This function updates the name state with the value of the input field.
   * It has a value prop that is used to set the value of the input field. This value is the name state.
   */

  /**
   * MODAL FOOTER COMPONENT
   * The ModalFooter component is used to display the footer of the modal.
   * It contains a Button component (Cancel) that is used to close the modal.
   * When the button is clicked, it calls the setShowModal function and passes false as an argument.
   * It also contains a Button component (Add todo) that is used to submit the form.
   * When the button is clicked, the onSubmit prop belonging to the ModalLayout calls the handleSubmit function.
   */
  return (

    <ModalLayout
      onClose={() => setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add todo
        </Typography>
      </ModalHeader>

      <ModalBody>
        <TextInput
          // @ts-ignore
          placeholder="What do you need to do?"
          label="Name"
          name="text"
          hint="Max 40 characters"
          error={getError()}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Add todo</Button>}
      />
    </ModalLayout>
  );
}