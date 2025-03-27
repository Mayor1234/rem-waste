import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Skip, SkipState } from './types';

const initialState: SkipState = {
  skipData: null,
  selectedSkip: false,
};

const skipSlice = createSlice({
  name: 'skip',
  initialState,
  reducers: {
    setSkipData: (state, action: PayloadAction<Skip | null>) => {
      state.skipData = action.payload;
    },
    setSelectedSkip: (state, action: PayloadAction<boolean>) => {
      state.selectedSkip = action.payload;
    },
  },
});

export const { setSkipData, setSelectedSkip } = skipSlice.actions;

export default skipSlice.reducer;
