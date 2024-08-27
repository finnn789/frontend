import React from "react";
import { Box, Text, Flex, Grid, GridItem } from "@chakra-ui/react";
import { AiOutlineClockCircle } from "react-icons/ai";

const HeaderTitle = ({ icon, title, subtitle }) => {
  const dateNow = new Date();
  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedDate = formatter.format(dateNow);
  return (
    <div>
      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <Flex alignItems="center">
            <Flex>
              <AiOutlineClockCircle size={60} color="gray.500" />
            </Flex>
            <Flex flexDirection={"column"}>
              <Text ml={2} fontWeight="bold" fontSize="24px">
                Realisasi Kegiatan Pengeboran & KUPS
              </Text>
              <Text ml={2} color="gray.800" fontSize="20px">
                {formattedDate}
              </Text>
            </Flex>
          </Flex>
        </Grid>
      </Box>
    </div>
  );
};

export default HeaderTitle;
