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
        stage('Deploying App to Kubernetes') {
			steps {
				script {
					kubernetesDeploy(configs: "kubernetes/application.yaml", kubeconfigId: "kubernetes")
				}
			}
		}
    }
}