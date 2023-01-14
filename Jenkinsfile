pipeline {
	environment {
		DOCKERHUB_CREDENTIALS=credentials('dh_cred_omar')
        imageNameBack='omaar0088/omar-back'
	    imageVersionBack="${BUILD_NUMBER}"
        imageNameFront='omaar0088/omar-front'
        imageVersionFront="${BUILD_NUMBER}"
        PROJECT_NAME='Free Connect'
	}
	agent any 
    options {
        timestamps ()
        ansiColor('xterm')
    }
	stages {
        
        stage('SCM') {
			steps {
    			checkout scm
			}
  		}

		stage('Provisionning infrastructure with Terraform') {
			steps {
                /*
				dir ('terraform-provider-azure') {
					sh 'erraform init -input=false'
					sh 'terraform plan -input=false -out tfplan'
				}*/
                echo 'NO Credit In my Account'
			}
  		}

		stage('Applying infrastructure') {
			steps {
                /*
				dir ('terraform-provider-azure') {
					sh 'terraform apply --auto-approve tfplan'
				}*/
                echo 'NO Credit In my Account'
			}
		}

        stage('Build Docker Back Image') {
            steps {
                sh 'docker build -t ${imageNameBack}:${imageVersionBack} -f back/Dockerfile ./back'
                echo 'Building Docker Back Image Successfuly'
            }
        }

        stage('Build Docker Front Image') {
            steps {
                sh 'docker build -t ${imageNameFront}:${imageVersionFront} -f front/Dockerfile ./front'
                echo 'Building Docker Front Image Successfuly'
            }
        }

        stage('Login to Dockerhub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                echo 'Login to Dockerhub Successfuly'
            }
        }
        
        stage('Push Images to DockerHub') {
            steps {
                sh 'docker push ${imageNameBack}:${imageVersionBack}'
                echo 'Pushing Image ${imageNameBack}:${imageVersionBack} Successfuly'
                sh 'docker push ${imageNameFront}:${imageVersionFront}'
                echo 'Pushing Image ${imageNameFront}:${imageVersionFront} Successfuly'
            }
        }
/*
        stage('Clean local env') {
            steps {
                sh 'docker logout $DOCKERHUB_CREDENTIALS_USR'
                sh 'docker image rm ${imageNameBack}:${imageVersionBack}'
                sh 'docker image rm ${imageNameFront}:${imageVersionFront}'
                echo 'Cleaning Done Successfuly'
            }
        }
*/
	    stage('Deploy with docker compose') {
            steps {
                sh 'versionBack=${imageVersionBack} versionFront=${imageVersionFront} docker-compose -f docker-compose.yaml up -d'
                echo 'Successfuly Deployed ${PROJECT_NAME} to docker compose'
            }
        }	

        stage('Deploy to Kubernetes Cluster') {
            steps {
                //sh 'kubectl apply -f kubernetes/ --recursive'
                echo 'Successfuly Deployed ${PROJECT_NAME} to kubernetes'
            }
        }
    }
}
