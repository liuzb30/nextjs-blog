import {GetServerSideProps, NextApiHandler} from "next";
import { withIronSession } from "next-iron-session";

export default function withSession(handler: NextApiHandler | GetServerSideProps) {
  return withIronSession(handler, {
    password: "f09472a6-141e-4bb0-9fec-ed88d2637223",
    cookieName: "blog",
    cookieOptions: {
      secure:false
    },
  });
}