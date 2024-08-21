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

const FileUploader = ({ onFileUpload, fileInput1 }) => (
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
              {fileInput1
                ? `${fileInput1?.name} chosen successfully`
                : "Drag your CSV file here or click in this area."}
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

const DateColumnSelector = ({ columns, dateColumn, setDateColumn, error }) => (
  <FormControl fullWidth margin="normal" error={!!error}>
    <InputLabel>Date Column</InputLabel>
    <Select
      value={dateColumn}
      onChange={(e) => setDateColumn(e.target.value)}
      label="Date Column"
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
  featureColumn,
  setFeatureColumn,
  error,
}) => (
  <FormControl fullWidth margin="normal" error={!!error}>
    <InputLabel>Feature Column</InputLabel>
    <Select
      value={featureColumn}
      onChange={(e) => setFeatureColumn(e.target.value)}
      label="Feature Column"
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
  featureColumn,
  featureValue,
  handleFeatureChange,
  error,
}) => (
  <div>
    <Typography variant="h6">Enter Feature Value:</Typography>
    <TextField
      label={featureColumn}
      value={featureValue || ""}
      onChange={(e) => handleFeatureChange(e.target.value)}
      margin="normal"
      fullWidth
      error={!!error}
      helperText={error}
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
  // State variables
  const [fileInput1, setFileInput1] = useState("");
  const [columns, setColumns] = useState([]);
  const [isTimeSeries, setIsTimeSeries] = useState(false);
  const [targetColumn, setTargetColumn] = useState("");
  const [featureColumn, setFeatureColumn] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [featureValue, setFeatureValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [predictionText, setPredictionText] = useState("");
  const [graphImage, setGraphImage] = useState("");
  const [dateColumn, setDateColumn] = useState("");
  const [errors, setErrors] = useState({});

  const [suggestion, setSuggestion] = useState("");

  console.log({ suggestion });

  // Handlers
  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileInput1(file);

      // Parse the CSV file
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const colNames = results.meta.fields;
          setColumns(colNames);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
      const formData = new FormData();
      formData.append("code", fileInput1);
      axios
        .post("http://localhost:5000/upload_csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          if (response.data.error) {
            setPredictionText(response.data.error);
            return;
          }
          if (response.data.filePath === undefined) {
            setPredictionText("Error in file upload");
            return;
          }

          const formData2 = new FormData();
          formData2.append("csv_path", response.data.filePath);

          axios
            .post("http://localhost:5000/ml/suggest", formData2, {
              headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
              setSuggestion(response.data.suggestion);
            })
            .catch((error) => {
              console.log(error.message);
            });
        });
    }
  };

  const handleFeatureChange = (value) => {
    setFeatureValue(value);
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!targetColumn) {
      newErrors.targetColumn = "Target column is required.";
      console.log("Target column is required.");

      valid = false;
    }

    if (!isTimeSeries && !featureColumn) {
      newErrors.featureColumn = "Feature column is required.";
      console.log("Feature column is required.");

      valid = false;
    }

    if (!selectedModel) {
      newErrors.selectedModel = "Model selection is required.";
      console.log("Model selection is required.");

      valid = false;
    }

    if (!isTimeSeries) {
      if (!featureValue) {
        newErrors.featureValue = "Feature value is required.";
        console.log("Feature value is required.");

        valid = false;
      }
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
            .map((model) => model)
        : modelRouteMapping
            .filter((model) => !model.time_series)
            .map((model) => model)
    );
  }, [isTimeSeries]);

  const handleSubmit = () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("code", fileInput1);
      axios
        .post("http://localhost:5000/upload_csv", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.error) {
            setPredictionText(response.data.error);
            return;
          }
          if (response.data.filePath === undefined) {
            setPredictionText("Error in file upload");
            return;
          }

          const formData2 = new FormData();
          formData2.append("csv_path", response.data.filePath);

          if (isTimeSeries) {
            formData2.append("date_column", dateColumn);
            formData2.append("target_column", targetColumn);
          } else {
            formData2.append("feature_col", featureColumn);
            formData2.append("target_col", targetColumn);
            formData2.append("user_input", parseFloat(featureValue));
          }

          axios
            .post(
              `http://localhost:5000${
                modelRouteMapping.find((model) => model.model === selectedModel)
                  .route
              }`,
              formData2,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              if (response.data.error) {
                setPredictionText(response.data.error);
                return;
              }

              if (isTimeSeries) {
                setPredictionText(response.data.forecast);
                setGraphImage(response.data.url);
              } else {
                // [5.870987341992519, 21.646449773466514, 0.08386263934122229]
                // predicted data, mean squared error, r2 score
                setPredictionText(
                  <>
                    <p>Predicted value: {response.data[0]}</p>
                    <p>Mean Squared Error: {response.data[1]}</p>
                    <p>R2 Score: {response.data[2]}</p>
                  </>
                );
              }
            });
        });
    } else {
      console.log("Form validation failed.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FileUploader
              onFileUpload={handleFileInput}
              fileInput1={fileInput1}
            />
          </Grid>

          {columns.length > 0 && (
            <>
              <div style={{ padding: "20px", textAlign: "justify" }}>
                {suggestion && <p>Suggestion: {suggestion}</p>}
              </div>
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
              {!isTimeSeries && (
                <Grid item xs={12}>
                  <FeatureColumnSelector
                    columns={columns}
                    featureColumn={featureColumn}
                    setFeatureColumn={setFeatureColumn}
                    error={errors.featureColumn}
                  />
                </Grid>
              )}
              {isTimeSeries && (
                <Grid item xs={12}>
                  <DateColumnSelector
                    columns={columns}
                    dateColumn={dateColumn}
                    setDateColumn={setDateColumn}
                    error={errors.dateColumn}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <ModelSelector
                  availableModels={availableModels}
                  selectedModel={selectedModel}
                  setSelectedModel={setSelectedModel}
                  error={errors.selectedModel}
                />
              </Grid>
              {!isTimeSeries && (
                <Grid item xs={12}>
                  <FeatureInput
                    featureColumn={featureColumn}
                    featureValue={featureValue}
                    handleFeatureChange={handleFeatureChange}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    error={errors.featureValue}
                  />
                </Grid>
              )}
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
