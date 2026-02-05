import { Card, CardContent } from "@/components/ui/card";

export default function Introduction() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Heterogeneous Distributed Training Framework
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A cross-architecture unified heterogeneous training framework for Large Language Models.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>Project Facts</h2>
        <ul>
          <li><strong>Project Creation Date:</strong> Mar. 20th, 2025</li>
          <li><strong>Primary Contact:</strong> Lei Huang (huangleiyjy@chinamobile.com), Zhengwei Chen (chenzhengwei@sd.chinamobile.com)</li>
          <li><strong>Project Lead:</strong> Lei Huang (huangleiyjy@chinamobile.com)</li>
          <li><strong>Committers:</strong>
            <ul>
              <li>Zhengwei Chen (chenzhengwei@sd.chinamobile.com)</li>
              <li>Yutong Tian (tianyutongcxy@sd.chinamobile.com)</li>
            </ul>
          </li>
          <li><strong>Mailing List:</strong> computing-force-network@lists.opendev.org</li>
          <li><strong>Meetings:</strong> No sub-group meeting time. Use bi-weekly meeting of CFN WG.</li>
        </ul>

        <h2>Introduction</h2>
        <p>
          Currently, the "resource wall" between different GPUs makes it difficult to build one heterogeneous resource pool for Large-scale models training. Heterogeneous distributed training becomes a pressing challenge for the industry to solve.
        </p>
        <p>
          We brought up the key technologies named <strong>Heterogeneous Distributed Training Technology (HDT)</strong>. With the goal of generalization, this technology realizes the industry's first cross-architecture unified heterogeneous training framework. The training framework enables multiple LLMs deployed and trained on multiple types of GPUs.
        </p>
        <p>
          The <strong>Inhomogeneous Task Distribution (ITD)</strong> algorithm for heterogeneous training task splitting is innovatively proposed, which supports heterogeneous data parallelism and heterogeneous pipeline parallelism, and realizes the adaptive adjustment of parameters such as microbatches size, quantity, and parallelism of DP on heterogeneous GPUs.
        </p>
        <Card className="my-6 bg-muted/50 border-none">
          <CardContent className="pt-6">
            <p className="font-medium mb-2">Performance Verification</p>
            <p className="text-sm text-muted-foreground">
              Currently, we've verified our capability on LLaMA2 7B & 13B model composed of Nvidia and other 4 types GPUs. The acceleration ratio reached 95%, loss converges to 1.8 and PPL curve converged normally.
            </p>
          </CardContent>
        </Card>

        <h2>Release Planning & Release Notes</h2>
        <p>For release of year 2025:</p>
        <ol>
          <li>
            <strong>Heterogeneous Distributed Training Technology Solution:</strong> introduction of HDT technology solution, including user guide, architecture description, software, etc.
          </li>
          <li>
            <strong>Others:</strong> TBD
          </li>
        </ol>

        <h2>Description</h2>
        <p>
          Heterogeneous distributed training framework researches the training method and framework over heterogeneous hardware.
        </p>
      </div>
    </div>
  );
}
