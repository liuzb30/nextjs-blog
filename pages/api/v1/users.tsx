import { NextApiHandler } from "next";
import { getDatabaseConnection } from "../../../lib/getDatabaseConnection";
import md5 from "md5";
import { User } from "../../../src/entity/User";
import { UserValidator } from "../../../src/model/UserValidator";

const users: NextApiHandler = async (req, res) => {
  const { username, password, passwordComfirm } = req.body;
  // 校验
  const userValidator = new UserValidator();
  const user = new User();
  user.username = username;
  user.password = password;
  user.passwordComfirm = passwordComfirm;
  userValidator.user = user;
  await userValidator.validator();
  // 判断是否有错误
  res.setHeader("Content-Type", "application/json");
  if (userValidator.hasError()) {
    res.statusCode = 422;
    res.end(JSON.stringify(userValidator.errors));
  } else {
    // 创建用户
    const connection = await getDatabaseConnection();
    await connection.manager.save(userValidator.user);
    res.statusCode = 200;
    res.end(JSON.stringify(userValidator.user));
  }
};

export default users;
