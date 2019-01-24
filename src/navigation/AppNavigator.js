import { createSwitchNavigator , createAppContainer} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const SwitchNavigator = createSwitchNavigator({
  Main: MainTabNavigator,
});

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer
