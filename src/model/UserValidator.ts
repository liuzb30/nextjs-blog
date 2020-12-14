import { User } from "../entity/User";
import { getDatabaseConnection } from "../../lib/getDatabaseConnection";

export class UserValidator {
  user: User;
  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordComfirm: [] as string[],
  };
  async validator() {
    const { username, password, passwordComfirm } = this.user;
    if (username.trim() === "") {
      this.errors.username.push("用户名不能为空");
    }
    if (username.trim().length < 4) {
      this.errors.username.push("用户名不能少于4位");
    }
    if (password === "") {
      this.errors.password.push("密码不能为空");
    }
    if (password.length < 6) {
      this.errors.password.push("密码不能少于6位数");
    }
    if (password !== passwordComfirm) {
      this.errors.passwordComfirm.push("密码不一致");
    }
    const connection = await getDatabaseConnection();
    const user = await connection.manager.findOne(User, {
      where: { username },
    });

    if (user) {
      this.errors.username.push("用户名已存在");
    }
  }
  hasError() {
    return Object.values(this.errors).some((value) => value.length > 0);
  }
}
