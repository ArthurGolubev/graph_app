#!/bin/bash
start=$SECONDS


docker buildx build \
--push \
--platform linux/amd64 \
--tag arthurgo/gra:0.1 .

deploy="../kubernetes/gra/web"
microk8s.kubectl delete -f "$deploy/02_deployment_gra.yml"
microk8s.kubectl apply -f "$deploy/02_deployment_gra.yml"

end=$SECONDS
runtime=$((end - start))
today=`date +"%d-%m-%Y %T"`
echo -e "\n\n\U1F5FF Development version"
echo -e "\n\U1F4C5 $today"
echo -e "\U231B Завершено за $runtime сек."