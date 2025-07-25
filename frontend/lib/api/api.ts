import { Athlete } from "@/app/types/AthleteType";
import {
  AthleteProfile,
  CriticalAlerts,
  InjuryRecord,
  OverviewMetrics,
  TeamPerformanceData,
  TrendingMetrics,
} from "@/app/types/dashboard/DashboardTypes";
import { VitalSign } from "@/app/types/VitalSignType";
import axios, { AxiosInstance, AxiosResponse } from "axios";

class DashboardAPI {
  private api: AxiosInstance;

  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"
  ) {
    this.api = axios.create({
      baseURL: `${baseURL}/api`, // Adiciona o prefixo /api conforme suas rotas
      timeout: 30000, // 30 segundos de timeout
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Interceptor de REQUEST - Executa ANTES de enviar qualquer requisição
    this.api.interceptors.request.use(
      (config) => {
        // Adiciona token de autenticação se existir no localStorage
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("auth_token")
            : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log para debug (remover em produção)
        console.log(
          `🚀 Fazendo requisição para: ${config.method?.toUpperCase()} ${
            config.url
          }`
        );

        return config;
      },
      (error) => {
        console.error("❌ Erro no interceptor de request:", error);
        return Promise.reject(error);
      }
    );

    // Interceptor de RESPONSE - Executa APÓS receber qualquer resposta
    this.api.interceptors.response.use(
      (response) => {
        // Log para debug (remover em produção)
        console.log(`✅ Resposta recebida de: ${response.config.url}`, {
          status: response.status,
          cache: response.headers["x-cache"] || "N/A",
        });

        return response;
      },
      (error) => {
        // Tratamento de erros centralizados
        if (error.response?.status === 401) {
          // Token inválido/expirado - redirecionar para login
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            window.location.href = "/login";
          }
        }

        console.error("❌ Erro na resposta da API:", {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          url: error.config?.url,
        });

        return Promise.reject(error);
      }
    );
  }

  // ===========================================
  // MÉTODOS DO DASHBOARD (seus endpoints originais)
  // ===========================================

  /**
   * GET /api/dashboard/overview
   * Busca métricas gerais do dashboard (cache: 5 min)
   */
  async getOverviewMetrics(): Promise<OverviewMetrics> {
    try {
      const response: AxiosResponse<OverviewMetrics> = await this.api.get(
        "/dashboard/overview"
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar métricas gerais do dashboard");
    }
  }

  /**
   * GET /api/dashboard/trends
   * Busca métricas de tendência dos últimos 7 dias (cache: 30 min)
   */
  async getTrendingMetrics(): Promise<TrendingMetrics> {
    try {
      const response: AxiosResponse<TrendingMetrics> = await this.api.get(
        "/dashboard/trends"
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar métricas de tendência");
    }
  }

  /**
   * GET /api/dashboard/alerts
   * Busca alertas críticos (cache: 1 min)
   */
  async getCriticalAlerts(): Promise<CriticalAlerts> {
    try {
      const response: AxiosResponse<CriticalAlerts> = await this.api.get(
        "/dashboard/alerts"
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar alertas críticos");
    }
  }

  /**
   * GET /api/dashboard/team-performance
   * Busca performance das equipes (cache: 10 min)
   */
  async getTeamPerformance(): Promise<TeamPerformanceData> {
    try {
      const response: AxiosResponse<TeamPerformanceData> = await this.api.get(
        "/dashboard/team-performance"
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar performance das equipes");
    }
  }

  // ===========================================
  // MÉTODOS DOS ATLETAS
  // ===========================================

  /**
   * GET /api/athletes
   * Lista todos os atletas (com cache)
   */
  async getAthletes(): Promise<Athlete[]> {
    try {
      const response: AxiosResponse<Athlete[]> = await this.api.get(
        "/athletes"
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar lista de atletas");
    }
  }

  /**
   * POST /api/athletes
   * Cria um novo atleta
   */
  async createAthlete(athleteData: Partial<Athlete>): Promise<Athlete> {
    try {
      const response: AxiosResponse<Athlete> = await this.api.post(
        "/athletes",
        athleteData
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao criar atleta");
    }
  }

  /**
   * GET /api/athletes/:id/profile
   * Busca perfil completo do atleta com análise de riscos
   */
  async getAthleteProfile(athleteId: number): Promise<AthleteProfile> {
    try {
      const response: AxiosResponse<AthleteProfile> = await this.api.get(
        `/athletes/${athleteId}/profile`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar perfil do atleta ${athleteId}`);
    }
  }

  /**
   * GET /api/athletes/:id/vitals
   * Busca sinais vitais recentes do atleta
   */
  async getAthleteVitals(athleteId: number): Promise<VitalSign[]> {
    try {
      const response: AxiosResponse<VitalSign[]> = await this.api.get(
        `/athletes/${athleteId}/vitals`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar sinais vitais do atleta ${athleteId}`);
    }
  }

  /**
   * GET /api/athletes/:id/biomechanics
   * Análise biomecânica do atleta
   */
  async getAthleteBiomechanics(athleteId: number): Promise<any> {
    try {
      const response: AxiosResponse<any> = await this.api.get(
        `/athletes/${athleteId}/biomechanics`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Erro ao buscar análise biomecânica do atleta ${athleteId}`
      );
    }
  }

  // ===========================================
  // MÉTODOS DOS SINAIS VITAIS
  // ===========================================

  /**
   * POST /api/vital-signs
   * Registra novos sinais vitais
   */
  async createVitalSigns(vitalData: Partial<VitalSign>): Promise<VitalSign> {
    try {
      const response: AxiosResponse<VitalSign> = await this.api.post(
        "/vital-signs",
        vitalData
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao registrar sinais vitais");
    }
  }

  // ===========================================
  // MÉTODOS DOS REGISTROS DE LESÕES
  // ===========================================

  /**
   * POST /api/injury-records
   * Cria um novo registro de lesão
   */
  async createInjuryRecord(
    injuryData: Partial<InjuryRecord>
  ): Promise<InjuryRecord> {
    try {
      const response: AxiosResponse<InjuryRecord> = await this.api.post(
        "/injury-records",
        injuryData
      );
      return response.data;
    } catch (error) {
      throw new Error("Erro ao registrar lesão");
    }
  }

  // ===========================================
  // MÉTODO PARA BUSCAR TODOS OS DADOS DO DASHBOARD
  // ===========================================

  /**
   * Busca todos os dados do dashboard de uma vez usando Promise.all
   * Mais eficiente que fazer requisições sequenciais
   */
  async getAllDashboardData() {
    try {
      const [overview, trending, alerts, teamPerformance] = await Promise.all([
        this.getOverviewMetrics(),
        this.getTrendingMetrics(),
        this.getCriticalAlerts(),
        this.getTeamPerformance(),
      ]);

      return {
        overview,
        trending,
        alerts,
        teamPerformance,
      };
    } catch (error) {
      throw new Error("Erro ao buscar dados completos do dashboard");
    }
  }
}

// Instância singleton da API - Uma única instância reutilizada em toda aplicação
export const dashboardAPI = new DashboardAPI();
