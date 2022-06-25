const Joi = require('joi')

// 用法
// try {
//   await fusionDataSchema.validateAsync(tracks, {
//     abortEarly: true, // true：第一个错误，false：把所有的错误报出来
//     convert: false,
//   });
// } catch (err) {
//   console.error('校验失败: tracks', err.message);
// }

const fusionDataSchema = Joi.array().items(
  Joi.object({
    id: Joi.string().required(),
    type: Joi.string().valid(
      'audio',
      'video',
      'image',
      'sticker',
      'text',
      'subtitle',
      'frame',
      'shader',
      'title'
    ).required(), // track 类型
    order: Joi.number().required(),
    subType: Joi.when('type', {
      is: 'frame',
      then: Joi.string().valid('shader')
    }),
    styles: Joi.when('type', {
      is: 'subtitle',
      then: Joi.array().items(
        Joi.object().keys({
          id: Joi.string().required(),
          content: Joi.object({
            template_id: Joi.string().valid('yj_templ_subtitle_common').required(),
            params: {
              align: Joi.string().valid('center').required(),
              background_alpha: Joi.number().min(0).max(100),
              background_color: Joi.string(),
              bold: Joi.number().required(),
              font: Joi.string().required(),
              font_color: Joi.string().required(),
              font_size: Joi.number().min(0).max(100).required(),
              height: Joi.number(),
              italic: Joi.number(),
              margin_bottom: Joi.number(),
              font_alpha: Joi.number(),
              font_align: Joi.string().valid('center', 'left'),
              font_align_margin: Joi.number(),
              border_color: Joi.string(),
              border_width: Joi.number(),
              bottom_color: Joi.string(),
              bottom_alpha: Joi.number()
            }
          })
        })
      )
    }),
    items: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        start_time: Joi.number().required(),
        duration: Joi.number().required(),
        type: Joi.string().valid(
          'video',
          'image',
          'advanced_text',
          'audio',
          'sticker',
          'transition',
          'frame',
          'advanced_title',
          'title',
          'subtitle',
          'text',
          'sequence_title',
          'sequence_image',
          'sequence_effect',
          'sequence'
        ), // trackItem 类型,
        section: Joi.object({
          from: Joi.number().required(),
          to: Joi.number().required()
        }),
        controlLocked: Joi.when('type', {
          is: 'video',
          then: Joi.boolean()
        }),
        asset_id: Joi.string().required(),
        filter_asset_id: Joi.string().allow(''),
        sequence_id: Joi.when('type', {
          is: 'sequence',
          then: Joi.string().required()
        }),
        sizeRatio: Joi.when('type', {
          is: 'title',
          then: Joi.number().integer().required()
        }),
        pause: Joi.when('type', {
          is: 'sequence',
          then: Joi.array().required()
        }),
        transition: Joi.when('type', {
          is: 'sequence',
          then: Joi.array().required()
        }),
        transitionFE: Joi.when('type', {
          is: 'sequence',
          then: Joi.object({
            end: Joi.object({
              name: Joi.string().allow('').required(),
              duration: Joi.number().required()
            }),
            start: Joi.object({
              name: Joi.string().allow('').required(),
              duration: Joi.number().required()
            })
          })
        }),
        width: Joi.when('type', {
          not: Joi.string().valid('transition', 'subtitle', 'audio', 'frame'),
          then: Joi.number().required()
        }),
        height: Joi.when('type', {
          not: Joi.string().valid('transition', 'subtitle', 'audio', 'frame'),
          then: Joi.number().required()
        }),
        prev_item_id: Joi.when('type', {
          is: 'transition',
          then: Joi.string() // operations[0].type === 'trans_audio_fade_inout' 的时候不需要，想办法判断
        }),
        next_item_id: Joi.when('type', {
          is: 'transition',
          then: Joi.string().required()
        }),
        record: Joi.when('type', {
          is: 'transition',
          then: Joi.object({
            next_item_init: Joi.number().required(),
            next_item_start_time: Joi.number().required(),
            prev_item_init: Joi.number().required()
          })
        }),
        position: Joi.object({
          x: Joi.number().required(),
          y: Joi.number().required(),
          type: Joi.when('.type', {
            is: 'sequence_title',
            then: Joi.string().valid('ct')
          })
        }),
        slot_params: Joi.object({
          id: Joi.number().required()
        }),
        style_id: Joi.when('type', {
          is: 'subtitle',
          then: Joi.string().required()
        }),
        text: Joi.when('type', {
          is: 'subtitle',
          then: Joi.string().allow('').required()
        }),
        is_new: Joi.when('type', {
          is: 'subtitle',
          then: Joi.bool() // 部分 subtitle 有这个字段
        }),
        sizeControl: Joi.when('type', {
          is: 'image',
          then: Joi.number().valid(0, 1) // 有的 image 有这个字段，有的没有
        }),
        scale: Joi.when('type', {
          is: 'sequence_title',
          then: Joi.number().required()
        }),
        content: Joi.when('type', {
          is: 'sequence_title',
          then: Joi.object({
            template_id: Joi.string().valid('yj_templ_title_sequence').required(),
            params: Joi.object({
              asset_id: Joi.string().required(),
              container: Joi.object({
                width: Joi.number().required(),
                height: Joi.number().required()
              }).required(),
              initContainer: Joi.object({
                width: Joi.number().required(),
                height: Joi.number().required()
              }).required(),
              layers: Joi.array().items(
                Joi.object().keys({
                  type: Joi.string().valid('sequence_text', 'sequence_image'),
                  content: Joi.object({
                    template_id: Joi.string().valid('yj_templ_title_text'),
                    params: Joi.object({
                      text: Joi.string().required(),
                      text_style: Joi.object({
                        background_alpha: Joi.number().required(),
                        background_color: Joi.string().required(),
                        border_color: Joi.string().required(),
                        border_width: Joi.number().required(),
                        bottom_alpha: Joi.number().required(),
                        bottom_color: Joi.string().required(),
                        font: Joi.string().required(),
                        font_align: Joi.string().valid('center', 'left').required(),
                        font_alpha: Joi.number().required(),
                        font_bold: Joi.number().required(),
                        font_color: Joi.string().required(),
                        font_italic: Joi.number().required(),
                        font_size: Joi.number().required(),
                        font_uline: Joi.number().required(),
                        shadow_color: Joi.string().required().allow('')
                      })
                    })
                  }),
                  duration: Joi.number().required(),
                  height: Joi.number().required(),
                  id: Joi.string().required(),
                  order: Joi.number().required(),
                  position: Joi.object({
                    x: Joi.number().required(),
                    y: Joi.number().required()
                  }),
                  start_time: Joi.number().required(),
                  text: Joi.when('type', {
                    is: 'sequence_text',
                    then: Joi.string().required()
                  }),
                  textBox: Joi.object({
                    width: Joi.number().required(),
                    height: Joi.number().required(),
                    fontSize: Joi.number().required()
                  }),
                  transition: Joi.array().required(),
                  width: Joi.number().required(),
                  sequence_id: Joi.when('type', {
                    is: 'sequence_image',
                    then: Joi.string().required()
                  }),
                  pause: Joi.when('type', {
                    is: 'sequence_image',
                    then: Joi.array().required()
                  }),
                  operations: Joi.when('type', {
                    is: 'sequence_image',
                    then: Joi.array().items({
                      type: Joi.string().valid('image_rotate'),
                      params: Joi.when('type', {
                        is: 'image_rotate',
                        then: Joi.object({
                          angle: Joi.number().required()
                        })
                      })
                    })
                  })
                })
              )
            })
          }).required()
        }),
        operations: Joi.array().items(
          Joi.object().keys({
            type: Joi.string().valid(
              'image_mirror',
              'image_rotate',
              'image_filter_normal',
              'image_filter_lut',
              'image_crop',
              'image_space',
              'trans_image_glt',
              'image_glshader',
              'audio_volumes',
              'image_mosaic',
              'image_transparent',
              'image_lens_stretch',
              'trans_audio_fade_inout'
            ).required(),
            from: Joi.when('type', {
              is: 'image_space',
              then: Joi.string().valid('crop_start', 'crop_end').required()
            }),
            transformName: Joi.when('type', {
              is: 'image_lens_stretch',
              then: Joi.string().valid('ZoomIn', 'ZoomOut', 'MoveLeft', 'MoveUp', 'MoveRight', 'MoveDown').required()
            }),
            params: Joi.required()
              .when('type', {
                is: 'image_rotate',
                then: Joi.object({
                  angle: Joi.number().integer().required()
                })
              })
              .when('type', {
                is: 'image_lens_stretch',
                then: Joi.object({
                  duration: Joi.number().required(),
                  from_center: Joi.array().items(Joi.number()).required(),
                  from_scale: Joi.array().items(Joi.number()).required(),
                  name: Joi.string().valid('Stretch', 'Transform'),
                  start_time: Joi.number().required(),
                  to_center: Joi.array().items(Joi.number()).required(),
                  to_scale: Joi.array().items(Joi.number()).required()
                })
              })
              .when('type', {
                is: 'image_transparent',
                then: Joi.object({
                  alpha: Joi.number().integer().required()
                })
              })
              .when('type', {
                is: 'image_mosaic',
                then: Joi.object({
                  degree: Joi.number().required(),
                  height: Joi.number().required(),
                  name: Joi.string().valid('vague', 'mosaic'),
                  width: Joi.number().required(),
                  x: Joi.number().required(),
                  y: Joi.number().required()
                })
              })
              .when('type', {
                is: 'audio_volumes',
                then: Joi.object({
                  all: Joi.number().integer().required()
                })
              })
              .when('type', {
                is: 'image_mirror',
                then: Joi.object({
                  left_right: Joi.number().valid(0, 1).required(),
                  up_down: Joi.number().valid(0, 1).required()
                })
              })
              .when('type', {
                is: 'image_filter_normal',
                then: Joi.object({
                  contrast: Joi.number().integer().min(-100).max(100)
                    .required(),
                  brightness: Joi.number().integer().min(-100).max(100)
                    .required(),
                  saturation: Joi.number().integer().min(-100).max(100)
                    .required()
                })
              })
              .when('type', {
                is: 'image_toning',
                then: Joi.object({
                  contrast: Joi.number().integer().min(-100).max(100)
                    .required(),
                  brightness: Joi.number().integer().min(-100).max(100)
                    .required(),
                  saturation: Joi.number().integer().min(-100).max(100)
                    .required(),
                  sharpen: Joi.number().integer().min(0).max(100)
                    .required()
                })
              })
              .when('type', {
                is: 'image_filter_lut',
                then: Joi.object({
                  name: Joi.string().required(),
                  image_url: Joi.string().required()
                })
              })
              .when('type', {
                is: 'image_transparent',
                then: Joi.object({
                  alpha: Joi.number().integer().min(0).max(100)
                    .required()
                })
              })
              .when('type', {
                is: 'image_crop',
                then: Joi.object({
                  x: Joi.number().required(),
                  y: Joi.number().required(),
                  width: Joi.number().required(),
                  height: Joi.number().required(),
                  baseRect: Joi.object({
                    width: Joi.number().required(),
                    height: Joi.number().required()
                  })
                })
              })
              .when('type', {
                is: 'image_space',
                then: Joi.object({
                  x: Joi.number(), // 有的 image_space 没有
                  y: Joi.number(), // 有的 image_space 没有
                  width: Joi.number().required(),
                  height: Joi.number().required()
                })
              })
              .when('type', {
                is: 'trans_image_glt',
                then: Joi.object({
                  name: Joi.string().required()
                })
              })
              .when('type', {
                is: 'trans_audio_fade_inout',
                then: Joi.object()
              })

          })
        ),
        shaderName: Joi.when('type', {
          is: 'frame',
          then: Joi.string() // operations type image_mosaic 没有这个字段
        }),
        controlVisible: Joi.when('type', {
          is: 'frame',
          then: Joi.bool() // operations type image_mosaic 没有这个字段
        })
      })
    ).required()
  })
)

module.exports = fusionDataSchema
