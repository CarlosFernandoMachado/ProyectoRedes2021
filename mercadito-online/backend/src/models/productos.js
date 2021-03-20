module.exports = (sequelize, DataType) => {

    const Productos = sequelize.define('Productos', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      cantidad: {
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: 1
      },
      precio: {
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
      }
    });
  
    Productos.associate = (models) => {
    Productos.belongsTo(models.Pedidos);
    };
  
    return Productos;
  };