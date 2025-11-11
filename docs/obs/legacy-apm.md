# Project Overview

This project contains the Scouter APM (Application Performance Management) tool. It is a Java-based open-source monitoring tool designed to monitor the performance of web applications. The project is structured into several components:

- `scouter/agent.batch`: A batch agent for monitoring batch jobs.
- `scouter/agent.host`: A host agent for monitoring server resources.
- `scouter/agent.java`: A Java agent for monitoring Java applications.
- `scouter/server`: The main Scouter server that collects and displays performance data.
- `scouter/webapp`: A web application for viewing the collected data.

The project uses Docker for packaging and deployment.

# Building and Running

## Building

The project is built as a Docker image. There are two build scripts provided in the `scripts` directory:

- `scripts/build-scouter.sh`: Builds the base Scouter image using `Dockerfile`.
- `scripts/build-scouter21.sh`: Builds a Scouter image with Java 21 using `Dockerfile.java21`.

To build the project, run one of the following commands:

```bash
./scripts/build-scouter.sh
```

or

```bash
./scripts/build-scouter21.sh
```

**Note:** The build scripts use a private Docker registry. You may need to modify the scripts to use a different registry.

## Running

The Scouter server can be started using the `startup.sh` script in the `scouter/server` directory:

```bash
cd scouter/server
./startup.sh
```

This will start the Scouter server in the background. The server logs can be found in `scouter/server/nohup.out`.

# Development Conventions

- The project uses shell scripts for automating build and deployment tasks.
- The project is structured as a multi-module Java project.
- Configuration files are located in the `conf` directory of each component.
- Detailed documentation for the Java agent plugins can be found in `scouter/agent.java/plugin/readme.md`.
- The `config.yaml` file configures the `jmx_prometheus_javaagent` to expose Tomcat's JMX metrics to Prometheus.
