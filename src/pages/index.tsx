import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Navbar } from "../components/Navbar";

const Index = () => (
  <>
    <Navbar />
    <div>Hello, World!</div>
  </>
);

export default withUrqlClient(createUrqlClient)(Index);
