module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true
        },
        nick: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local'
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        profileImg: {
            type: DataTypes.STRING(30),
            defaultValue: 'defaultImg'
        }
    }, {
        timestamps: true,
        paranoid: true
    })
);