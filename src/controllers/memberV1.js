'use strict'
const { StatusCodes } = require('http-status-codes');
const {
  Member,
  Sequelize: {
    col,
    fn,
    literal
  }
} = require('../models');
const response = require('../utils/response')


exports.getMemberList = async (req, res, next) => {
  const {
    query: {
      parentId = null
    }
  } = req;

  const whereOptions = {
    parentId
  };

  try {
    const members = await Member.findAll({
      where: whereOptions,
      attributes: {
        include: [
          [fn('COUNT', col('"children".id')), 'nextLevelCount'],
          [literal(`(COUNT("children".id) * 1) + COUNT("children->children".id) * 0.5`), 'bonuses']
        ]
      },
      include: [
        {
          model: Member,
          as: 'children',
          attributes: [],
          include: [
            {
              model: Member,
              as: 'children',
              attributes: []
            }
          ]
        }
      ],
      group: [
        'Member.id',
      ]
    });

    response.sendJson(res, {
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
    body: memberValues
  } = req;

  try {
    const member = Member.create({
      ...memberValues,
      createdBy: authId,
      updatedBy: authId,
    });

    response.sendJson(res, {
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
      parentId,
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

    member.parentId = parentId;
    member.updatedBy = authId;

    const saveAction = await member.save();

    response.sendJson(res, {
      status: StatusCodes.CREATED,
      data: member,
      meta: {
        saveAction
      }
    })
  } catch (error) {
    next(error)
  }
}
