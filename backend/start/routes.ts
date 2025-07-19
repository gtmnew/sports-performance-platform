import AthletesController from '#controllers/athletes_controller'
import DashboardController from '#controllers/dashboard_controller'
import InjuryRecordsController from '#controllers/injuryrecords_controller'
import VitalSignsController from '#controllers/vitalsigns_controller'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    // 📊 DASHBOARD ROUTES
    router
      .group(() => {
        // Métricas gerais do sistema (cached 5 min)
        router.get('/overview', [DashboardController, 'getOverviewDashboardMetrics'])

        // Tendências dos últimos 7 dias (cached 30 min)
        router.get('/trends', [DashboardController, 'getTrendingMetrics'])

        // 🚨 Alertas críticos em tempo real (cached 1 min)
        router.get('/alerts', [DashboardController, 'getCriticalAlerts'])

        // 🏆 Performance por equipes/posições (cached 10 min)
        router.get('/team-performance', [DashboardController, 'getTeamPerformance'])
      })
      .prefix('/dashboard')

    // 👥 ATHLETES ROUTES
    router
      .group(() => {
        // Lista de atletas ativos (cached 5 min)
        router.get('/', [AthletesController, 'listWithCache'])

        // ➕ Criar novo atleta
        router.post('/', [AthletesController, 'store'])

        // Perfil completo do atleta com risco de lesão (cached 1h)
        router.get('/:id/profile', [AthletesController, 'showAthleteProfileWithInjuryRisk'])

        // 📊 Sinais vitais mais recentes (cached 30 seg)
        router.get('/:id/vitals', [AthletesController, 'getRecentVitalSigns'])

        // 🔬 Análise biomecânica completa (cached 30 min)
        router.get('/:id/biomechanics', [AthletesController, 'analyzeBiomechanicalProfile'])
      })
      .prefix('/athletes')

    router
      .group(() => {
        // ➕ Registrar novos sinais vitais
        router.post('/', [VitalSignsController, 'store'])

        // 📊 Histórico de sinais vitais do atleta
        // router.get('/athlete/:athleteId', [VitalSignsController, 'getByAthlete'])

        // 📈 Sinais vitais por período
        // router.get('/athlete/:athleteId/period', [VitalSignsController, 'getByPeriod'])
      })
      .prefix('/vital-signs')

    // // 🏥 INJURY RECORDS ROUTES
    // router
    //   .group(() => {
    //     // ➕ Registrar nova lesão
    //     router.post('/', [InjuryRecordsController, 'store'])

    //     // 📋 Histórico de lesões do atleta
    //     router.get('/athlete/:athleteId', [InjuryRecordsController, 'getByAthlete'])

    //     // 🔄 Atualizar status da lesão
    //     router.patch('/:id/status', [InjuryRecordsController, 'updateStatus'])

    //     // 📊 Lesões ativas no sistema
    //     router.get('/active', [InjuryRecordsController, 'getActiveInjuries'])
    //   })
    //   .prefix('/injury-records')
  })
  .prefix('/api')
