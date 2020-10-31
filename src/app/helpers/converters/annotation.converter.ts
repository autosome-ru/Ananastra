import {
  AnnotationDataBackendModel,
  AnnotationDataModel,
  AnnotationSnpBackendModel,
  AnnotationSnpModel, StatsDataBackendModel, StatsDataModel
} from '../../models/annotation.model';

function convertAnnotationStatsBackendToAnnotationStatsModel(stats: StatsDataBackendModel): StatsDataModel {
  return {
    asbCount: stats.all_asbs,
    candidatesCount: stats.all_candidates - stats.all_asbs,
    ratio: stats.all_candidates > 0 ? stats.all_asbs / stats.all_candidates * 100 : 0,
    pValue: stats.all_log10_p_value,
    oddsRatio: stats.all_odds,
    notFound: stats.all_rs - stats.all_candidates,
    clCanidates: stats.cl_canidates - stats.cl_asbs,
    clAsbs: stats.cl_asbs,
    clOdds: stats.cl_odds,
    clPvalue: stats.cl_log10_p_value,
    tf_candidates: stats.tf_candidates  - stats.tf_asbs,
    processingTime: stats.processing_time,
    tfPvalue: stats.tf_log10_p_value,
    tfOdds: stats.tf_odds,
    tfAsbs: stats.tf_asbs
  };
}

export function convertAnnotationBackendToAnnotationModel(
  model: AnnotationDataBackendModel): AnnotationDataModel {
  return {
    ticketId: model.ticket_id,
    status: model.status,
    metaInfo: convertAnnotationStatsBackendToAnnotationStatsModel(model.meta_info)
  };
}

export function convertAnnotationSnpBackendToAnnotationSnpModel(
  model: AnnotationSnpBackendModel): AnnotationSnpModel {
  return {
    alt: model.alt,
    chromosome: model.chromosome,
    rsId: model.rs_id,
    ref: model.ref,
    position: model.position,
    cellType: model.cell_type,
    aggregatedTFs: model.aggregated_tfs,
    transcriptionFactor: model.transcription_factor,
    aggregatedCellTypes: model.aggregated_cell_types
  };
}
