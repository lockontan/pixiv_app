const Sequelize = require('sequelize')
const util = require('../util')
const Model = Sequelize.Model
module.exports = function (sequelize, dataTypes) {
	class User extends Model {}
	/**
	 * 用户模型
	 */
	User.init({
		// ID
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		// 用户创建时间
		create_time: {
			type: dataTypes.STRING,
			field: 'user_create_time'
		},
		// 用户名字
		user_name: {
			type: dataTypes.STRING
		},
		// 粉丝数
		follows: {
			type: dataTypes.STRING
		},
		// 用户账号
		account: {
			type: dataTypes.STRING,
			field: 'user_account'
		},
		// 用户性别
		sex: {
			type: dataTypes.STRING,
			field: 'user_sex'
		},
		// 用户头像
		profile_img: {
			type: dataTypes.STRING,
			field: 'profile_img_main'
		},
		// 用户简介
		comment_html: {
			type: dataTypes.STRING,
			field: 'user_comment_html',
			get () {
				return util.undecodeHtml(this.getDataValue('comment_html'))
			}
		}
	}, {
		sequelize,
		modelName: 'user',
		tableName: 'user'
	})

	User.associate = function(models) {
		User.hasMany(models.illust, {
			foreignKey: 'user_id'
		})
	}

	return User
}