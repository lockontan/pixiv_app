const fs = require( 'fs')
const path = require('path')
const ini = require('ini' )
const updateInfo = ini.parse(fs.readFileSync(path.resolve(__dirname, '../config/update.ini'), 'UTF-8'))
const updateDate = updateInfo.date.update

const Router = require('koa-router')

const models = require('../models').models
const sequelize = require('../models').sequelize

const querystring = require('querystring')
const config = require('../config')

const router = new Router()

router.get('/ranking', async ( ctx )=>{
  let request = ctx.request
  let query = request.query
  query.page = query.page - 0 || 1
  query.limit = query.limit - 0 || 10

  let params = {
    date: query.date,
    mode: query.mode || '',
    content: query.content || ''
  }

  if (!query.date) {
    params.date = updateDate
  }

  let total = 0
  let newData = []

  try {
    await models.ranking.findOne({
      where: params,
      attributes: { include: [[sequelize.fn('COUNT', sequelize.col('mode')), 'total']] }
    }).then(function (data) {
      total = data.get('total')
    })

    await models.ranking.findAll({
      offset: (query.page - 1) * query.limit,
      limit: query.limit,
      where: params,
      include: [
        {
          model: models.illust
        },
        {
          model: models.user
        }
      ],
      order: [['rank']]
    }).then(function (data) {
      newData = data.map(item => {
        illust = item.get('illust')
        user = item.get('user')
        illust_imgs = illust.get('imgs')
        if (illust_imgs && illust_imgs.length) {
          illust_imgs.forEach(item => {
            item.url_small = config.hostname + item.url_small
            item.url = config.hostname + item.url
            item.url_big = config.hostname + item.url_big
          })
        } else {
          illust_imgs = []
        }
        return {
          date: item.get('date'),
          rank: item.get('rank'),
          yes_rank: item.get('yes_rank'),
          illust_tags: illust.get('tags'),
          illust_imgs: illust_imgs,
          pages: illust_imgs.length,
          illust_id: illust.get('id'),
          illust_name: illust.get('title'),
          illust_url: illust_imgs && illust_imgs[0] ? illust_imgs[0].url_small : '',
          user_id: user.get('id'),
          user_profile_img: user.get('profile_img') ? config.hostname + user.get('profile_img') : '',
          user_name: user.get('user_name')
        }
      })
    })
    ctx.body = {
      code: 200,
      data: newData,
      total: total
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      data: []
    }
  }
})

router.get('/ranking/date', async ( ctx )=>{
  ctx.body = {
    code: 200,
    daterange: ['2019-08-01', updateDate],
    typeArr: [
      { name: '每日', value: 'daily', index: 0 },
      { name: '每周', value: 'weekly', index: 1 },
      { name: '每月', value: 'monthly', index: 2 }
    ]
  }
})

module.exports = router