const dataBase = require("../config/dataBase")

module.exports = {
  async isInTheUserDataBase(column, data, table) {
    try {
      const queryRes = await dataBase.query(
        `
            SELECT *
            FROM ${table}
            WHERE ${column} = $1
            ORDER BY id DESC;
        `,
        [data]
      )

      if (queryRes.rowCount > 0) {
        return {
          isInTheDataBase: true,
          user: queryRes.rows[0],
        }
      }

      return {
        isInTheDataBase: false,
      }
    } catch (error) {
      return {
        isInTheDataBase: false,
      }
    }
  },
}
