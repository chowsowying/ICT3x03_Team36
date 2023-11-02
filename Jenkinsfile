pipeline {
	agent any
	stages {
		stage('Build') { 
			agent {
				docker {
				    image 'node:20.9.0-alpine3.18' 
				    args '-p 8443:8443' 
				}
			}
			steps {
				sh 'cd ./backend-sit-forum-app-v1 && npm install'
				sh 'cd ./frontend-sit-forum-app && npm install'
			}
		}
		stage('Test') {
			agent {
				docker {
				    image 'node:20.9.0-alpine3.18' 
				    args '-p 8443:8443' 
				}
			}
			steps {
			sh './jenkins/scripts/test.sh'
			}
	        }
		stage('OWASP Dependency-Check Vulnerabilities') {
			agent any
			steps {
			dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
			}
		}
	}
	post {
		success {
			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
		}
	}
}
