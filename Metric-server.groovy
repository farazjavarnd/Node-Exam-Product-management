pipeline {
    agent any 
    stages {
        stage('Metric Server') {
			steps {
				script {
					kubernetesDeploy(configs: "kubernetes/components.yaml", kubeconfigId: "kubernetes")
				}
			}
		}
    }
}