pipeline {
    agent any 
    stages {
        stage('Stress testing on Node App') {
			steps {
				script {
					kubernetesDeploy(configs: "kubernetes/stress-testing.yaml", kubeconfigId: "kubernetes")
				}
			}
		}
    }
}