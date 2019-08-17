// import
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

// 实例化 sequelize
var sequelize = new Sequelize('pixiv', 'root', '123456', {
	host: '127.0.0.1',
	port: 3306,
	dialect: 'mysql',
	pool: {
		max: 10000,
		min: 0,
		idle: 10000
	},
	define: {
		timestamps: false,
		freezeTableName: false,
		underscored: true,
		paranoid: true	// 偏执模式（逻辑删除）
	}
});

// 模型列表
var models = {};
var ignore = ['index.js'];

// 初始化模型
fs.readdirSync(__dirname).filter(function(file) {
	return (file.indexOf('.') !== 0) && (ignore.indexOf(file) < 0);
}).forEach(function(file) {
	var model = sequelize.import(path.join(__dirname, file));
	models[model.name] = model;
});

// 关联模型关系
Object.keys(models).forEach(function(modelName) {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
});

// export
module.exports = {
	models: models,
	sequelize: sequelize
}
