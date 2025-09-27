export default {
  name: "flowchat",
  type: "docker",
  dockerfile: "Dockerfile",
  build: {
    context: ".",
    dockerfile: "Dockerfile"
  },
  env: [],
  ports: [
    {
      containerPort: 80,
      hostPort: 8081,
      protocol: "tcp"
    }
  ],
  volumes: []
}