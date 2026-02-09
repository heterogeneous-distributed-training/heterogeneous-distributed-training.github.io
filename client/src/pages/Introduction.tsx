import { Card, CardContent } from "@/components/ui/card";

export default function Introduction() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          SynerFuse
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A cross-architecture unified heterogeneous training framework for Large Language Models.
        </p>
        <div className="flex gap-2">
          <img src="https://bestpractices.coreinfrastructure.org/projects/9748/badge" alt="OpenSSF Best Practices" />
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Latest News</h2>
        <ul>
          <li>
            <strong>[2025/6]</strong> SynerFuse publishes framework of Release 1.0, which can provide heterogeneous pipeline parallelism and heterogeneous data parallelism capabilities.
          </li>
          <li>
            <strong>[2025/5]</strong> China Mobile has established the repository for SynerFuse and obtained the OpenSSF certification badge.
          </li>
        </ul>

        <h2>SynerFuse Overview</h2>
        <p>
          Currently, the "resource wall" between different GPUs makes it difficult to build one heterogeneous resource pool for Large-scale models training. Heterogeneous distributed training becomes a pressing challenge for the industry to solve. We brought up a cross-architecture unified heterogeneous training framework <strong>SynerFuse</strong> to deal with the problem.
        </p>
        <p>
          SynerFuse enables multiple LLMs deployed and trained on multiple types of GPUs. The <strong>Inhomogeneous Task Distribution (ITD)</strong> algorithm for heterogeneous training task splitting is innovatively proposed, which supports heterogeneous data parallelism (DP) and heterogeneous pipeline parallelism (PP), and realizes the adaptive adjustment of parameters such as size and number of micro batches in DP, stages and layers in PP on heterogeneous GPUs.
        </p>
        <Card className="my-6 bg-muted/50 border-none">
          <CardContent className="pt-6">
            <p className="font-medium mb-2">Performance Verification</p>
            <p className="text-sm text-muted-foreground">
              We've verified our capability on Nvidia and other 4 types of GPUs. The acceleration ratio reached 95%, loss converges to 1.8 and PPL curve converged normally.
            </p>
          </CardContent>
        </Card>

        <h2>Quick Start</h2>

        <h3>Environment Preparation</h3>
        <p>
          SynerFuse is recommended to run in a containerized environment based on NVIDIA's NGC PyTorch image, which ensures compatibility with GPU-accelerated libraries.
        </p>
        <ul>
          <li>Ubuntu 20.04 / 22.04</li>
          <li>Python 3.10+</li>
          <li>PyTorch 2.4.0+ (with GPU support)</li>
          <li>NVIDIA GPUs with a recent driver (the NGC container includes CUDA and cuDNN)</li>
        </ul>

        <h3>Setup</h3>
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

        <h3>Prepare Data</h3>
        <p>Before running training tasks, prepare the following data files:</p>
        <ol>
          <li><strong>Tokenizer Model</strong>: Download or prepare a tokenizer model file (e.g., <code>tokenizer.model</code>).</li>
          <li><strong>Training Dataset</strong>: Prepare training data in Megatron-LM format (<code>.bin</code> and <code>.idx</code> files).</li>
        </ol>
        <p>Update the following paths in <code>run.sh</code> according to your data location:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`TOKENIZER_PATH=/path/to/your/tokenizer.model
DATA_PATH=/path/to/your/dataset`}</code></pre>

        <h3>Configure Paths</h3>
        <p>Configure directories for checkpoints and TensorBoard logs in <code>run.sh</code>:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`CHECKPOINT_PATH=/path/to/your/checkpoints
TENSORBOARD_LOGS_PATH=/path/to/your/tensorboard_logs`}</code></pre>
        <p>Make sure these directories exist inside the container, for example:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`mkdir -p /workspace/checkpoints
mkdir -p /workspace/tensorboard_logs`}</code></pre>

        <h3>Run a Task</h3>
        <p>SynerFuse provides a simple bash script for running pre-training tasks. To start distributed heterogeneous training:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`cd SynerFuse
bash run.sh`}</code></pre>
        <p>The script launches a distributed training job with default configurations.</p>
        <p>Monitor training progress through the console output and (optionally) TensorBoard if enabled.</p>

        <h2>Heterogeneous Parallelism Configuration</h2>

        <h3>Heterogeneous Pipeline Parallelism</h3>
        <p>The <code>--hetero-pipeline-stages</code> parameter configures different layer counts for different pipeline stages.</p>
        <p><strong>Format</strong>: <code>n0 layers_0_0 layers_0_1 ... n1 layers_1_0 layers_1_1 ...</code></p>
        <ul>
          <li><code>n0</code>: Number of devices in the 0-th heterogeneous stage, followed by layer counts for each device in that stage (<code>layers_0_0</code>, <code>layers_0_1</code>, ...)</li>
          <li><code>n1</code>: Number of devices in the 1-st heterogeneous stage, followed by layer counts for each device in that stage (<code>layers_1_0</code>, <code>layers_1_1</code>, ...)</li>
          <li>Additional stages follow the same pattern: <code>n2 layers_2_0 layers_2_1 ...</code></li>
        </ul>
        <p><strong>Example</strong>: For a pipeline with 2 stages and 8 layers in total:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`--num-layers 8
--pipeline-model-parallel-size 2
--hetero-pipeline-stages 1 6 1 2`}</code></pre>
        <p>This configuration specifies:</p>
        <ul>
          <li>Stage 0: 1 device with 6 layers (<code>layers_0_0 = 6</code>)</li>
          <li>Stage 1: 1 device with 2 layers (<code>layers_1_0 = 2</code>)</li>
        </ul>

        <h3>Heterogeneous Data Parallelism</h3>
        <p>Configure heterogeneous DP using three parameters:</p>
        <ul>
          <li><code>--use-tp-pp-dp-mapping</code>: Changes communication group order to enable heterogeneous DP</li>
          <li><code>--micro-batch-size-per-dp</code>: Sets micro-batch size for different DP groups</li>
          <li><code>--num-micro-batches-per-dp</code>: Sets number of micro-batches for different DP groups</li>
        </ul>
        <p><strong>Example</strong>: For data-parallel-size=2 and global-batch-size=32:</p>
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto"><code>{`--global-batch-size 32
--use-tp-pp-dp-mapping 
--micro-batch-size-per-dp 1 6 1 2
--num-micro-batches-per-dp 1 4 1 4`}</code></pre>
        <p>This configuration creates two DP groups: one device with micro-batch size 6 and 4 micro-batches (6×4=24), and another device with micro-batch size 2 and 4 micro-batches (2×4=8), summing to 32.</p>

        <h2>Customize Training</h2>
        <p>Modify variables in <code>run.sh</code> to customize training:</p>
        <ul>
          <li><strong>Model Size</strong>: Adjust <code>HIDDEN_SIZE</code>, <code>NUM_LAYERS</code>, <code>NUM_HEADS</code>, etc.</li>
          <li><strong>Training Steps</strong>: Set <code>TRAIN_STEPS</code> to control iterations.</li>
          <li><strong>Batch Sizes</strong>: Modify <code>MBS</code> (micro-batch size) and <code>GBS</code> (global batch size).</li>
          <li><strong>Parallelism</strong>: Adjust <code>TP</code> (tensor parallel size) and <code>PP</code> (pipeline parallel size).</li>
          <li><strong>Heterogeneous Configuration</strong>: Modify <code>--hetero-pipeline-stages</code> and related parameters.</li>
        </ul>

        <h2>Notes</h2>
        <ul>
          <li>Ensure available GPUs match <code>CUDA_VISIBLE_DEVICES</code> and <code>GPUS_PER_NODE</code> configurations.</li>
          <li>The training script uses <code>torchrun</code> for distributed training.</li>
          <li>Check console output for training progress and potential errors.</li>
          <li>TensorBoard logs are saved to <code>TENSORBOARD_LOGS_PATH</code> if configured.</li>
        </ul>
      </div>
    </div>
  );
}
