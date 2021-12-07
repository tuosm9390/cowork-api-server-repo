'use strict';
module.exports = {
  //migration을 실행 npx sequelize db:migrate
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      emailAddress: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      admissionDate: {
        type: Sequelize.DATE
      },
      birthday: {
        type: Sequelize.DATE
      },
      profileImage: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),  //column에 값을 넣어주지 않았을 때 기본값을 설정
      }
    });
  },
  //migration을 해제할때 실행 npx sequelize db:migrate:undo
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Members');
  }
};

