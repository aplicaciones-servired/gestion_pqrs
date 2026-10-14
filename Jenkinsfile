pipeline {
  agent any

  environment {
    ENV_API = credentials('ENV_API_PQRS')
    ENV_CLIENT = credentials('ENV_CLIENT_PQRS')
  }

  stages {
    stage('Write .env files') {
      steps {
        script {
          def env_api = readFile(ENV_API)
          def env_client = readFile(ENV_CLIENT)

          writeFile file: './server/.env', text: env_api
          writeFile file: './client/.env', text: env_client
        }
      }
    }

    stage('Down docker compose') {
      steps {
        sh 'docker compose down'
      }
    }

    stage('Delete images') {
      steps {
        script {
          for (image in ['serverpqrs:v1', 'frontendpqrs:v1']) {
            if (sh(script: "docker images -q ${image}", returnStdout: true).trim()) {
              sh "docker rmi ${image}"
            } else {
              echo "Image ${image} does not exist. Continuing..."
            }
          }
        }
      }
    }

    stage('Build and run') {
      steps {
        sh 'docker compose up -d --build'
      }
    }
  }
}
