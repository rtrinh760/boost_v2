"use client";
import { NextPage } from "next";
import { ErrorProps } from "next/error";

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-900">
      <div className="flex flex-1 flex-col items-center justify-center px-20 text-center text-white">
        <h1>{statusCode}</h1>
        <p>Oops! Something went wrong.</p>
      </div>
    </main>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default Error;
