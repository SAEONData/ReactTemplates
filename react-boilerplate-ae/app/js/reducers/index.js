'use strict'

import NavigationReducer from './NavigationReducer'
import ListViewReducer from './ListViewReducer'
import FiltersReducer from './FiltersReducer'
import DetailsViewReducer from './DetailsViewReducer'
import GeneralReducer from './GeneralReducer'

export default {
    navigation: NavigationReducer,
    filters: FiltersReducer,
    listView: ListViewReducer,
    detailsView: DetailsViewReducer,
    general: GeneralReducer
}