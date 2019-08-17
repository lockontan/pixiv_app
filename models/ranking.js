const Sequelize = require('sequelize')
const Model = Sequelize.Model
module.exports = function (sequelize, dataTypes) {
	class Ranking extends Model {}
	/**
	 * 排行模型
	 */
	Ranking.init({
		// ID
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		// 用户ID
		user_id: {
			type: dataTypes.STRING,
			field: 'user_id'
		},
		// 作品ID
		illust_id: {
			type: dataTypes.STRING
		},
		// 排行分类
		mode: {
			type: dataTypes.STRING
		},
		// 类型
		content: {
			type: dataTypes.STRING
		},
		// 排名
		rank: {
			type: dataTypes.STRING
		},
		// 昨日排名
		yes_rank: {
			type: dataTypes.STRING
		},
		// 排名日期
		date: {
			type: dataTypes.STRING
		}
	}, {
		sequelize,
		modelName: 'ranking',
		tableName: 'ranking'
	})

	Ranking.associate = function(models) {
		Ranking.hasOne(models.user, {
			foreignKey: 'id',
			sourceKey: 'user_id'
		})

		Ranking.hasOne(models.illust, {
			foreignKey: 'id',
			sourceKey: 'illust_id'
		})
	}

	return Ranking
}