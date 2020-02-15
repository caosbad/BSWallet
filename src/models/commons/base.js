/**
 * 基类模型
 */
export default {
    reducers: {
      update(state, { payload }) {
        return {
          ...state,
          ...payload
        };
      }
    }
  };
  