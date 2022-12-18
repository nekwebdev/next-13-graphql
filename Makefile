dev:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --build

devd:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml down

prod:
	rm -rf ./node-modules
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml up --build

prodd:
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml down

image:
	docker build --build-arg userId=2002 -t nekwebdev/node:18-alpine-strapi . 