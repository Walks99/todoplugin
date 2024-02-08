import React from "react";
import { Box } from "@strapi/design-system";
import { Flex } from "@strapi/design-system";
import { Typography } from "@strapi/design-system";

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