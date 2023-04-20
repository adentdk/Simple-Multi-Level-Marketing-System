var express = require('express');

const memberV1 = require('../controllers/memberV1');
const errorController = require('../controllers/errorController')

const apiRouter = () => {
  var router = express.Router();

  router.use(express.json());
  router.use(express.urlencoded({ extended: false }));

  router
    .route('/v1/members')
    .get(memberV1.getMemberList)
    .post(memberV1.createMember)
    .all(errorController.methodNotAllowed)

  router
    .route('/v1/members/:memberId/bonuses')
    .get(memberV1.calculateBonuses)
    .all(errorController.methodNotAllowed)

  router
    .route('/v1/members/:memberId/migrate')
    .post(memberV1.migrateMember)
    .all(errorController.methodNotAllowed)

  return router
}

module.exports = apiRouter;
