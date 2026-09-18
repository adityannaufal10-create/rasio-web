export interface CountryCluster {
  country: string;
  luc_pc: number;
  ch4_pc: number;
  n2o_pc: number;
  co2_pc: number;
  populasi: number;
  is_asean: number;
  lat: number;
  lon: number;
  klaster: number;
  nama_klaster: string;
}

export interface ClusterProfile {
  id: number;
  nama: string;
  n_negara: number;
  asean_members: string[];
  non_asean: string[];
  karakteristik: string;
  avg_luc_pc: number;
  avg_ch4_pc: number;
  avg_n2o_pc: number;
  avg_co2_pc: number;
  color: string;
  badge: string;
}

export interface LisaData {
  country: string;
  z: number;
  Wz: number;
  Ii: number;
  p: number;
  kuadran: string;
  lisa: string;
  ASEAN: boolean;
}

export interface MoranYear {
  tahun: number;
  "Moran's I": number;
  p: number;
}

export interface SdmDecomposition {
  variabel: string;
  langsung: number;
  tak_langsung: number;
  total: number;
  "pangsa_limpahan_%"?: number;
}

export interface SpatialModel {
  model: string;
  par: number;
  logLik: number;
  aic: number;
  rho_lambda: number | string;
  r2: number;
  selected: boolean;
}

export interface ForecastProjection {
  year: number;
  y_true?: number;
  forecast: number;
  lower_95?: number;
  upper_95?: number;
  lower_80?: number;
  upper_80?: number;
}
