var express = require('express');

const memberController = require('../controllers/memberV1');
const memberSchema = require('../controllers/schemas/memberV1');

const authController = require('../controllers/authV1')
const authSchema = require('../controllers/schemas/authV1')

const errorController = require('../controllers/errorController');

const validateSchema = require('../middlewares/validateSchema');
const mustLogin = require('../middlewares/mustLogin');

const apiRouter = () => {
  var router = express.Router();

  router.use(express.json());
  router.use(express.urlencoded({ extended: false }));

  router
    .route('/v1/login')
    .post(validateSchema(authSchema.login), authController.login)
    .all(errorController.methodNotAllowed)

  router.use(mustLogin)

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
