import * as fromActions from "src/app/store/action/annotation.action";
import {AnnotationDataModel, AnnotationSnpModel} from '../../models/annotation.model';
import {
  convertAnnotationBackendToAnnotationModel,
  convertAnnotationSnpBackendToAnnotationSnpModel
} from '../../helpers/converters/annotation.converter';


export interface AnnotationState {
    annotations: {
        [ticket: string]: {
            loading: boolean,
            annotationData?: AnnotationDataModel,
            tf?: {
              data?: AnnotationSnpModel[],
              loading: boolean
            },
            cl?: {
              data?: AnnotationSnpModel[],
              loading: boolean
            }
        },
    };
}

export const selectAnnotations = (state: AnnotationState) => state.annotations;


export const initialState: AnnotationState = {
    annotations: {},
};

export function annotationReducer(state: AnnotationState = initialState, action: fromActions.ActionUnion): AnnotationState {
    switch (action.type) {
        case fromActions.ActionTypes.StartAnnotation: {
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload]: {
                        loading: true,
                    },
                }

            };
        }
        case fromActions.ActionTypes.StartAnnotationFail: {
            return {
                ...state,
                annotations: {
                    ...state.annotations,
                    [action.payload]: {
                        loading: false,
                    },
                }
            };
        }
      case fromActions.ActionTypes.LoadAnnotationInfoStatsSuccess: {
        console.log(action.payload.status);
        return {
          ...state,
          annotations: {
            ...state.annotations,
            [action.payload.ticket_id]: {
              loading: action.payload.status !== 'Processed',
              annotationData: action.payload.status !== 'Processed' ? null : convertAnnotationBackendToAnnotationModel(action.payload)
            },
          }
        };
      }
      case fromActions.ActionTypes.LoadAnnotationInfoStatsFail: {
        return {
          ...state,
          annotations: {
            ...state.annotations,
            [action.payload]: {
              loading: false,
            },
          }
        };
      }

      case fromActions.ActionTypes.LoadAnnotationTable: {
          return {
            ...state,
            annotations: {
              ...state.annotations,
              [action.payload.ticket]: {
                ...state.annotations[action.payload.ticket],
                [action.payload.tfOrCl]: {
                  loading: true
                }
              }
            }
          };
        }
      case fromActions.ActionTypes.LoadAnnotationTableFail: {
        return {
          ...state,
          annotations: {
            ...state.annotations,
            [action.payload.ticket]: {
              ...state.annotations[action.payload.ticket],
              [action.payload.tfOrCl]: {
                loading: false
              }
            }
          }
        };
      }
      case fromActions.ActionTypes.LoadAnnotationTableSuccess: {
        return {
          ...state,
          annotations: {
            ...state.annotations,
            [action.payload.ticket]: {
              ...state.annotations[action.payload.ticket],
              [action.payload.tfOrCl]: {
                loading: false,
                data: action.payload.snps.map(convertAnnotationSnpBackendToAnnotationSnpModel)
              }
            }
          }
        };
      }

      default: {
          return state;
      }
    }
}
