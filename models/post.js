module.exports = (sequelize, DataTypes) => {
    sequelize.define('post', {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        roomType: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        floor: {
            type: DataTypes.NUMBER
        },
        img: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },

    })
}