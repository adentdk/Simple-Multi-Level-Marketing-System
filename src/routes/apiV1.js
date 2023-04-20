var express = require('express');

const memberController = require('../controllers/memberV1');
const memberSchema = require('../controllers/schemas/memberV1');
const errorController = require('../controllers/errorController');

const validateSchema = require('../middlewares/validateSchema');

const apiRouter = () => {
  var router = express.Router();

  router.use(express.json());
  router.use(express.urlencoded({ extended: false }));

  router
    .route('/v1/members')
    .get(validateSchema(memberSchema.getMemberList), memberController.getMemberList)
    .post(validateSchema(memberSchema.createMember), memberController.createMember)
    .all(errorController.methodNotAllowed)

  router
    .route('/v1/members/:memberId/bonuses')
    .get(validateSchema(memberSchema.calculateBonuses), memberController.calculateBonuses)
    .all(errorController.methodNotAllowed)

  router
    .route('/v1/members/:memberId/migrate')
    .post(validateSchema(memberSchema.migrateMember), memberController.migrateMember)
    .all(errorController.methodNotAllowed)

  return router
}

module.exports = apiRouter;
