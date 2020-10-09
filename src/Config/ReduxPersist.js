import localForage from 'localforage';
import { createMigrate } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';

const migrations = {
  0: (state) => {
    // migration clear out device state
    return {
      ...state,
    };
  },
};

const persistConfigV4 = {
  storage: localForage,
  whitelist: ['product'],
};

const persistConfig = {
  stateReconciler: autoMergeLevel2,
  key: 'root',
  storage: localForage,
  getStoredState: getStoredStateMigrateV4(persistConfigV4),
  migrate: createMigrate(migrations),
  version: 6,
};

export default persistConfig;
