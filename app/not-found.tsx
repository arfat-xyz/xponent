import NotFoundPageClientComponent from "@/components/not-found";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-hook";
import React from "react";

export const metadata = metaDataGeneratorForNormalPage("Not Found");
const NotFoundPage = () => {
  return <NotFoundPageClientComponent />;
};

export default NotFoundPage;
