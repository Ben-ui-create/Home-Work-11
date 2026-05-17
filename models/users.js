import _ from 'lodash';
import md5 from 'md5';
import CryptoJS from 'crypto-js';

import DbMysql from "../clients/db.mysql.js";

const {
  PASSWORD_SECRET,
  TOKEN_SECRET,
} = process.env;

export async function findById(id) {
  try {
    const [result = null] = (await DbMysql.query(
      `select * from users where id = ? limit 1;`,
      [id]
    )) || [];

    return _.head(result) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUsersList(page = 1, limit = 20) {
  try {
    const [[{ count }]] = await DbMysql.query(
      `select count(*) as count from users;`,
    );

    const offset = Math.ceil((page - 1) * limit);

    const [result] = await DbMysql.query(
      `select id, name, age, email from users limit ? offset ?`,
      [limit, offset]
    );

    return { result, count, page, offset };
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function findByEmail(email) {
  try {
    const [result = null] = await DbMysql.query(
      `select * from users where email = ? limit 1;`,
      [email]
    ) || [];

    return _.head(result) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function checkEmailUnique(email) {
  try {
    const [result = null] = (await DbMysql.query(
      `select * from users where email = ? limit 1;`,
      [email]
    )) || [];

    return !_.isEmpty(result);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function create({name, email, age, password}) {
  try {
    const result = await DbMysql.query(
      `insert into users (name, age, email, password)
      values(?, ?, ?, ?);`,
      [name, age, email, password]
    );

    const id = _.get(result, '0.insertId', null);

    return await findById(id);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function update(id, {name, age}, returnData = false) {
  try {
    const result = await DbMysql.query(
      `update users set name = ?, age = ? where id = ?`,
      [name, age, id]
    );

    const affectedRows = _.get(result, '0.affectedRows', null);

    return returnData ? await findById(id) : affectedRows > 0;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function hashPassword(pass) {
  return md5(md5(pass) + PASSWORD_SECRET);
}

export function encrypt(data) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    TOKEN_SECRET,
  ).toString();
}

export function decrypt(ciphertext) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, TOKEN_SECRET);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

export default {
  create,
  update,
  encrypt,
  decrypt,
  findById,
  findByEmail,
  hashPassword,
  checkEmailUnique,
  getUsersList,
}