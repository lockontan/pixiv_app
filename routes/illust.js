const Router = require('koa-router')

const models = require('../models').models

const querystring = require('querystring')
const config = require('../config')

const router = new Router()

router.get('/illust', async ( ctx )=>{
  let request = ctx.request
  let query = request.query
  query.id = query.id - 0
  if (!query.id) {
    ctx.body = {
      code: 500,
      msg: 'id is required'
    }
    return 
  }

  let params = {
    id: query.id
  }

  try {
    await models.illust.findOne({
      where: params,
      include: [
        {
          model: models.user
        }
      ]
    }).then(function (data) {
      if (!data) {
        ctx.body = {
          code: 500,
          msg: 'id is not exist'
        }
        return
      }
      const user = data.get('user')
      let imgs = data.get('imgs')
      if (imgs && imgs.length) {
        imgs = data.get('imgs').map(item => {
          item.url = config.hostname + item.url
          item.url_big = config.hostname + item.url_big
          item.url_small = config.hostname + item.url_small
          return item
        })
      }
      ctx.body = {
        code: 200,
        data: {
          bookmark_user_total: data.get('bookmark_user_total'),
          rating_count: data.get('rating_count'),
          rating_view: data.get('rating_view'),
          comment_html: data.get('comment_html'),
          id: data.get('id'),
          imgs: imgs,
          title: data.get('title'),
          upload_timestamp: data.get('upload_timestamp'),
          user_id: user.get('id'),
          user_profile_img: user.get('profile_img') ? config.hostname + user.get('profile_img') : '',
          user_name: user.get('user_name'),
          tags: data.get('tags')
        }
      }
    })
  } catch (e) {
    ctx.body = {
      code: 500,
      data: []
    }
  }
})

module.exports = router