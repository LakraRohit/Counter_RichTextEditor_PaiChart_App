// redux/chartSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chartData: [], // Initially empty or with some default values
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
  },
});

export const { setChartData } = chartSlice.actions;
export default chartSlice.reducer;
