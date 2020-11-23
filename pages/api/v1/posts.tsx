import { NextApiHandler } from "next";
import fs, { promises as fsPromise } from "fs";
import path from "path";
import matter from "gray-matter";

const posts: NextApiHandler = async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const posts = await getPosts();
  res.end(JSON.stringify(posts));
};

const getPosts = async () => {
  const markdownDir = path.join(process.cwd(), "markdown");
  const fileNames = await fsPromise.readdir(markdownDir);
  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(markdownDir, fileName);
    const id = fileName.replace(/\.md$/g, "");
    const text = fs.readFileSync(fullPath, "utf-8");
    const { title, date } = matter(text).data;
    return {
      id,
      title,
      date,
    };
  });
  return posts;
};

export default posts;
