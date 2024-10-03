import React from "react";
import AFENumber from "./FormHandling/AFENumber";
import CardFormK3 from "../Components/CardFormK3";
import { FaPlus } from "react-icons/fa6";
import { Button } from "@chakra-ui/react";
import DocPengajuanP3 from "./FormHandling/DocPengajuanP3";
import DocWPB from "./FormHandling/DocWPB";
import DocProjSummary from "./FormHandling/DocProjSummary";
import DocPernyataan from "./FormHandling/DocPernyataan";
import DocLapPekerjaan from "./FormHandling/DocLapPekerjaan";
import DocFormulir from "./FormHandling/DocFormulir";
import DocKorepondensi from "./FormHandling/DocKorespondensi";
import DocNotProduction from "./FormHandling/DocNotProduction";
import DocListMaterial from "./FormHandling/DocListMaterial";
import DocsOthers from "./FormHandling/DocOthers";

const SubmitP3 = () => {
  const renderButton = () => {
    return (
      <Button colorScheme="teal" isDisabled size={"md"} px={10}>
        Save
      </Button>
    );
  };
  return (
    <div>
      <CardFormK3
        title="AJUKAN P3"
        icon={FaPlus}
        subtitle=""
        actionButton={renderButton()}
      >
        <AFENumber />
        <DocPengajuanP3 />
        <DocWPB />
        <DocProjSummary />
        <DocPernyataan />
        <DocLapPekerjaan />
        <DocFormulir/>
        <DocKorepondensi/>
        <DocNotProduction/>
        <DocListMaterial/>
        <DocsOthers/>
      </CardFormK3>
    </div>
  );
};

export default SubmitP3;
