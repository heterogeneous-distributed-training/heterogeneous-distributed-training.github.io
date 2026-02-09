export default function QuickStart() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Quick Start
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Get up and running with SynerFuse in minutes.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Environment Preparation</h2>
        <p>
          SynerFuse is recommended to run in a containerized environment based on NVIDIA's NGC PyTorch image, which ensures compatibility with GPU-accelerated libraries.
        </p>
        <ul>
          <li>Ubuntu 20.04 / 22.04</li>
          <li>Python 3.10+</li>
          <li>PyTorch 2.4.0+ (with GPU support)</li>
          <li>NVIDIA GPUs with a recent driver (the NGC container includes CUDA and cuDNN)</li>
        </ul>

        <h2>Setup</h2>
        <p>
          We recommend using NGC's PyTorch container (e.g., <a href="https://catalog.ngc.nvidia.com/orgs/nvidia/containers/pytorch" target="_blank" rel="noopener noreferrer">nvcr.io/nvidia/pytorch:24.02-py3</a>) for setup.
        </p>
        <ol>
          <li>
            <p>Create and start the container:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`docker run -itd \\
  --name synerfuse \\
  --gpus all \\
  --network=host \\
  --ipc=host \\
  --privileged \\
  nvcr.io/nvidia/pytorch:24.07-py3 \\
  bash`}</code></pre>
          </li>
          <li>
            <p>Access the container:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>docker exec -it synerfuse bash</code></pre>
          </li>
          <li>
            <p>Clone the repository:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>git clone https://github.com/SynerFuse/SynerFuse</code></pre>
          </li>
          <li>
            <p>Install dependencies:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>pip install sentencepiece</code></pre>
          </li>
        </ol>

        <h2>Prepare Data</h2>
        <p>Before running training tasks, prepare the following data files:</p>
        <ol>
          <li><strong>Tokenizer Model</strong>: Download or prepare a tokenizer model file (e.g., <code>tokenizer.model</code>).</li>
          <li><strong>Training Dataset</strong>: Prepare training data in Megatron-LM format (<code>.bin</code> and <code>.idx</code> files).</li>
        </ol>
        <p>Update the following paths in <code>run.sh</code> according to your data location:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`TOKENIZER_PATH=/path/to/your/tokenizer.model
DATA_PATH=/path/to/your/dataset`}</code></pre>

        <h2>Configure Paths</h2>
        <p>Configure directories for checkpoints and TensorBoard logs in <code>run.sh</code>:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`CHECKPOINT_PATH=/path/to/your/checkpoints
TENSORBOARD_LOGS_PATH=/path/to/your/tensorboard_logs`}</code></pre>
        <p>Make sure these directories exist inside the container, for example:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`mkdir -p /workspace/checkpoints
mkdir -p /workspace/tensorboard_logs`}</code></pre>

        <h2>Run a Task</h2>
        <p>SynerFuse provides a simple bash script for running pre-training tasks. To start distributed heterogeneous training:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`cd SynerFuse
bash run.sh`}</code></pre>
        <p>The script launches a distributed training job with default configurations.</p>
        <p>Monitor training progress through the console output and (optionally) TensorBoard if enabled.</p>
      </div>
    </div>
  );
}
