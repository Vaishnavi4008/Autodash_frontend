import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import axios from "axios";

// list of model routes
// /ml/linear_regression, /ml/polynomial_regression, /ml/random_forest, /ml/decision_tree, /ml/xg_boost, /ml/cat_boost, /ml/lstmm, /ml/ex, /ml/arima,

const modelRouteMapping = [
  {
    model: "Linear Regression",
    route: "/ml/linear_regression",
    time_series: false,
  },
  {
    model: "Polynomial Regression",
    route: "/ml/polynomial_regression",
    time_series: false,
  },
  { model: "Random Forest", route: "/ml/random_forest", time_series: false },
  { model: "Decision Tree", route: "/ml/decision_tree", time_series: false },
  { model: "XG Boost", route: "/ml/xg_boost", time_series: false },
  { model: "Cat Boost", route: "/ml/cat_boost", time_series: false },
  { model: "LSTM", route: "/ml/lstm", time_series: true },
  { model: "Exponential Smoothing", route: "/ml/ex", time_series: true },
  { model: "ARIMA", route: "/ml/arima", time_series: true },
];

const FileUploader = ({ onFileUpload }) => (
  <Card className="file-uploader">
    <CardContent>
      <div className="border-[3px] border-gray-500 border-dashed p-2.5 rounded-[10px] mb-4">
        <div className="relative flex flex-col text-gray-400 border-dashed rounded cursor-pointer">
          <input
            accept=".csv"
            type="file"
            className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
            title=""
            onChange={onFileUpload}
          />
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="m-0">
              Drag your CSV file here or click in this area.
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const TargetColumnSelector = ({
  columns,
  targetColumn,
  setTargetColumn,
  error,
}) => (
  <FormControl fullWidth margin="normal" error={!!error}>
    <InputLabel>Target Column</InputLabel>
    <Select
      value={targetColumn}
      onChange={(e) => setTargetColumn(e.target.value)}
      label="Target Column"
    >
      {columns.map((col) => (
        <MenuItem key={col} value={col}>
          {col}
        </MenuItem>
      ))}
    </Select>
    {error && <Typography color="error">{error}</Typography>}
  </FormControl>
);

const FeatureColumnSelector = ({
  columns,
  featureColumns,
  setFeatureColumns,
  error,
}) => (
  <FormControl fullWidth margin="normal" error={!!error}>
    <InputLabel>Feature Columns</InputLabel>
    <Select
      multiple
      value={featureColumns}
      onChange={(e) => setFeatureColumns(e.target.value)}
      label="Feature Columns"
      renderValue={(selected) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={value} />
          ))}
        </Box>
      )}
    >
      {columns.map((col) => (
        <MenuItem key={col} value={col}>
          {col}
        </MenuItem>
      ))}
    </Select>
    {error && <Typography color="error">{error}</Typography>}
  </FormControl>
);

const ModelSelector = ({
  availableModels,
  selectedModel,
  setSelectedModel,
  error,
}) => (
  <FormControl fullWidth margin="normal" error={!!error}>
    <InputLabel>Model</InputLabel>
    <Select
      value={selectedModel}
      onChange={(e) => setSelectedModel(e.target.value)}
      label="Model"
    >
      {availableModels.map((model) => (
        <MenuItem key={model.model} value={model.model}>
          {model.model}
        </MenuItem>
      ))}
    </Select>
    {error && <Typography color="error">{error}</Typography>}
  </FormControl>
);

const FeatureInput = ({
  isTimeSeries,
  featureColumns,
  featureValues,
  handleFeatureChange,
  selectedDate,
  setSelectedDate,
  error,
}) =>
  !isTimeSeries ? (
    <div>
      <Typography variant="h6">Enter Feature Values:</Typography>
      {featureColumns.map((col) => (
        <TextField
          key={col}
          label={col}
          value={featureValues[col] || ""}
          onChange={(e) => handleFeatureChange(col, e.target.value)}
          margin="normal"
          fullWidth
          error={!!error[col]}
          helperText={error[col]}
        />
      ))}
    </div>
  ) : (
    <div>
      <Typography variant="h6">Select Date:</Typography>
      <DatePicker
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        renderInput={(props) => (
          <TextField
            {...props}
            fullWidth
            error={!!error.date}
            helperText={error.date}
          />
        )}
      />
    </div>
  );

const PredictionOutput = ({ predictionText, graphImage }) => (
  <Card className="prediction-output">
    <CardContent>
      <Typography variant="h6">Prediction Result</Typography>
      <Typography variant="body1" style={{ marginTop: "10px" }}>
        {predictionText}
      </Typography>
      {graphImage && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <img
            src={graphImage}
            alt="Prediction Graph"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </CardContent>
  </Card>
);

const SubmitButton = ({ onSubmit }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onSubmit}
    style={{ marginTop: "20px" }}
  >
    Submit
  </Button>
);

