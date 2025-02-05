import { createSlice, PayloadAction } from '@reduxjs/toolkit';





interface EditorState {
  content: string;
}

const initialState: EditorState = {
  content: '',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    clearContent: (state) => {
      state.content = '';
    },
  },
});

export const { setContent, clearContent } = editorSlice.actions;
export default editorSlice.reducer;
