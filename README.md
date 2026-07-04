# Silent Bridge — AI-powered Sign Language Recognition Web Application

Silent Bridge is a full-stack web application that uses machine learning to recognize and translate sign language gestures in real time. It is designed to bridge communication between speech and hearing-impaired users by providing an AI-powered gesture recognition UI and translation pipeline.

## Key Features

- Real-time sign language gesture recognition using trained ML models
- Streamlit-based user interface for quick deployment and testing
- Modular architecture: adapters for video input, model inference, and translation
- Lightweight and easy to extend for new models or languages

## Quickstart (Streamlit)

These instructions get the app running locally using Streamlit.

1. Clone the repository

```bash
git clone https://github.com/sheldondsouza/isl.git
cd isl
```

2. Create and activate a Python virtual environment

Unix / macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Windows (PowerShell)

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Prepare the ML environment

- Place your trained model files (or download them) into the expected model directory (e.g. `models/`), or set the `MODEL_PATH` environment variable to point to the model file.
- If your app requires other environment variables (API keys, device selection, etc.), set them now. Example:

Unix / macOS

```bash
export MODEL_PATH="./models/sign_model.pt"
export STREAMLIT_SERVER_PORT=8501
export DEVICE="cuda"  # or "cpu"
```

Windows (PowerShell)

```powershell
$env:MODEL_PATH = "./models/sign_model.pt"
$env:STREAMLIT_SERVER_PORT = "8501"
$env:DEVICE = "cuda"  # or "cpu"
```

5. Run the Streamlit app

Replace `app.py` below with the actual Streamlit entrypoint if it's different (for example `streamlit_app.py` or `ui/main.py`).

```bash
streamlit run app.py --server.port $STREAMLIT_SERVER_PORT
```

Open http://localhost:8501 in your browser (or the configured port).

## Notes about the ML part

- The gesture recognition pipeline runs a trained model on webcam or video frames and outputs recognized signs and (optionally) translated text.
- For best results, use a GPU-enabled environment and ensure your model format (PyTorch, TensorFlow, ONNX, etc.) matches the inference code in `src/` or your adapter.
- If you don't have a pre-trained model, include instructions (or a script) to download a demo model or to run training in the `models/` directory.
- You may need to change the Python environment (install the correct CUDA/PyTorch versions) before running the app — see `requirements.txt` and any `environment.yml` or setup scripts.

## Configuration

Describe the available configuration options here (example):

- MODEL_PATH: path to the trained model file
- DEVICE: `cpu` or `cuda` to select compute device
- INPUT_SOURCE: `webcam`, `video_file`, or `rtsp` connection string

## Development

Create a branch for your work, add tests for new functionality, and open a pull request:

```bash
git checkout -b feat/my-new-adapter
# run tests (Python)
pytest
```

## Contributing

Contributions are welcome. Please open an issue to discuss larger changes before implementing them. Provide tests and clear descriptions for new features.

## License

This project is licensed under the MIT License — see the LICENSE file for details.

## Author

sheldondsouza
