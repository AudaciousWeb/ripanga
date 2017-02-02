import bindActionCreators from 'redux/es/bindActionCreators';
import {
  clearCollapsedGroups,
  collapseGroup,
  scrollSlider,
  retrieveCheckedStates,
  setChecked,
  setUnchecked,
  setSort,
  toggleGroup,
  trackSlider,
} from './RipangaReducer';

export default (dispatch) => {
  return {
    actions: bindActionCreators({
      clearCollapsedGroups,
      collapseGroup,
      retrieveCheckedStates,
      scrollSlider,
      setChecked,
      setUnchecked,
      setSort,
      toggleGroup,
      trackSlider,
    }, dispatch),
  };
};
