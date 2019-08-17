const Sequelize = require('sequelize')
const util = require('../util')
const Model = Sequelize.Model
module.exports = function (sequelize, dataTypes) {
	const ignoreText = ['乳', '裸'] 
	class Illust extends Model {}
	/**
	 * 作品模型
	 */
	Illust.init({
		// ID
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		// 用户Id
		user_id: {
			type: dataTypes.STRING
		},
		// 作品名字
		title: {
			type: dataTypes.STRING
		},
		// 作品创建时间
		upload_timestamp: {
			type: dataTypes.STRING
		},
		// 作品收藏数
		bookmark_user_total: {
			type: dataTypes.STRING
		},
		// 
		rating_count: {
			type: dataTypes.STRING
		},
		// 作品观看数
		rating_view: {
			type: dataTypes.STRING
		},
		// 限制
		x_restrict: {
			type: dataTypes.STRING
		},
		// 作品图片
		imgs: {
			type: dataTypes.JSON,
			get () {
				return JSON.parse(this.getDataValue('imgs'))
			}
		},
		// 作品标签
		tags: {
			type: dataTypes.STRING,
			get () {
				return this.getDataValue('tags').split(',').filter(item => {
					return item && item.split('').every(i => ignoreText.indexOf(i) == -1)
				})
			}
		},
		// 作品简介
		comment_html: {
			type: dataTypes.STRING,
			get () {
				return util.undecodeHtml(this.getDataValue('comment_html'))
			}
		}
	}, { sequelize, modelName: 'illust', tableName: 'illust' })

	Illust.associate = function(models) {
		Illust.belongsTo(models.user, {
			foreignKey: 'user_id'
		})
	}

	return Illust
}