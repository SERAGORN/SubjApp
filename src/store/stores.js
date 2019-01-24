import { observable, action} from 'mobx';


export default class Store {
  constructor(rootStore) {
    this.rootStore = rootStore
    const Dimensions = require('Dimensions');
    const { height, width } = Dimensions.get('window');
    this.dim_height = height
    this.dim_width = width
  }

  @observable dim_height = null
  @observable dim_width = null
  @observable main_data = null
  @observable new_group = null
  @observable current_card_day = null
  @observable current_group_id = null
  @observable current_day_to_edit = null

}