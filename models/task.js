import DbMysql from "../clients/db.mysql.js";
import _ from 'lodash';

export async function findById(id) {
  try {
    const [result = null] = (await DbMysql.query(
      `select * from tasks where id = ? limit 1;`,
      [id]
    )) || [];

    return _.head(result) || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getTasksList(page = 1, limit = 20) {
  try {
    const [[{count}]] = await DbMysql.query(
      `select count(*) as count from tasks;`,
    );

    const offset = Math.ceil((page - 1) * limit);

    const [result] = await DbMysql.query(
      `select title, description, taskDate from tasks limit ? offset ?`,
      [limit, offset]
    );

    return {result, count, page, offset};
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function create({title, description, taskDate}) {
  try {
    const result = await DbMysql.query(
      `insert into tasks (title, description, taskDate)
       values (?, ?, ?);`,
      [title, description, taskDate]
    );

    const id = _.get(result, '0.insertId', null);

    return await findById(id);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function update(id, {title, description, taskDate}, returnData = false) {
  try {
    const result = await DbMysql.query(
      `update tasks set title = ?, description = ?, taskDate = ? where id = ?`,
      [title, description, taskDate]
    );

    const affectedRows = _.get(result, '0.affectedRows', null);

    return returnData ? await findById(id) : affectedRows > 0;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteTask(id) {
  try {
    const result = await DbMysql.query(
      `delete from tasks where id = ?`,
      [id]
    );

    const affectedRows = _.get(result, '0.affectedRows', null);

    return affectedRows > 0;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default {
  findById,
  create,
  update,
  deleteTask,
};