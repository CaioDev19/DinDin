const { knex } = require("../config/dataBase")

module.exports = {
  async isInTheUserDataBase(data, table) {
    try {
      const queryRes = await knex(table).where(data)

      if (queryRes.length > 0) {
        return {
          isInTheDataBase: true,
          user: queryRes[0],
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
