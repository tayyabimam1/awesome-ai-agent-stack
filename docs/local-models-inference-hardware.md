## Local Models, Inference & Hardware

**Serving**

- [ollama/ollama](https://github.com/ollama/ollama) - Run models locally with one command; the default for development.
- [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) - CPU/GPU inference in C++; the engine behind most local tooling.
- [vllm-project/vllm](https://github.com/vllm-project/vllm) - High-throughput production serving with paged attention.
- [sgl-project/sglang](https://github.com/sgl-project/sglang) - Fast serving with structured generation and prefix caching.
- [lmstudio-ai/lms](https://github.com/lmstudio-ai/lms) - CLI for LM Studio's local model server.

**Training & fine-tuning**

- [unslothai/unsloth](https://github.com/unslothai/unsloth) - Fine-tune and run LLMs locally, fast and memory-efficient.
- [huggingface/transformers](https://github.com/huggingface/transformers) - The model library; everything starts here.
- [huggingface/peft](https://github.com/huggingface/peft) - LoRA and other parameter-efficient fine-tuning methods.
- [axolotl-ai-cloud/axolotl](https://github.com/axolotl-ai-cloud/axolotl) - Config-driven fine-tuning for many architectures.

**Hardware fit**

- [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) - One command to find which models fit your hardware.
- [signerless/llm-checker](https://github.com/signerless/llm-checker) - Scan your hardware and get exact runnable-model recommendations.
- [Tencent-Hunyuan/Hunyuan-A13B](https://github.com/Tencent-Hunyuan/Hunyuan-A13B) - Open fine-grained MoE model.
- [open-webui/open-webui](https://github.com/open-webui/open-webui) - Self-hosted chat UI for Ollama and OpenAI-compatible backends.
- [analyticalrohit/llms-from-scratch](https://github.com/analyticalrohit/llms-from-scratch) - Build a GPT-style LLM from scratch in PyTorch.

- [hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory) - Unified Efficient Fine-Tuning of 100+ LLMs & VLMs (ACL 2024).
- [deepspeedai/DeepSpeed](https://github.com/deepspeedai/DeepSpeed) - DeepSpeed is a deep learning optimization library that makes distributed training and inference easy, efficient, and effective.
- [hpcaitech/ColossalAI](https://github.com/hpcaitech/ColossalAI) - Making large AI models cheaper, faster and more accessible.
- [microsoft/BitNet](https://github.com/microsoft/BitNet) - Official inference framework for 1-bit LLMs.
- [lyogavin/airllm](https://github.com/lyogavin/airllm) - AirLLM 70B inference with single 4GB GPU.
- [Lightning-AI/pytorch-lightning](https://github.com/Lightning-AI/pytorch-lightning) - Pretrain, finetune ANY AI model of ANY size on 1 or 10,000+ GPUs with zero code changes.
- [mlc-ai/web-llm](https://github.com/mlc-ai/web-llm) - High-performance In-browser LLM Inference Engine.
- [huggingface/transformers.js](https://github.com/huggingface/transformers.js) - State-of-the-art Machine Learning for the web. Run Transformers directly in your browser, with no need for a server!.
- [bentoml/OpenLLM](https://github.com/bentoml/OpenLLM) - Run any open-source LLMs, such as DeepSeek and Llama, as OpenAI compatible API endpoint in the cloud.
- [mudler/LocalAI](https://github.com/mudler/LocalAI) - LocalAI is the open-source AI engine. Run any model - LLMs, vision, voice, image, video - on any hardware. No GPU required.
- [mozilla-ai/llamafile](https://github.com/mozilla-ai/llamafile) - Distribute and run LLMs with a single file.
- [mlc-ai/mlc-llm](https://github.com/mlc-ai/mlc-llm) - Universal LLM Deployment Engine with ML Compilation.

- [NVIDIA/TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM) - NVIDIA's official optimized inference engine for LLMs on CUDA GPUs.
- [kvcache-ai/Mooncake](https://github.com/kvcache-ai/Mooncake) - KVCache-centric disaggregated LLM serving platform behind Moonshot AI's Kimi.


**More**

- [ml-explore/mlx](https://github.com/ml-explore/mlx) - Array framework for machine learning on Apple silicon.
- [GeeeekExplorer/nano-vllm](https://github.com/GeeeekExplorer/nano-vllm) - Minimal from-scratch reimplementation of vLLM for learning how it works.
- [jundot/omlx](https://github.com/jundot/omlx) - LLM inference server for Apple Silicon with continuous batching and SSD caching.
- [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) - Datacenter-scale model serving on your desktop for massive local models.
- [LMCache/LMCache](https://github.com/LMCache/LMCache) - KV cache layer that accelerates LLM serving across inference engines.
- [OpenBMB/MiniCPM](https://github.com/OpenBMB/MiniCPM) - Small yet powerful on-device language models for phones and PCs.
- [RunanywhereAI/runanywhere-sdks](https://github.com/RunanywhereAI/runanywhere-sdks) - Production-ready SDKs for running AI models locally on device.
- [qualcomm/GenieX](https://github.com/qualcomm/GenieX) - Run frontier LLMs and VLMs locally across Qualcomm NPU, GPU, and CPU.
- [bitsandbytes-foundation/bitsandbytes](https://github.com/bitsandbytes-foundation/bitsandbytes) - K-bit quantization for PyTorch to run large models on limited VRAM.
- [ml-explore/mlx-lm](https://github.com/ml-explore/mlx-lm) - Run large language models on Apple silicon using MLX.
- [Andyyyy64/whichllm](https://github.com/Andyyyy64/whichllm) - Benchmark local LLMs on your own hardware to find the one that actually runs.
- [vllm-project/vllm-omni](https://github.com/vllm-project/vllm-omni) - Framework for efficient inference with omni-modality models.
- [flashinfer-ai/flashinfer](https://github.com/flashinfer-ai/flashinfer) - Kernel library with high-performance attention kernels for LLM serving.
- [Arthur-Ficial/apfel](https://github.com/Arthur-Ficial/apfel) - Free on-device AI for Mac: CLI, OpenAI-compatible server, and chat.
- [cactus-compute/cactus](https://github.com/cactus-compute/cactus) - Quantization, kernels, and inference runtime for phones, wearables, and robots.
- [Michael-A-Kuykendall/shimmy](https://github.com/Michael-A-Kuykendall/shimmy) - Pure-Rust WebGPU inference engine, GGUF-native and OpenAI-API compatible.
- [Blaizzy/mlx-vlm](https://github.com/Blaizzy/mlx-vlm) - Inference and fine-tuning of vision-language models on Mac with MLX.
- [lemonade-sdk/lemonade](https://github.com/lemonade-sdk/lemonade) - Discover and run local AI apps serving optimized LLMs on your GPU or NPU.
- [xlite-dev/Awesome-LLM-Inference](https://github.com/xlite-dev/Awesome-LLM-Inference) - Curated papers with code on LLM inference: attention, quantization, parallelism.
- [sgl-project/mini-sglang](https://github.com/sgl-project/mini-sglang) - Compact reimplementation of SGLang that demystifies modern LLM serving.
- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) - Build a tiny vLLM from scratch to learn LLM inference systems on Apple Silicon.
- [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) - Unified library of quantization, pruning, and distillation for model deployment.
- [thu-ml/SageAttention](https://github.com/thu-ml/SageAttention) - Quantized attention kernels 2-5x faster than FlashAttention without accuracy loss.
- [vllm-project/llm-compressor](https://github.com/vllm-project/llm-compressor) - Production-grade LLM compression toolkit built for vLLM inference.
- [raullenchai/Rapid-MLX](https://github.com/raullenchai/Rapid-MLX) - Fast local AI engine for Apple Silicon with tool calling and prompt caching.
- [PaddlePaddle/FastDeploy](https://github.com/PaddlePaddle/FastDeploy) - High-performance inference and deployment toolkit for LLMs and VLMs.
- [ikawrakow/ik_llama.cpp](https://github.com/ikawrakow/ik_llama.cpp) - Fork of llama.cpp with state-of-the-art quantization formats and faster inference.
- [mit-han-lab/llm-awq](https://github.com/mit-han-lab/llm-awq) - Activation-aware weight quantization for efficient LLM compression and speed.
- [containers/ramalama](https://github.com/containers/ramalama) - Serve local AI models through familiar container workflows, from any model source.
- [rednote-machine-learning/RedKnot](https://github.com/rednote-machine-learning/RedKnot) - Efficient long-context LLM serving with head-aware KV cache reuse.
- [intel/neural-compressor](https://github.com/intel/neural-compressor) - Low-bit quantization and sparsity toolkit for PyTorch, TensorFlow, and ONNX.
- [AI-Efficiency/Awesome-Model-Quantization](https://github.com/AI-Efficiency/Awesome-Model-Quantization) - Curated papers, benchmarks, and tools for model quantization.
- [noonghunna/club-3090](https://github.com/noonghunna/club-3090) - Community recipes for serving LLMs on RTX 3090, 4090, and 5090 GPUs.
- [666DZY666/micronet](https://github.com/666DZY666/micronet) - Model compression and deployment library with quantization-aware training.
- [RightNow-AI/picolm](https://github.com/RightNow-AI/picolm) - Run a 1-billion-parameter LLM on a $10 board with 256MB of RAM.
- [withcatai/node-llama-cpp](https://github.com/withcatai/node-llama-cpp) - Node.js bindings for llama.cpp to run AI models locally with JSON schema output.
- [horseee/Awesome-Efficient-LLM](https://github.com/horseee/Awesome-Efficient-LLM) - Curated list of research on efficient large language models.
- [ROCm/FastFlowLM](https://github.com/ROCm/FastFlowLM) - Run LLMs on AMD Ryzen AI NPUs, purpose-built and deeply optimized.
- [john-rocky/CoreML-Models](https://github.com/john-rocky/CoreML-Models) - Core ML model zoo for iOS and macOS with conversion scripts and sample apps.
- [sammcj/gollama](https://github.com/sammcj/gollama) - Terminal manager for your Ollama models, written in Go.
- [sybil-solutions/local-studio](https://github.com/sybil-solutions/local-studio) - Control panel for local vLLM, SGLang, llama.cpp, and exllamav3 servers.
- [0xSero/turboquant](https://github.com/0xSero/turboquant) - Near-optimal KV cache quantization for LLM inference with vLLM integration.
- [vllm-project/vllm-metal](https://github.com/vllm-project/vllm-metal) - Community hardware plugin that enables vLLM on Apple Silicon.
- [intel/auto-round](https://github.com/intel/auto-round) - Post-training quantization toolkit for high-accuracy low-bit LLM inference.
- [intentee/paddler](https://github.com/intentee/paddler) - Open-source LLM and VLM load balancer for self-hosting at scale.
- [Tencent/AngelSlim](https://github.com/Tencent/AngelSlim) - Model compression toolkit engineered for usability and efficiency.
- [PaddlePaddle/PaddleSlim](https://github.com/PaddlePaddle/PaddleSlim) - Open-source library for deep model compression and architecture search.
- [waybarrios/vllm-mlx](https://github.com/waybarrios/vllm-mlx) - OpenAI-compatible LLM inference server for Apple Silicon built on MLX.
- [ddalcu/mlx-serve](https://github.com/ddalcu/mlx-serve) - Native Apple Silicon LLM inference server, OpenAI and Anthropic API compatible.
- [nobodywho-ooo/nobodywho](https://github.com/nobodywho-ooo/nobodywho) - Inference engine for running LLMs locally and efficiently on any device.
- [turboderp-org/exllamav3](https://github.com/turboderp-org/exllamav3) - Optimized quantization and inference library for LLMs on consumer GPUs.
- [callstackincubator/ai](https://github.com/callstackincubator/ai) - On-device LLM execution in React Native apps with Vercel AI SDK compatibility.
- [Zefan-Cai/KVCache-Factory](https://github.com/Zefan-Cai/KVCache-Factory) - Unified implementations of KV cache compression methods for autoregressive models.
- [GradientHQ/parallax](https://github.com/GradientHQ/parallax) - Distributed model serving framework to build your own AI cluster anywhere.
- [Vahe1994/AQLM](https://github.com/Vahe1994/AQLM) - Extreme LLM compression via additive quantization with official PyTorch code.
- [ngxson/wllama](https://github.com/ngxson/wllama) - WebAssembly bindings for llama.cpp enabling in-browser LLM inference.
- [sgl-project/sglang-omni](https://github.com/sgl-project/sglang-omni) - High-performance serving framework for audio and unified multimodal models.
- [ModelCloud/GPTQModel](https://github.com/ModelCloud/GPTQModel) - LLM quantization toolkit with hardware acceleration for NVIDIA, AMD, and Intel.
- [Zefan-Cai/R-KV](https://github.com/Zefan-Cai/R-KV) - Redundancy-aware KV cache compression for reasoning models.
- [OpenSparX/MasterAgent](https://github.com/OpenSparX/MasterAgent) - Build AI agents that run 100 percent on-device with sub-100ms Qualcomm NPU latency.
- [sgl-project/SpecForge](https://github.com/sgl-project/SpecForge) - Train speculative decoding models and port them to SGLang serving.
- [scrya-com/rotorquant](https://github.com/scrya-com/rotorquant) - KV cache compression via block-diagonal rotation with llama.cpp integration.
- [kessler/gemma-gem](https://github.com/kessler/gemma-gem) - Run Google's Gemma model entirely on-device via WebGPU, no cloud needed.
- [microsoft/T-MAC](https://github.com/microsoft/T-MAC) - Low-bit LLM inference on CPU and NPU using lookup-table acceleration.
- [mybigday/llama.rn](https://github.com/mybigday/llama.rn) - React Native bindings for llama.cpp.
- [openvinotoolkit/model_server](https://github.com/openvinotoolkit/model_server) - Scalable inference server for models optimized with OpenVINO.
- [foldl/chatllm.cpp](https://github.com/foldl/chatllm.cpp) - Pure C++ implementation of several models for real-time chat on CPU and GPU.
- [PaddlePaddle/Serving](https://github.com/PaddlePaddle/Serving) - Flexible, high-performance framework for serving machine learning models.
- [shubham0204/SmolChat-Android](https://github.com/shubham0204/SmolChat-Android) - Run any GGUF small language model locally on Android devices.
- [mosecorg/mosec](https://github.com/mosecorg/mosec) - High-performance ML model serving with dynamic batching and CPU/GPU pipelines.
- [gavamedia/deltafin](https://github.com/gavamedia/deltafin) - Run the full Kimi K3 model on a single device with an OpenAI-compatible server.
- [ml-explore/mlx-swift-lm](https://github.com/ml-explore/mlx-swift-lm) - Run LLMs and VLMs on Apple silicon from Swift with MLX.
- [SharpAI/SwiftLM](https://github.com/SharpAI/SwiftLM) - Native MLX Swift inference server for Apple Silicon with SSD streaming.
- [EricLBuehler/candle-vllm](https://github.com/EricLBuehler/candle-vllm) - Efficient platform for inference and serving of local LLMs with OpenAI-compatible API.
- [ARahim3/mlx-dspark](https://github.com/ARahim3/mlx-dspark) - Up to 4x faster lossless LLM decoding on Apple Silicon via speculative decoding.
- [ParisNeo/lollms_hub](https://github.com/ParisNeo/lollms_hub) - Proxy server for managing multiple Ollama instances with key-based security.
- [tetherto/qvac](https://github.com/tetherto/qvac) - Open-source local AI SDK for on-device inference across desktop and mobile.
- [Helldez/BigMoeOnEdge](https://github.com/Helldez/BigMoeOnEdge) - Run mixture-of-experts models bigger than RAM on a 12GB phone, CPU only.
- [NotPunchnox/rkllama](https://github.com/NotPunchnox/rkllama) - Ollama alternative for Rockchip NPUs to run AI models on Rockchip devices.
- [Trans-N-ai/swama](https://github.com/Trans-N-ai/swama) - High-performance MLX-based LLM inference engine for macOS in native Swift.
- [NVIDIA/TensorRT-Edge-LLM](https://github.com/NVIDIA/TensorRT-Edge-LLM) - Lightweight C++ LLM and VLM inference software for physical AI at the edge.
- [brontoguana/krasis](https://github.com/brontoguana/krasis) - Hybrid LLM runtime for running larger models on VRAM-limited consumer hardware.
- [spark-arena/sparkrun](https://github.com/spark-arena/sparkrun) - Launch and manage LLM inference workloads on NVIDIA DGX Spark systems.
- [toverainc/willow-inference-server](https://github.com/toverainc/willow-inference-server) - Self-hosted inference server for LLMs, speech-to-text, and text-to-speech.
- [zolotukhin/zinc](https://github.com/zolotukhin/zinc) - Zig inference engine for local LLM inference on AMD GPUs and Apple Silicon.
- [sunshine0523/OllamaServer](https://github.com/sunshine0523/OllamaServer) - Start the Ollama service on Android with one click, no Termux needed.
- [NightMean/OlliteRT](https://github.com/NightMean/OlliteRT) - Turn an Android phone into an OpenAI-compatible local LLM inference server.
- [xybrid-ai/xybrid](https://github.com/xybrid-ai/xybrid) - Cross-platform on-device AI toolkit for phones, desktops, and edge devices.
- [mudler/vllm.cpp](https://github.com/mudler/vllm.cpp) - Community C++ engine mirroring vLLM with continuous batching and paged KV cache.
- [dineshsoudagar/local-llms-on-android](https://github.com/dineshsoudagar/local-llms-on-android) - Guide to running Gemma, Qwen, and LLaMA locally on Android with LiteRT and ONNX.
- [eleiton/ollama-intel-arc](https://github.com/eleiton/ollama-intel-arc) - Run Ollama, Stable Diffusion, and Whisper on Intel Arc GPUs.
- [carloslfu/slotstream](https://github.com/carloslfu/slotstream) - Stream a 105GB mixture-of-experts model from SSD on Macs with 16 to 64GB RAM.
- [ModelEngine-Group/unified-cache-management](https://github.com/ModelEngine-Group/unified-cache-management) - Persist and reuse KV cache to speed up your LLM serving.
- [andrewkchan/deepseek.cpp](https://github.com/andrewkchan/deepseek.cpp) - CPU inference for the DeepSeek model family in C++.
- [Epistates/pmetal](https://github.com/Epistates/pmetal) - High-performance Apple Silicon framework for local LLM inference and serving.
- [Picovoice/picollm](https://github.com/Picovoice/picollm) - On-device LLM inference powered by X-bit quantization.
- [thushan/olla](https://github.com/thushan/olla) - Lightweight proxy and load balancer for LLM infrastructure with failover.
- [mohitsoni48/TurboLLM](https://github.com/mohitsoni48/TurboLLM) - Run any local LLM engine auto-tuned to your GPU with web UI and OpenAI-compatible API.
- [Pelochus/ezrknpu](https://github.com/Pelochus/ezrknpu) - Easy installation and use of Rockchip NPUs on RK3588 and similar SoCs.
- [modelscope/dash-infer](https://github.com/modelscope/dash-infer) - Native LLM inference engine optimized for CUDA, x86, and ARM hardware.
- [onnx/turnkeyml](https://github.com/onnx/turnkeyml) - No-code CLI for accelerating ONNX model deployment workflows.
- [gengchaogit/llm_speedtest](https://github.com/gengchaogit/llm_speedtest) - Speed test tool for local LLM inference.
- [timtoole02/Camelid](https://github.com/timtoole02/Camelid) - Rust-native local inference backend with evidence-gated model compatibility.
- [uncSoft/anubis-oss](https://github.com/uncSoft/anubis-oss) - Local LLM testing and benchmarking for Apple Silicon.
- [adriancable/qwen3.c](https://github.com/adriancable/qwen3.c) - Local Qwen3 inference in a single dependency-free C source file.
- [wladimiravila/esp32s3-distributed-ai](https://github.com/wladimiravila/esp32s3-distributed-ai) - Distributed LLM inference across ESP32-S3 boards, fully offline.
