// React imports
import React from "react";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Strapui design system imports
import { Box } from "@strapi/design-system";
import { Flex } from "@strapi/design-system";
import { Typography } from "@strapi/design-system";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
/**
 * The TodoCount component is a simple component that displays the total number of todos.
 * It takes a count prop and returns a Box component with a Flex component inside.
 * The Flex component contains a Typography component that displays the total number of todos.
 * The Box component has a background color of neutral0, a border radius, and a shadow.
 */
export default function TodoCount({ count }) {
  return (
    <Box background="neutral0" hasRadius={true} shadow="filterShadow">
      <Flex justifyContent="center" padding={8}>
        <Typography variant="alpha">
          You have a total of {count} todos 🚀
        </Typography>
      </Flex>
    </Box>
  );
}