@echo off
start cmd /k "cd message && npm run start:dev"
start cmd /k "cd users && npm run start:dev"
start cmd /k "cd gateway && npm run start:dev"
