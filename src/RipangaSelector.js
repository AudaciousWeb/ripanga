import { createSelector, createStructuredSelector } from 'reselect';

const ripangaSelector = ({ reducer }) => reducer;

const collapsedGroupsSelector = createSelector(
  ripangaSelector,
  state => state.get('collapsedGroups')
);

const sliderValueSelector = createSelector(
  ripangaSelector,
  state => state.get('sliderValue')
);

const checkedIdsSelector = createSelector(
  ripangaSelector,
  state => state.get('checkedIds')
);

const toggledGroupsSelector = createSelector(
  ripangaSelector,
  state => state.get('toggledGroups')
);

export default createStructuredSelector({
  collapsedGroups: collapsedGroupsSelector,
  toggledGroups: toggledGroupsSelector,
  sliderValue: sliderValueSelector,
  checkedIds: checkedIdsSelector,
});
