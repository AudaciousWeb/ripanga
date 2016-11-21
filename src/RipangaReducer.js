import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';

const COLLAPSE_GROUP = 'ripanga/COLLAPSE_GROUP';
export const collapseGroup = createAction(COLLAPSE_GROUP);

const CLEAR_COLLAPSED_GROUPS = 'ripanga/CLEAR_COLLAPSED_GROUPS';
export const clearCollapsedGroups = createAction(CLEAR_COLLAPSED_GROUPS);

const TOGGLE_GROUP = 'ripanga/TOGGLE_GROUP';
export const toggleGroup = createAction(TOGGLE_GROUP);

const SCROLL_SLIDER = 'ripanga/SCROLL_SLIDER';
export const scrollSlider = createAction(SCROLL_SLIDER);

const SET_CHECKED = 'ripanga/SET_CHECKED';
export const setChecked = createAction(SET_CHECKED);

const SET_UNCHECKED = 'ripanga/SET_UNCHECKED';
export const setUnchecked = createAction(SET_UNCHECKED);

const storeCheckedStates = (checkedIds, globalKey) => {
  localStorage.setItem(`${globalKey}/CHECKED`, JSON.stringify(checkedIds.toJS()));
};

const reducer = handleActions({
  [COLLAPSE_GROUP]: (state, { payload: index }) => {
    const val = state.getIn(['collapsedGroups', index]);
    return state.setIn(['collapsedGroups', index], !val);
  },

  [TOGGLE_GROUP]: (state, { payload: index }) => {
    const val = state.getIn(['toggledGroups', index]);
    return state.setIn(['toggledGroups', index], !val);
  },

  [SCROLL_SLIDER]: (state, { payload: value }) => {
    return state.set('sliderValue', value);
  },
  [SET_CHECKED]: (state, { payload: { ids, globalKey, onCheck } }) => {
    const checkedIds = ids.reduce((acc, id) => acc.set(id, true), state.get('checkedIds'));
    onCheck ? onCheck(checkedIds) : null;
    storeCheckedStates(checkedIds, globalKey);
    return state.set('checkedIds', checkedIds);
  },

  [SET_UNCHECKED]: (state, { payload: { ids, globalKey, onCheck } }) => {
    const checkedIds = ids.reduce((acc, id) => acc.delete(id), state.get('checkedIds'));
    onCheck ? onCheck(checkedIds) : null;
    storeCheckedStates(checkedIds, globalKey);
    return state.set('checkedIds', checkedIds);
  },
  [CLEAR_COLLAPSED_GROUPS]: (state) => {
    return state.set('collapsedGroups', List());
  },
}, Map({ 'collapsedGroups': List(), 'toggledGroups': List(), 'checkedIds': Map() }));

export default reducer;
