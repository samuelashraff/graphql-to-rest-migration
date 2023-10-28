import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

const db = (function () {
  let instance: sqlite3.Database | undefined;

  function createInstance(): sqlite3.Database {
      const _db = new sqlite3.Database(":memory:", (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Connected to the in-memory SQLite database.");
      });
    
      const initSqlPath = path.resolve(__dirname, "init.sql");
      const initSql = fs.readFileSync(initSqlPath).toString();
    
      const dataSqlPath = path.resolve(__dirname, "data.sql");
      const dataSql = fs.readFileSync(dataSqlPath).toString();
    
      _db.exec(initSql);
      _db.exec(dataSql);
      return _db;
  }

  return {
      getInstance: function () {
          if (!instance) {
              instance = createInstance();
          }
          return instance;
      }
  };
})();



export default db;