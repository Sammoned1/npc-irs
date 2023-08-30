const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(63), allowNull: false, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false },
    task_amount: { type: DataTypes.INTEGER, allowNull: false },
    overall_progress: { type: DataTypes.DECIMAL, allowNull: false },
  },
  { timestamps: false }
);

const Task = sequelize.define(
  "task",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    task: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.STRING(63), allowNull: false },
    progress: { type: DataTypes.DECIMAL, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: true}
  },
  { timestamps: false }
);

User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });

// Task.addHook("afterCreate", (task) => {
//   sequelize
//     .query(
//       `UPDATE public.users
//              SET task_amount=task_amount + 1
//              WHERE id = ${task.user_id}`
//     )
//     .then((data) => {});
// });

module.exports = {
  User,
  Task,
};
