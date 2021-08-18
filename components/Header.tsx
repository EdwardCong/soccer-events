import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [session, loading] = useSession();
  // left side has navigation
  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
  // right side has log in functionality 
  let right = null;

  // if client is loading show a loading circle 
  if (loading) {
    right = (
      <div className="right">
        <div className="loader"></div>
        <p>Validating session</p>
        <style jsx>{`
          .loader {
            border: 16px solid #f3f3f3; /* Light grey */
            border-top: 16px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 80px;
            height: 80px;
            animation: spin 2s linear infinite;
            margin-right: auto;
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  // if (!session) {
  //   right = (
  //     <div className="right">
  //       <Link href="/api/auth/signin">
  //         <a data-active={isActive('/signup')}>Log in</a>
  //       </Link>
  //       <style jsx>{`
  //         a {
  //           text-decoration: none;
  //           color: #000;
  //           display: inline-block;
  //         }

  //         a + a {
  //           margin-left: 1rem;
  //         }

  //         .right {
  //           margin-left: auto;
  //         }

  //         .right a {
  //           border: 1px solid black;
  //           padding: 0.5rem 1rem;
  //           border-radius: 3px;
  //         }
  //       `}</style>
  //     </div>
  //   );
  // }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
