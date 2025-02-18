# frontend Build
FROM node:23-slim AS frontend
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# install deps
COPY ./src/main/client/package.json ./src/main/client/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# copy rest of frontend code
COPY ./src/main/client/ ./

RUN pnpm run build

# backend build
FROM maven:3.9.8-eclipse-temurin-21 AS backend

WORKDIR /app

COPY ./pom.xml .

# download deps
RUN mvn dependency:go-offline

# copy rest of backend code
COPY ./src/main/java src/main/java
COPY ./src/main/resources/ src/main/resources

# copy frontend build output into backend
COPY --from=frontend /app/dist src/main/resources/static

RUN mvn package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

# copy only the final jar
COPY --from=backend /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "app.jar" ]
