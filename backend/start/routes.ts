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
        router.post('/', [AthletesController, 'create'])
        router.get('/', [AthletesController, 'listWithCache'])
        router.get('/:id/profile', [AthletesController, 'showAthleteProfileWithInjuryRisk'])
        router.get('/:id/vitals', [AthletesController, 'getRecentVitalSigns'])
        router.get('/:id/biomechanics', [AthletesController, 'analyzeBiomechanicalProfile'])
        router.patch('/:id', [AthletesController, 'update'])
        router.delete('/:id', [AthletesController, 'delete'])
      })
      .prefix('/athletes')

    router
      .group(() => {
        router.post('/', [VitalSignsController, 'create'])
        router.patch('/:id', [VitalSignsController, 'update'])
        router.delete('/:id', [VitalSignsController, 'delete'])
      })
      .prefix('/vital-signs')

    router
      .group(() => {
        router.post('/', [InjuryRecordsController, 'create'])
        router.patch('/:id', [InjuryRecordsController, 'update'])
        router.delete('/:id', [InjuryRecordsController, 'delete'])
      })
      .prefix('/injury-records')
  })
  .prefix('/api')
  .use(middleware.auth())
