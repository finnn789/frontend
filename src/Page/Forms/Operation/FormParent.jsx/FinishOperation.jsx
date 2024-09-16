import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { IconInfoCircle } from "@tabler/icons-react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";
import { Button } from "@chakra-ui/react";

const FinishOperation = () => {
  return (
    <>
      <Grid templateColumns={"repeat(1, 1fr)"} gap={4}>
        <GridItem>
          <CardFormK3
            title="Finish Operation"
            colorSubtitle="blue.800"
            colorTitle="red.500"
            bgColor="#FDD3D0"
            icon={IconInfoCircle}
            iconColor="red.500"
            subtitle="Finish Operation"
          >
            <Grid templateColumns={"repeat(1, 1fr)"} px={"48px"}>
              <GridItem>
                <Text>
                  These data are empty for now. You can add them later.:
                </Text>
              </GridItem>
              <GridItem>
                <UnorderedList>
                  <ListItem>Finish Operation</ListItem>
                  <ListItem>Finish Operation</ListItem>
                  <ListItem>Finish Operation</ListItem>
                  <ListItem>Finish Operation</ListItem>
                  <ListItem>Finish Operation</ListItem>
                  <ListItem>Finish Operation</ListItem>
                </UnorderedList>
              </GridItem>
            </Grid>
          </CardFormK3>
        </GridItem>
        <GridItem>
          <Flex alignItems={"end"} gap={4}>
            <FormControlCard labelForm="Date Finished" type={"date"} />
            <Button width={"20em"} colorScheme="teal">  Submit</Button>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
};

export default FinishOperation;
