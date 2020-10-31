export interface AnnotationDataModel {
  ticketId: string;
  status: string;
  metaInfo: StatsDataModel;
}
export interface StatsDataModel {
  asbCount: number;
  candidatesCount: number;
  ratio: number;
  pValue: number;
  notFound: number;
  oddsRatio: number;
  clAsbs: number;
  clCanidates: number;
  clPvalue: number;
  clOdds: number;
  processingTime: number;
  tfAsbs: number;
  tf_candidates: number;
  tfPvalue: number;
  tfOdds: number;
}

export interface StatsDataBackendModel {
  all_rs: number;
  all_asbs: number;
  all_candidates: number;
  all_log10_p_value: number;
  all_odds: number;
  cl_asbs: number;
  cl_canidates: number;
  cl_log10_p_value: number;
  cl_odds: number;
  processing_time: number;
  tf_asbs: number;
  tf_candidates: number;
  tf_log10_p_value: number;
  tf_odds: number;
}

export interface AnnotationDataBackendModel {
  ticket_id: string;
  status: string;
  meta_info: StatsDataBackendModel;
}

export interface AnnotationSnpBackendModel {
  chromosome: string;
  position: number;
  rs_id: number;
  ref: string;
  alt: string;
  cell_type?: string;
  transcription_factor?: string;
  aggregated_tfs?: string;
  aggregated_cell_types?: string;
}

export interface AnnotationSnpModel {
  chromosome: string;
  position: number;
  rsId: number;
  ref: string;
  alt: string;
  cellType?: string;
  aggregatedTFs?: string;
  transcriptionFactor?: string;
  aggregatedCellTypes?: string;
}
