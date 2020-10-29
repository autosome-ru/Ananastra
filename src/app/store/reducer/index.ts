import {annotationReducer, AnnotationState} from "./annotation.reducer";


export interface AppState {
    annotation: AnnotationState;
}

export const selectData = (state: AppState) => state.annotation;

export const asbAppReducer = {
    annotation: annotationReducer,
};
