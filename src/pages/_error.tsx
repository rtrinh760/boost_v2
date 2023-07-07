import { NextPage } from "next";
import { ErrorProps } from "next/error";

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div>
      <h1>{statusCode}</h1>
      <p>Oops! Something went wrong.</p>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default Error;