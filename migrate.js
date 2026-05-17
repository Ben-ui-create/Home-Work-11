import DbMysql from "./clients/db.mysql.js";

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

  await DbMysql.query(`
  create table if not exists tasks
  (
      id bigint primary key auto_increment,
      userId VARCHAR(36) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      taskDate DATE NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `);
  console.log('-> Task table successfully created');

  console.log('Migration finished successfully.');
})();