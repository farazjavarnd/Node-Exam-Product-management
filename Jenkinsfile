pipeline {
    agent any 
    stages {
        stage('Build Docker Image') { 
            steps {
                sh 'docker build . -t faraz/node-application'
            }
        }
        stage('Deploy to Kubernetes') { 
            steps {
                sh 'kubectl apply -f .\kubernetes\application.yaml'
            }
        }
    }
}