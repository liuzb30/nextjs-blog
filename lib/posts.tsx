import path from "path";
import fs, { promises as fsPromise } from "fs";
import matter from "gray-matter";
const markdownDir = path.join(process.cwd(), "markdown");
import marked from "marked";

export const getPosts = async () => {
  const fileNames = await fsPromise.readdir(markdownDir);
  return fileNames.map((fileName) => {
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
};

export const getPost = async (id: string) => {
  const fullPath = path.join(markdownDir, id + ".md");
  const text = fs.readFileSync(fullPath, "utf-8");
  const {
    data: { title, date },
    content,
  } = matter(text);
  const htmlContent = marked(content);
  return JSON.parse(
    JSON.stringify({
      id,
      title,
      date,
      content,
      htmlContent,
    })
  );
};

export const getPostIds = async () => {
  const fileNames = await fsPromise.readdir(markdownDir);
  return fileNames.map((item) => item.replace(/\.md$/g, ""));
};
