'use strict'
const { StatusCodes } = require('http-status-codes');
const {
  Member,
  sequelize,
  Sequelize: {
    col,
    fn,
  }
} = require('../models');
const response = require('../utils/response');

exports.getMemberList = async (req, res, next) => {
  const {
    query: {
      parentId = null,
      deep: rawDeep = '0',
    }
  } = req;

  const deep = parseInt(rawDeep, 10)

  const whereOptions = {
    parentId
  };

  let parentAttributes = {
    include: [[fn('COUNT', col('"children".id')), 'nextLevelCount']]
  };

  let parentInclude = [
    {
      model: Member,
      as: 'children',
      attributes: []
    }
  ]

  let parentGrup = ['Member.id']

  if (deep) {
    parentAttributes.include = []
    parentInclude = [
      {
        model: Member,
        as: 'children',
        attributes: {
          include: [
            [fn('COUNT', col('"children->children".id')), 'nextLevelCount']
          ],
        },
        include: [
          {
            model: Member,
            as: 'children',
            attributes: []
          }
        ]
      }
    ]
    parentGrup.push('children.id')
  }

  try {
    const members = await Member.findAll({
      where: whereOptions,
      attributes: parentAttributes,
      include: parentInclude,
      group: parentGrup
    });

    return response.sendJson(res, {
      status: 200,
      data: members,
    })
  } catch (error) {
    next(error);
  }
}

exports.createMember = async (req, res, next) => {
  const {
    auth: {
      userId: authId,
    } = {
      userId: null
    },
    body: { parentId, ...memberValues }
  } = req;

  try {
    if (parentId) {
      const parent = await Member.findByPk(parentId);
  
      if (!parent) {
        throw {
          status: StatusCodes.BAD_REQUEST,
          message: 'Parent not found'
        }
      }
  
      const member = await parent.createChild({
        ...memberValues,
        createdBy: authId,
        updatedBy: authId,
      });
  
      return response.sendJson(res, {
        status: StatusCodes.CREATED,
        data: member
      })
    }

    const member = await Member.create({
      parentId,
      ...memberValues,
      createdBy: authId,
      updatedBy: authId,
    });

    return response.sendJson(res, {
      status: StatusCodes.CREATED,
      data: member
    })
  } catch (error) {
    next(error)
  }
}

exports.migrateMember = async (req, res, next) => {
  const {
    auth: {
      userId: authId
    } = {
      userId: null
    },
    body: {
      parentId = null,
    },
    params: {
      memberId,
    }
  } = req;

  try {
    const member = await Member.findByPk(memberId);

    if (member === null) {
      throw {
        status: StatusCodes.BAD_REQUEST,
        message: 'Member not found',
      };
    }

    let newParent = null
    if (parentId) {
      newParent = await Member.findByPk(parentId);

      if (!newParent) {
        throw {
          status: StatusCodes.BAD_REQUEST,
          message: 'Parent not found'
        }
      }
    }

    const previousParent = await member.getParent();

    const lastPromises = [];
    const saveActions = await sequelize.transaction(async (t) => {
      if (previousParent) {
        previousParent.updatedBy = authId;
        lastPromises.push(previousParent.save({ transaction: t }))
      }

      if (newParent) {
        newParent.updatedBy = authId;
        lastPromises.push(newParent.save({ transaction: t }))
      }

      member.updatedBy = authId;
      member.parentId = parentId

      lastPromises.push(member.save({ transaction: t }))

      return Promise.all(lastPromises)
    })

    return response.sendJson(res, {
      status: StatusCodes.CREATED,
      data: member,
      meta: {
        saveActions
      }
    })
  } catch (error) {
    console.log(error.message)
    next(error)
  }
}

exports.calculateBonuses = async (req, res, next) => {
  const {
    params: {
      memberId,
    },
    query: {
      level = 'all'
    }
  } = req;

  const level1 = level === '1' || level === 'all'
  const level2 = level === '2' || level === 'all'

  try {
    const member = await Member.findByPk(memberId);

    const promises = [];

    if (level1) {
      promises.push(member.countChildren())
    }

    if (level2) {
      const children = await member.getChildren();

      promises.push(...children.map(child => child.countChildren()))
    }

    const [firstResult, ...restResult] = await Promise.all(promises);

    let total = 0;

    if (level === '1') {
      total += firstResult;
    } else if (level === '2') {
      total += [firstResult, ...restResult].reduce((a, b) => a + b * 0.5, 0);
    } else {
      total += firstResult;
      total += restResult.reduce((a, b) => a + b * 0.5, 0);
    }

    return response.sendJson(res, {
      status: StatusCodes.OK,
      data: total
    })

  } catch (error) {
    next(error)
  }
}
