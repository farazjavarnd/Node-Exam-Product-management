pipeline {
    agent any 
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
            }
        }
        stage('Deploy') { 
            steps {
                sh 'docker build . -t faraz/node-application'
            }
        }
    }
}