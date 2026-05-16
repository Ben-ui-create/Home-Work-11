import DbMysql from "./clients/db.mysql";

;(async () => {
  console.log('Running migration...');
  await DbMysql.query(`
      create table if not exists users
      (
          id       bigint primary key auto_increment,
          name     varchar(30),
          age      int,
          email    VARCHAR(255),
          password VARCHAR(255)
      );
  `);
  console.log('-> User table successfully created');

  console.log('Migration finished successfully.');
})();