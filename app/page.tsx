import HomePageClientComponent from "@/components/home/home-page-client-compoent";
import { metaDataGeneratorForNormalPage } from "@/hooks/meta-hook";
import React from "react";

export const metadata = metaDataGeneratorForNormalPage("All Accounts");
const HomePage = () => {
  return <HomePageClientComponent />;
};

export default HomePage;
