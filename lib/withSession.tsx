import {GetServerSideProps, NextApiHandler} from "next";
import { withIronSession } from "next-iron-session";

export default function withSession(handler: NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    password: process.env.SECRET,
    cookieName: "blog",
    cookieOptions: {
      secure:false
    },
  });
}