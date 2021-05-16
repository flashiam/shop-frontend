/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Categories: { catid: number };
  Food: { foodid: number };
  Promo: undefined;
  OrderLoading: undefined;
  Receipt: undefined;
  HiddenScreen1: undefined;
  HiddenScreen2: undefined;
  HiddenScreen3: undefined;
  Orders: undefined;
  Wishlist: undefined;
  Support: undefined;
  Refer: undefined;
  HiddenScreen4: undefined;
  HiddenScreen5: undefined;
  HiddenScreen6: undefined;
};
