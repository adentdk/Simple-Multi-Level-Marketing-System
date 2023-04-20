const { object, string, number } = require("yup");

exports.getMemberList = object({
  query: object({
    parentId: number().optional(),
    deep: number().max(7).min(0).optional()
  })
})

exports.createMember = object({
  body: object({
    name: string().min(1).max(32).required(),
    parentId: number().optional()
  })
})

exports.migrateMember = object({
  body: object({
    parentId: number().optional(),
    memberId: number().optional()
  }),
  params: object({
    memberId: number().optional()
  })
})

exports.calculateBonuses = object({
  params: object({
    memberId: number().optional()
  }),
  query: object({
    memberId: number().optional(),
    level: string().oneOf(['all', '1', '2']).optional()
  })
})