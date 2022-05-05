pipeline {
    agent any 
    stages {
        stage('Build Docker Image') { 
            steps {
                bat """
                    docker build . -t faraz/node-application
                """
            }
        }
        stage('Deploy to Kubernetes') { 
            steps {
                bat """
                    kubectl apply -f .\\kubernetes\\application.yaml --validate=false
                """
            }
        }
    }
}