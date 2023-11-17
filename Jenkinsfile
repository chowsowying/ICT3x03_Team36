pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/chowsowying/ICT3x03_Team36.git'
            }
        }


	  stage('SonarQube Analysis') {
			agent any
            steps {
                script {
                    def scannerHome = tool 'SonarQube'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=Team36 -Dsonar.sources=."
                    }
                }
            }

           post {
        always {
            script {
                def issues = scanForIssues tool: [$class: 'SonarQube']
                recordIssues tool: [$class: 'SonarQube'], issues: issues
            }
        }
    }
        }


    }
}
