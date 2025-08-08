import AthletesController from '#controllers/athletes_controller'
import AuthController from '#controllers/auth_controller'
import DashboardController from '#controllers/dashboard_controller'
import InjuryRecordsController from '#controllers/injuryrecords_controller'
import UsersController from '#controllers/users_controller'
import VitalSignsController from '#controllers/vitalsigns_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('/register', [UsersController, 'createUser'])
router.post('/login', [AuthController, 'login'])

router
  .group(() => {
    router
      .group(() => {
        router.get('/overview', [DashboardController, 'getOverviewDashboardMetrics'])
        router.get('/trends', [DashboardController, 'getTrendingMetrics'])
        router.get('/alerts', [DashboardController, 'getCriticalAlerts'])
        router.get('/team-performance', [DashboardController, 'getTeamPerformance'])
      })
      .prefix('/dashboard')

    router
      .group(() => {
        router.get('/', [AthletesController, 'listWithCache'])
        router.get('/all', [AthletesController, 'getAllAthletes'])
        router.post('/', [AthletesController, 'store'])
        router.get('/:id/profile', [AthletesController, 'showAthleteProfileWithInjuryRisk'])
        router.get('/:id/vitals', [AthletesController, 'getRecentVitalSigns'])
        router.get('/:id/biomechanics', [AthletesController, 'analyzeBiomechanicalProfile'])
      })
      .prefix('/athletes')

    router
      .group(() => {
        router.post('/', [VitalSignsController, 'store'])
        // router.get('/athlete/:athleteId', [VitalSignsController, 'getByAthlete'])
        // router.get('/athlete/:athleteId/period', [VitalSignsController, 'getByPeriod'])
      })
      .prefix('/vital-signs')

    router
      .group(() => {
        router.post('/', [InjuryRecordsController, 'createInjuryRecord'])
        // router.get('/athlete/:athleteId', [InjuryRecordsController, 'getByAthlete'])
        // router.patch('/:id/status', [InjuryRecordsController, 'updateStatus'])
        // router.get('/active', [InjuryRecordsController, 'getActiveInjuries'])
      })
      .prefix('/injury-records')
  })
  .prefix('/api')
  .use(middleware.auth())
