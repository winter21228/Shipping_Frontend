import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";

// ----------------------------------------------------------------------
const initialState = {
  isLoading: false,
  isSuccess: false,
  shipments: [],
  shipment: null,
  shipmentId: null,
  error: null,
  user: null,
  downloadPDFLink: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setShipment(state, action) {
      state.isLoading = false;
      state.shipment = action.payload;
    },
    setRates(state, action) {
      state.isLoading = false;
      state.rates = action.payload;
    },
    setShipmentId(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.shipmentId = action.payload;
    },
    setSuccess(state, action) {
      state.isSuccess = action.payload;
    },
    setPDFDownloadLink(state, action) {
      state.downloadPDFLink = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },
    setShipments(state, action) {
      state.isLoading = false;
      state.shipments = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
// ----------------------------------------------------------------------

export const {
  startLoading,
  hasError,
  setShipment,
  setRates,
  setSuccess,
  setShipmentId,
  setPDFDownloadLink,
  setShipments,
} = slice.actions;

// ----------------------------------------------------------------------
export const getProcessingShipments = createAsyncThunk(
  "easypost/get-processing-list",
  async (_, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.get("/api/easypost/get-processing-list");
      if (response.status === 200) {
        const { shipments } = response.data.msg;
        dispatch(setShipments(shipments));
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  }
);

export const buyLabel = createAsyncThunk(
  "easypost/buy-label",
  async (data, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.post("/api/easypost/buy-label", data);
      if (response.status === 200) {
        const { downloadPDFLink } = response.data.msg;
        dispatch(setPDFDownloadLink(downloadPDFLink));
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  }
);

export const createShipment = createAsyncThunk(
  "easypost/create-shipment",
  async (data, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.post("/api/easypost/create-shipment", data);
      if (response.status === 200) {
        const { id } = response.data.msg;
        dispatch(setShipmentId(id));
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  }
);

export const updateShipment = createAsyncThunk(
  "easypost/update-shipment",
  async ({ id, data }, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.patch(
        `/api/easypost/update-shipment/${id}`,
        data
      );
      if (response.status === 200) {
        const { id } = response.data.msg;
        dispatch(setShipmentId(id));
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  }
);

export const getShipment = createAsyncThunk(
  "easypost/get-a-shipment",
  async (id, { dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`/api/easypost/get-shipment/${id}`);
      if (response.status === 200) {
        const { shipment, rates } = response.data.msg;
        dispatch(setShipment(shipment));
        dispatch(setRates(rates));
      }
    } catch (error) {
      dispatch(hasError(error));
    }
  }
);
