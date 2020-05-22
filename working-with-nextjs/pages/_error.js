import React from "react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div>
      <h1>Oops, something went wrong</h1>
      <p>
        Try{" "}
        <Link href="/auth">
          <a>going back</a>
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