const DataPredictor = () => {
  const [fileInput1, setFileInput1] = useState("");
  const [columns, setColumns] = useState([]);
  const [isTimeSeries, setIsTimeSeries] = useState(false);
  const [targetColumn, setTargetColumn] = useState("");
  const [featureColumns, setFeatureColumns] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [featureValues, setFeatureValues] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [predictionText, setPredictionText] = useState("");
  const [graphImage, setGraphImage] = useState("");

  const [errors, setErrors] = useState({});

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileInput1(file.name);

      // Parse the CSV file
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          // Get the column names
          const colNames = results.meta.fields;
          setColumns(colNames);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  const handleFeatureChange = (column, value) => {
    setFeatureValues({
      ...featureValues,
      [column]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!targetColumn) {
      newErrors.targetColumn = "Target column is required.";
      valid = false;
    }

    if (!isTimeSeries && featureColumns.length === 0) {
      newErrors.featureColumns = "At least one feature column is required.";
      valid = false;
    }

    if (!selectedModel) {
      newErrors.selectedModel = "Model selection is required.";
      valid = false;
    }

    if (!isTimeSeries) {
      const featureErrors = {};
      featureColumns.forEach((col) => {
        if (!featureValues[col]) {
          featureErrors[col] = `${col} is required.`;
          valid = false;
        }
      });
      newErrors.featureValues = featureErrors;
    } else if (!selectedDate) {
      newErrors.date = "Date is required for time series predictions.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    setAvailableModels(
      isTimeSeries
        ? modelRouteMapping
            .filter((model) => model.time_series)
            .map((model) => model) // ["LSTM", "Exponential Smoothing", "ARIMA"]
        : modelRouteMapping
            .filter((model) => !model.time_series)
            .map((model) => model) // ["Linear Regression", "Random Forest", "SVM"];
    );
  }, [isTimeSeries]);

  const handleSubmit = () => {
    if (validateForm()) {
      // Simulate a backend call with prediction result
      const featureClomunsValues = featureColumns.join(", ");
      const formData = new FormData();
      formData.append("file", fileInput1);
      formData.append("target_col", targetColumn);
      formData.append("feature_col", featureClomunsValues);
      formData.append("user_input", JSON.stringify(featureValues));
      formData.append("date_column", selectedDate);

      axios
        .post(
          `https://localhost:5000${
            modelRouteMapping.find((model) => model.model === selectedModel)
              .route
          }`,
          formData
        )
        .then((response) => {
          setPredictionText(response.data.forecast);
          setGraphImage(response.data.url);
        });

      // const mockPrediction = "The predicted value is 42.";
      // const mockGraphImage =
      //   "https://via.placeholder.com/600x400.png?text=Prediction+Graph";
      // setPredictionText(mockPrediction);
      // setGraphImage(mockGraphImage);
    }
  };

  console.log({ predictionText, graphImage });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FileUploader onFileUpload={handleFileInput} />
          </Grid>
          {columns.length > 0 && (
            <>
              <Grid item xs={12}>
                <TargetColumnSelector
                  columns={columns}
                  targetColumn={targetColumn}
                  setTargetColumn={setTargetColumn}
                  error={errors.targetColumn}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isTimeSeries}
                      onChange={(e) => setIsTimeSeries(e.target.checked)}
                    />
                  }
                  label="Is this a time series prediction?"
                />
              </Grid>
              <Grid item xs={12}>
                <FeatureColumnSelector
                  columns={columns}
                  featureColumns={featureColumns}
                  setFeatureColumns={setFeatureColumns}
                  error={errors.featureColumns}
                />
              </Grid>
              <Grid item xs={12}>
                <ModelSelector
                  availableModels={availableModels}
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  error={errors.selectedModel}
                />
              </Grid>
              <Grid item xs={12}>
                <FeatureInput
                  isTimeSeries={isTimeSeries}
                  featureColumns={featureColumns}
                  featureValues={featureValues}
                  handleFeatureChange={handleFeatureChange}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  error={{ ...errors.featureValues, date: errors.date }}
                />
              </Grid>
              <Grid item xs={12}>
                <SubmitButton onSubmit={handleSubmit} />
              </Grid>
              <Grid item xs={12}>
                <PredictionOutput
                  predictionText={predictionText}
                  graphImage={graphImage}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </LocalizationProvider>
  );
};

export default DataPredictor;
