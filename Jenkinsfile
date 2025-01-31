pipeline {
  agent any
    
  tools {
    nodejs 'node-v22'
  }

  environment {
    ENV_API = credentials('ENV_API_PQRS')
    ENV_CLIENT = credentials('ENV_CLIENT_PQRS')
  }
    
  stages {
    stage('Copy .env files and create') {
      steps {
        script {
            def env_api = readFile(ENV_API)
            def env_client = readFile(ENV_CLIENT)
                    
            writeFile file: './server/.env', text: env_api
            writeFile file: './client/.env', text: env_client
          }
        }
      }

      stage('Install Client Dependencies') {
        steps {
          script {
            dir('client') {
              sh 'pnpm install --no-frozen-lockfile'
            }
          }
        }
      }

      stage('Build Client') {
        steps {
          script {
            dir('client') {
              sh 'pnpm run build'
            }
          }
        }
      }

      stage('down docker compose'){
        steps {
          script {
            sh 'docker compose down'
          }
        }
      }

      stage('delete images'){
        steps{
          script {
          def images = 'serverpqrs:v1'
            if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
              sh "docker rmi ${images}"
            } else {
              echo "Image ${images} does not exist."
              echo "continuing... executing next steps"
            }
          }
        }
      }

      stage('run docker compose'){
        steps {
          script {
            sh 'docker compose up -d'
            }
          }
      }
    }
}
